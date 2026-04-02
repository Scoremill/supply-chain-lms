
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const newQuizQuestions = [
  { question: "What is the typical minimum grubbing depth requirement for residential construction in areas that will support structures?", optionA: "6 to 12 inches below proposed grade", optionB: "18 to 36 inches below proposed grade", optionC: "48 to 60 inches below proposed grade", optionD: "12 to 18 inches below proposed grade", correct: "B" },
  { question: "Which federal regulation mandates that construction sites disturbing one acre or more must obtain permit coverage and implement a SWPPP?", optionA: "Occupational Safety and Health Act (OSHA)", optionB: "Clean Water Act through the NPDES program", optionC: "National Environmental Policy Act (NEPA)", optionD: "Resource Conservation and Recovery Act (RCRA)", correct: "B" },
  { question: "What is the required accuracy tolerance for foundation layout in residential construction?", optionA: "Within 1 inch", optionB: "Within 1/4 inch", optionC: "Within 1/2 inch", optionD: "Within 1/8 inch", correct: "B" },
  { question: "How deep must silt fence fabric be trenched and buried to ensure an effective seal against sediment passage?", optionA: "3 inches", optionB: "6 inches", optionC: "12 inches", optionD: "4 inches", correct: "B" },
  { question: "What is the typical compaction requirement for fill material beneath foundations and pavements, expressed as a percentage of Modified Proctor density?", optionA: "85% to 90%", optionB: "90% to 95%", optionC: "95% to 98%", optionD: "98% to 100%", correct: "C" },
  { question: "What is the minimum drainage slope requirement for the first 10 feet extending from a foundation perimeter?", optionA: "1% grade (1 foot per 100 feet)", optionB: "2% grade (2 feet per 100 feet)", optionC: "5% grade (5 feet per 100 feet)", optionD: "0.5% grade (0.5 feet per 100 feet)", correct: "B" },
  { question: "What is the maximum thickness of soil lifts before compaction in structural fill areas?", optionA: "4 to 6 inches", optionB: "6 to 8 inches", optionC: "8 to 12 inches", optionD: "12 to 18 inches", correct: "C" },
  { question: "Which professional is legally responsible for establishing property boundaries and monumenting property corners?", optionA: "Civil Engineer (PE)", optionB: "Registered Professional Land Surveyor (RPLS)", optionC: "Construction Manager (CM)", optionD: "Geotechnical Engineer", correct: "B" },
  { question: "What is the typical aggregate size range for constructing a Stabilized Construction Entrance (SCE)?", optionA: "1/2 to 1 inch diameter", optionB: "2 to 4 inches diameter", optionC: "6 to 8 inches diameter", optionD: "1 to 2 inches diameter", correct: "B" },
  { question: "At what depth does OSHA require protective systems (sloping, benching, shoring, or shielding) for excavations?", optionA: "Exceeding 3 feet", optionB: "Exceeding 4 feet", optionC: "Exceeding 5 feet", optionD: "Exceeding 6 feet", correct: "C" },
  { question: "What is the maximum penalty amount per day for willful or repeat violations of OSHA standards?", optionA: "$15,625", optionB: "$50,000", optionC: "$156,259", optionD: "$75,000", correct: "C" },
  { question: "Which document serves as the legal authorization to commence construction and must be posted at the site?", optionA: "Stormwater Pollution Prevention Plan (SWPPP)", optionB: "Notice to Proceed (NTP)", optionC: "Building Permit", optionD: "Certificate of Occupancy", correct: "C" },
  { question: "Where should tree protection fencing be installed relative to trees designated for preservation?", optionA: "At the tree trunk", optionB: "5 feet from the trunk", optionC: "At or beyond the dripline", optionD: "10 feet from the trunk", correct: "C" },
  { question: "What is the typical range for temporary electrical service size on construction sites?", optionA: "50 to 100 amperes", optionB: "100 to 400 amperes", optionC: "400 to 600 amperes", optionD: "60 to 200 amperes", correct: "B" },
  { question: "What percentage of organic matter by dry weight typically renders soil unacceptable for use beneath foundations?", optionA: "More than 1%", optionB: "More than 3%", optionC: "More than 5%", optionD: "More than 10%", correct: "C" },
  { question: "What is the typical validity period for building permits before they expire if substantial progress is not maintained?", optionA: "Six months", optionB: "One year", optionC: "Two years", optionD: "18 months", correct: "B" },
  { question: "Which laboratory test establishes the maximum dry density achievable for soil compaction specifications?", optionA: "Atterberg Limits Test", optionB: "Grain Size Analysis", optionC: "Standard or Modified Proctor Test", optionD: "Consolidation Test", correct: "C" },
  { question: "What is the required ratio of portable restrooms to workers on construction sites with up to 200 workers?", optionA: "One unit per 10 workers", optionB: "One unit per 20 workers", optionC: "One unit per 30 workers", optionD: "One unit per 50 workers", correct: "B" },
  { question: "When must erosion control inspections be conducted following rainfall events?", optionA: "Within 12 hours following 0.25 inches of rainfall", optionB: "Within 24 hours following 0.5 inches of rainfall", optionC: "Within 48 hours following 1 inch of rainfall", optionD: "Within 24 hours following 0.25 inches of rainfall", correct: "B" },
  { question: "What term describes the strategy of minimizing soil import/export costs by balancing cut and fill volumes on a site?", optionA: "Mass haul optimization", optionB: "Earthwork balance", optionC: "Cut-fill equilibrium", optionD: "Volumetric neutrality", correct: "B" },
];

async function main() {
  console.log('🔄 Updating Module 1 quiz questions...');

  try {
    // Get Module 1
    const module1 = await prisma.module.findUnique({
      where: { moduleNumber: 1 }
    });

    if (!module1) {
      throw new Error('Module 1 not found in database');
    }

    console.log(`   ✓ Found Module 1 with ID: ${module1.id}`);

    // Delete all existing Module 1 quiz questions
    const deletedCount = await prisma.quiz.deleteMany({
      where: {
        moduleId: module1.id
      }
    });
    console.log(`   ✓ Deleted ${deletedCount.count} old Module 1 quiz questions`);

    // Create new Module 1 quiz questions
    let createdCount = 0;
    for (const question of newQuizQuestions) {
      await prisma.quiz.create({
        data: {
          moduleId: module1.id,
          questionText: question.question,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
          correctAnswer: question.correct
        }
      });
      createdCount++;
    }
    console.log(`   ✓ Created ${createdCount} new Module 1 quiz questions`);

    // Reset quiz attempts and passed status for all users on Module 1
    const updatedProgress = await prisma.userProgress.updateMany({
      where: {
        moduleId: module1.id
      },
      data: {
        quizPassed: false,
        quizAttempts: 0
      }
    });
    console.log(`   ✓ Reset quiz status for ${updatedProgress.count} users on Module 1`);

    console.log('✅ Module 1 quiz update completed successfully!');
  } catch (error) {
    console.error('❌ Error updating Module 1 quiz:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
