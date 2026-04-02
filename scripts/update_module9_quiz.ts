
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const module9Questions = [
  {
    questionText: "What is the typical minimum water supply pressure required for proper ice maker function in a refrigerator?",
    optionA: "10 psi",
    optionB: "20 psi",
    optionC: "30 psi",
    optionD: "40 psi",
    correctAnswer: "B"
  },
  {
    questionText: "According to BHMA/ANSI standards, how many operational cycles must a Grade 1 lockset withstand during testing?",
    optionA: "200,000 cycles",
    optionB: "800,000 cycles",
    optionC: "1,600,000 cycles",
    optionD: "2,400,000 cycles",
    correctAnswer: "C"
  },
  {
    questionText: "What is the standard center-to-center spacing between a door lockset and deadbolt installation?",
    optionA: "3-1/2 inches",
    optionB: "4-1/2 inches",
    optionC: "5-1/2 inches",
    optionD: "6-1/2 inches",
    correctAnswer: "C"
  },
  {
    questionText: "When installing a dishwasher drain hose, the high loop must rise to within what distance of the underside of the countertop?",
    optionA: "1 inch",
    optionB: "2 inches",
    optionC: "3 inches",
    optionD: "4 inches",
    correctAnswer: "B"
  },
  {
    questionText: "What is the maximum recommended length for dryer exhaust ducts before accounting for elbow equivalent lengths?",
    optionA: "15-20 feet",
    optionB: "25-35 feet",
    optionC: "40-50 feet",
    optionD: "55-65 feet",
    correctAnswer: "B"
  },
  {
    questionText: "Which paint sheen is MOST forgiving for touch-up work due to minimal light reflection?",
    optionA: "Gloss",
    optionB: "Semi-gloss",
    optionC: "Satin",
    optionD: "Matte/Flat",
    correctAnswer: "D"
  },
  {
    questionText: "What is the typical shelf life of stored touch-up paint under proper climate-controlled conditions?",
    optionA: "6 months to 1 year",
    optionB: "2 to 5 years",
    optionC: "6 to 8 years",
    optionD: "10 to 15 years",
    correctAnswer: "B"
  },
  {
    questionText: "Natural stone materials including marble and limestone require which type of cleaner to prevent etching?",
    optionA: "pH-neutral cleaners",
    optionB: "Acidic cleaners",
    optionC: "Alkaline cleaners",
    optionD: "Ammonia-based cleaners",
    correctAnswer: "A"
  },
  {
    questionText: "According to industry data, construction and demolition waste represents approximately what percentage of total municipal solid waste streams?",
    optionA: "10% to 15%",
    optionB: "15% to 20%",
    optionC: "25% to 30%",
    optionD: "35% to 40%",
    correctAnswer: "C"
  },
  {
    questionText: "What is the standard residential electric range circuit requirement for modern installations?",
    optionA: "120-volt, 30-ampere",
    optionB: "120-volt, 50-ampere",
    optionC: "240-volt, 40-ampere",
    optionD: "240-volt, 50-ampere",
    correctAnswer: "D"
  },
  {
    questionText: "What minimum screw length is recommended for securing towel bars to ensure adequate wood blocking engagement?",
    optionA: "1 inch",
    optionB: "2 inches",
    optionC: "3 inches",
    optionD: "4 inches",
    correctAnswer: "B"
  },
  {
    questionText: "According to ADA requirements, grab bars in accessible bathrooms must support a minimum force in any direction of:",
    optionA: "150 pounds",
    optionB: "200 pounds",
    optionC: "250 pounds",
    optionD: "300 pounds",
    correctAnswer: "C"
  },
  {
    questionText: "When using spray paint application for touch-ups, what is the typical optimal spray distance from the surface?",
    optionA: "4 to 6 inches",
    optionB: "8 to 12 inches",
    optionC: "14 to 18 inches",
    optionD: "20 to 24 inches",
    correctAnswer: "B"
  },
  {
    questionText: "What is the recommended pattern overlap percentage for spray paint application to ensure uniform coverage?",
    optionA: "25%",
    optionB: "50%",
    optionC: "75%",
    optionD: "90%",
    correctAnswer: "B"
  },
  {
    questionText: "Which cleaning phase is performed after all construction work is complete but BEFORE punch list correction?",
    optionA: "Rough cleaning",
    optionB: "Final cleaning",
    optionC: "Detail cleaning",
    optionD: "Post-occupancy cleaning",
    correctAnswer: "B"
  },
  {
    questionText: "What pH range is appropriate for cleaning painted surfaces without damaging the paint film?",
    optionA: "pH 4-6 (acidic)",
    optionB: "pH 8-10 (mild alkaline)",
    optionC: "pH 11-13 (strong alkaline)",
    optionD: "pH 14 (highly alkaline)",
    correctAnswer: "B"
  },
  {
    questionText: "Research indicates that approximately what percentage of homeowner satisfaction ratings are directly influenced by the quality of final finishes work?",
    optionA: "30-40%",
    optionB: "45-55%",
    optionC: "60-70%",
    optionD: "75-85%",
    correctAnswer: "C"
  },
  {
    questionText: "For gas appliance installations, what is the typical required supply pressure for natural gas (measured in inches of water column)?",
    optionA: "3 to 5 inches",
    optionB: "7 to 10 inches",
    optionC: "14 to 17 inches",
    optionD: "20 to 25 inches",
    correctAnswer: "B"
  },
  {
    questionText: "What is the typical allowable time period for completing work under a Temporary Certificate of Occupancy (TCO)?",
    optionA: "10 to 20 days",
    optionB: "30 to 90 days",
    optionC: "120 to 180 days",
    optionD: "6 to 12 months",
    correctAnswer: "B"
  },
  {
    questionText: "According to Consumer Product Safety Commission data, approximately how many residential fires annually are caused by lint accumulation in dryer exhaust systems?",
    optionA: "5,000 fires",
    optionB: "10,000 fires",
    optionC: "15,000 fires",
    optionD: "20,000 fires",
    correctAnswer: "C"
  }
];

async function updateModule9Quiz() {
  try {
    // Find Module 9
    const module9 = await prisma.module.findFirst({
      where: { moduleNumber: 9 }
    });

    if (!module9) {
      console.error('Module 9 not found!');
      return;
    }

    console.log('Found Module 9:', module9.title);

    // Delete existing quiz questions for Module 9
    const deleteResult = await prisma.quiz.deleteMany({
      where: { moduleId: module9.id }
    });

    console.log(`Deleted ${deleteResult.count} existing quiz questions for Module 9`);

    // Insert new questions
    for (const question of module9Questions) {
      await prisma.quiz.create({
        data: {
          moduleId: module9.id,
          ...question
        }
      });
    }

    console.log(`Successfully added ${module9Questions.length} new quiz questions for Module 9`);

    // Verify the update
    const updatedQuestions = await prisma.quiz.findMany({
      where: { moduleId: module9.id },
      orderBy: { id: 'asc' }
    });

    console.log(`\nVerification: Module 9 now has ${updatedQuestions.length} quiz questions`);
    console.log('First question:', updatedQuestions[0].questionText);
    console.log('Last question:', updatedQuestions[updatedQuestions.length - 1].questionText);

  } catch (error) {
    console.error('Error updating Module 9 quiz:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateModule9Quiz();
