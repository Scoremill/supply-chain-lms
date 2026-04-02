
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
      include: {
        progress: {
          include: {
            module: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all 10 modules
    const allModules = await prisma.module.findMany({
      where: {
        moduleNumber: {
          gte: 1,
          lte: 10
        }
      },
      orderBy: {
        moduleNumber: 'asc'
      }
    });

    if (allModules.length !== 10) {
      return NextResponse.json({ 
        error: "Course structure incomplete", 
        eligible: false 
      }, { status: 500 });
    }

    // Check if all 10 modules are completed with 85% or higher
    const moduleStatus = allModules.map((module: any) => {
      const progress = user.progress.find((p: any) => p.moduleId === module.id);
      const passed = progress?.quizPassed && (progress?.quizScore || 0) >= 85;
      
      return {
        moduleNumber: module.moduleNumber,
        moduleName: module.title,
        passed,
        score: progress?.quizScore || 0,
        attempts: progress?.quizAttempts || 0
      };
    });

    const allPassed = moduleStatus.every((m: any) => m.passed);
    
    // Get completion date (use stored date or calculate from latest module)
    let completionDate: Date | null = null;
    if (allPassed) {
      if (user.courseCompletedAt) {
        completionDate = user.courseCompletedAt;
      } else {
        const completedProgresses = user.progress
          .filter((p: any) => p.quizPassed && p.completedAt)
          .sort((a: any, b: any) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));
        
        completionDate = completedProgresses[0]?.completedAt || null;
      }
    }

    return NextResponse.json({
      eligible: allPassed,
      completionDate: completionDate?.toISOString(),
      moduleStatus
    });

  } catch (error) {
    console.error("Error checking certificate eligibility:", error);
    return NextResponse.json({ 
      error: "Failed to check eligibility",
      eligible: false 
    }, { status: 500 });
  }
}
