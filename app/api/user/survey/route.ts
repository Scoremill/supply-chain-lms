
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { surveyCompleted: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ surveyCompleted: user.surveyCompleted });
  } catch (error) {
    console.error("Error checking survey status:", error);
    return NextResponse.json({ error: "Failed to check survey status" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, companyId: true, surveyCompleted: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.surveyCompleted) {
      return NextResponse.json({ error: "Survey already completed" }, { status: 409 });
    }

    const body = await request.json();

    const {
      q1OverallExperience,
      q2ContentMeaningful,
      q3ModuleCohesion,
      q4LayoutRating,
      q5TechIssues,
      q5TechDetails,
      q6VideoEffectiveness,
      q7MostUsefulModule,
      q8OverProcessedModule,
      q9Confidence,
      q10Relevancy,
      q11Nps,
      q12Improvement
    } = body;

    // Validate all required fields
    const missingFields: string[] = [];

    if (q1OverallExperience == null) missingFields.push("q1OverallExperience");
    if (q2ContentMeaningful == null) missingFields.push("q2ContentMeaningful");
    if (q3ModuleCohesion == null) missingFields.push("q3ModuleCohesion");
    if (q4LayoutRating == null) missingFields.push("q4LayoutRating");
    if (q5TechIssues == null) missingFields.push("q5TechIssues");
    if (q5TechIssues === true && !q5TechDetails?.trim()) missingFields.push("q5TechDetails");
    if (q6VideoEffectiveness == null) missingFields.push("q6VideoEffectiveness");
    if (!q7MostUsefulModule?.trim()) missingFields.push("q7MostUsefulModule");
    if (!q8OverProcessedModule?.trim()) missingFields.push("q8OverProcessedModule");
    if (q9Confidence == null) missingFields.push("q9Confidence");
    if (q10Relevancy == null) missingFields.push("q10Relevancy");
    if (q11Nps == null) missingFields.push("q11Nps");
    if (!q12Improvement?.trim()) missingFields.push("q12Improvement");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "All questions are required", missingFields },
        { status: 400 }
      );
    }

    // Validate ranges
    if (q1OverallExperience < 1 || q1OverallExperience > 10) {
      return NextResponse.json({ error: "Q1 must be between 1 and 10" }, { status: 400 });
    }
    if (q2ContentMeaningful < 1 || q2ContentMeaningful > 5) {
      return NextResponse.json({ error: "Q2 must be between 1 and 5" }, { status: 400 });
    }
    if (q3ModuleCohesion < 1 || q3ModuleCohesion > 5) {
      return NextResponse.json({ error: "Q3 must be between 1 and 5" }, { status: 400 });
    }
    if (q4LayoutRating < 1 || q4LayoutRating > 5) {
      return NextResponse.json({ error: "Q4 must be between 1 and 5" }, { status: 400 });
    }
    if (q6VideoEffectiveness < 1 || q6VideoEffectiveness > 5) {
      return NextResponse.json({ error: "Q6 must be between 1 and 5" }, { status: 400 });
    }
    if (q9Confidence < 1 || q9Confidence > 10) {
      return NextResponse.json({ error: "Q9 must be between 1 and 10" }, { status: 400 });
    }
    if (q10Relevancy < 1 || q10Relevancy > 5) {
      return NextResponse.json({ error: "Q10 must be between 1 and 5" }, { status: 400 });
    }
    if (q11Nps < 0 || q11Nps > 10) {
      return NextResponse.json({ error: "Q11 must be between 0 and 10" }, { status: 400 });
    }

    // Create the survey response and mark user as completed in a transaction
    await prisma.$transaction([
      prisma.surveyResponse.create({
        data: {
          userId: user.id,
          companyId: user.companyId,
          q1OverallExperience,
          q2ContentMeaningful,
          q3ModuleCohesion,
          q4LayoutRating,
          q5TechIssues,
          q5TechDetails: q5TechIssues ? q5TechDetails : null,
          q6VideoEffectiveness,
          q7MostUsefulModule,
          q8OverProcessedModule,
          q9Confidence,
          q10Relevancy,
          q11Nps,
          q12Improvement
        }
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { surveyCompleted: true }
      })
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting survey:", error);
    return NextResponse.json({ error: "Failed to submit survey" }, { status: 500 });
  }
}
