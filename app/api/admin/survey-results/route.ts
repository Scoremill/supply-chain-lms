
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const LIKERT_5_LABELS: Record<number, string> = {
  1: "1 - Not at all",
  2: "2 - Slightly",
  3: "3 - Moderately",
  4: "4 - Very",
  5: "5 - Extremely"
};

function likert5Label(val: number) {
  return LIKERT_5_LABELS[val] ?? String(val);
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requestingUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { role: true }
    });

    if (requestingUser?.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId") || undefined;
    const dateFrom = searchParams.get("dateFrom") || undefined;
    const dateTo = searchParams.get("dateTo") || undefined;
    const format = searchParams.get("format"); // "csv" or undefined for JSON

    const where: any = {};

    if (companyId) {
      where.companyId = companyId;
    }

    if (dateFrom || dateTo) {
      where.submittedAt = {};
      if (dateFrom) where.submittedAt.gte = new Date(dateFrom);
      if (dateTo) {
        // Include the full day
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        where.submittedAt.lte = end;
      }
    }

    const responses = await prisma.surveyResponse.findMany({
      where,
      orderBy: { submittedAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        company: { select: { companyName: true } }
      }
    });

    if (format === "csv") {
      const headers = [
        "Name",
        "Email",
        "Company",
        "Submitted At",
        "Q1 - Overall Experience (1-10)",
        "Q2 - Content Meaningfulness (1-5)",
        "Q3 - Module Cohesion (1-5)",
        "Q4 - Layout & Ease of Use (1-5)",
        "Q5 - Technical Issues (Yes/No)",
        "Q5 - Technical Issue Details",
        "Q6 - Video Content Effectiveness (1-5)",
        "Q7 - Most Useful Module",
        "Q8 - Over-Processed Module",
        "Q9 - Confidence (1-10)",
        "Q10 - Relevancy (1-5)",
        "Q11 - NPS (0-10)",
        "Q12 - Improvement Suggestion"
      ];

      const rows = responses.map((r) => [
        r.user.name ?? "",
        r.user.email,
        r.company?.companyName ?? "No Company",
        new Date(r.submittedAt).toLocaleDateString("en-US"),
        String(r.q1OverallExperience),
        likert5Label(r.q2ContentMeaningful),
        likert5Label(r.q3ModuleCohesion),
        String(r.q4LayoutRating),
        r.q5TechIssues ? "Yes" : "No",
        r.q5TechDetails ?? "",
        likert5Label(r.q6VideoEffectiveness),
        r.q7MostUsefulModule,
        r.q8OverProcessedModule,
        String(r.q9Confidence),
        likert5Label(r.q10Relevancy),
        String(r.q11Nps),
        r.q12Improvement
      ]);

      const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;
      const csvLines = [
        headers.map(escape).join(","),
        ...rows.map((row) => row.map(escape).join(","))
      ];
      const csv = csvLines.join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="survey-results-${new Date().toISOString().split("T")[0]}.csv"`
        }
      });
    }

    // JSON response
    const data = responses.map((r) => ({
      id: r.id,
      submittedAt: r.submittedAt,
      userName: r.user.name ?? "Unknown",
      userEmail: r.user.email,
      companyName: r.company?.companyName ?? "No Company",
      companyId: r.companyId,
      answers: {
        q1OverallExperience: r.q1OverallExperience,
        q2ContentMeaningful: r.q2ContentMeaningful,
        q3ModuleCohesion: r.q3ModuleCohesion,
        q4LayoutRating: r.q4LayoutRating,
        q5TechIssues: r.q5TechIssues,
        q5TechDetails: r.q5TechDetails,
        q6VideoEffectiveness: r.q6VideoEffectiveness,
        q7MostUsefulModule: r.q7MostUsefulModule,
        q8OverProcessedModule: r.q8OverProcessedModule,
        q9Confidence: r.q9Confidence,
        q10Relevancy: r.q10Relevancy,
        q11Nps: r.q11Nps,
        q12Improvement: r.q12Improvement
      }
    }));

    return NextResponse.json({ results: data, total: data.length });
  } catch (error) {
    console.error("Error fetching survey results:", error);
    return NextResponse.json({ error: "Failed to fetch survey results" }, { status: 500 });
  }
}
