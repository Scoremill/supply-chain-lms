
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const prisma = new PrismaClient();

const module4Questions = [
  {
    moduleNumber: 4,
    question: "What is the minimum thickness requirement for OSB roof sheathing when rafters are spaced 16 inches on center?",
    optionA: "3/8 inch",
    optionB: "7/16 inch",
    optionC: "15/32 inch",
    optionD: "19/32 inch",
    correct: "B"
  },
  {
    moduleNumber: 4,
    question: "According to the IRC, what is the standard fastener spacing for roof sheathing along panel edges?",
    optionA: "4 inches on center",
    optionB: "6 inches on center",
    optionC: "12 inches on center",
    optionD: "16 inches on center",
    correct: "B"
  },
  {
    moduleNumber: 4,
    question: "Ice and water shield must extend at least how far inside the exterior wall line to provide adequate protection against ice dams?",
    optionA: "12 inches",
    optionB: "18 inches",
    optionC: "24 inches",
    optionD: "36 inches",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "What is the minimum horizontal overlap required when installing roofing underlayment in \"shingle fashion\"?",
    optionA: "1 inch",
    optionB: "2 inches",
    optionC: "4 inches",
    optionD: "6 inches",
    correct: "B"
  },
  {
    moduleNumber: 4,
    question: "For standard three-tab asphalt shingles, what is the typical exposure distance?",
    optionA: "3 inches",
    optionB: "4 inches",
    optionC: "5 inches",
    optionD: "6 inches",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "Which ASTM D7158 wind resistance class is typically required for coastal hurricane zones?",
    optionA: "Class A (60 mph)",
    optionB: "Class D (90 mph)",
    optionC: "Class G (120 mph)",
    optionD: "Class H (150 mph)",
    correct: "D"
  },
  {
    moduleNumber: 4,
    question: "What is the minimum width requirement for open metal valley flashing?",
    optionA: "12 inches",
    optionB: "18 inches",
    optionC: "24 inches",
    optionD: "36 inches",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "Step flashing pieces must NEVER be:",
    optionA: "Installed with each shingle course",
    optionB: "Made from galvanized metal",
    optionC: "Nailed through both legs simultaneously",
    optionD: "Overlapped by the subsequent piece",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "Building codes mandate that a cricket must be installed on the upslope side of chimneys that exceed what width perpendicular to the roof slope?",
    optionA: "18 inches",
    optionB: "24 inches",
    optionC: "30 inches",
    optionD: "36 inches",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "What is the standard code-required ventilation ratio for attic spaces (NFVA to attic floor area)?",
    optionA: "1:100",
    optionB: "1:150",
    optionC: "1:200",
    optionD: "1:300",
    correct: "B"
  },
  {
    moduleNumber: 4,
    question: "Which of the following is NOT one of the four primary moisture transport mechanisms in building envelopes?",
    optionA: "Bulk water intrusion",
    optionB: "Capillary action",
    optionC: "Thermal conduction",
    optionD: "Vapor diffusion",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "What is the optimal vapor permeability range (in perms) for weather-resistive barriers in most North American climates?",
    optionA: "1 to 5 perms",
    optionB: "5 to 50 perms",
    optionC: "50 to 100 perms",
    optionD: "100 to 200 perms",
    correct: "B"
  },
  {
    moduleNumber: 4,
    question: "When installing weather-resistive barrier tape, what is the minimum required peel strength per ASTM D3330?",
    optionA: "5 pounds per inch",
    optionB: "10 pounds per inch",
    optionC: "15 pounds per inch",
    optionD: "20 pounds per inch",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "In the proper sequence for window opening flashing, which component must be installed FIRST?",
    optionA: "Head flashing",
    optionB: "Jamb flashing",
    optionC: "Sill pan flashing",
    optionD: "All components installed simultaneously",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "A 12-foot vinyl siding panel may expand or contract by approximately how much between winter minimum and summer maximum temperatures?",
    optionA: "1/8 inch",
    optionB: "1/4 inch",
    optionC: "1/2 inch or more",
    optionD: "1 inch or more",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "When installing vinyl siding, fasteners should be left with approximately how much clearance between the fastener head and the siding surface?",
    optionA: "Driven tight against the surface",
    optionB: "1/64 inch (thickness of paper)",
    optionC: "1/32 inch (thickness of a dime)",
    optionD: "1/16 inch (thickness of a penny)",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "What is the primary safety concern when cutting fiber cement siding that requires OSHA-mandated engineering controls or respiratory protection?",
    optionA: "Asbestos exposure",
    optionB: "Respirable crystalline silica",
    optionC: "Lead dust",
    optionD: "Formaldehyde vapors",
    correct: "B"
  },
  {
    moduleNumber: 4,
    question: "What is the minimum clearance required between the bottom edge of fiber cement siding and grade level or paved surfaces?",
    optionA: "2 inches",
    optionB: "4 inches",
    optionC: "6 inches",
    optionD: "8 inches",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "For masonry veneer construction, corrugated metal ties must be installed at what maximum spacing?",
    optionA: "16 inches horizontally, 12 inches vertically",
    optionB: "18 inches horizontally, 16 inches vertically",
    optionC: "24 inches horizontally, 16 inches vertically",
    optionD: "32 inches horizontally, 24 inches vertically",
    correct: "C"
  },
  {
    moduleNumber: 4,
    question: "According to OSHA regulations, fall protection is mandatory when workers operate at heights of how many feet or more above a lower level?",
    optionA: "4 feet",
    optionB: "6 feet",
    optionC: "8 feet",
    optionD: "10 feet",
    correct: "B"
  }
];

async function main() {
  console.log('Starting Module 4 quiz update...');
  
  // Get Module 4 ID
  const module4 = await prisma.module.findFirst({
    where: { moduleNumber: 4 }
  });

  if (!module4) {
    console.error('Module 4 not found!');
    return;
  }

  console.log(`Found Module 4 (ID: ${module4.id})`);

  // Delete existing Module 4 quiz questions
  const deleteResult = await prisma.quiz.deleteMany({
    where: { moduleId: module4.id }
  });
  console.log(`Deleted ${deleteResult.count} existing Module 4 quiz questions`);

  // Create new quiz questions
  let createdCount = 0;
  for (const q of module4Questions) {
    await prisma.quiz.create({
      data: {
        moduleId: module4.id,
        questionText: q.question,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctAnswer: q.correct
      }
    });
    createdCount++;
  }
  console.log(`Created ${createdCount} new Module 4 quiz questions`);

  // Reset quiz progress for all users who have attempted Module 4
  const progressRecords = await prisma.userProgress.findMany({
    where: { moduleId: module4.id }
  });

  for (const progress of progressRecords) {
    await prisma.userProgress.update({
      where: { id: progress.id },
      data: {
        quizPassed: false,
        quizScore: null,
        quizAttempts: 0
      }
    });
  }
  console.log(`Reset quiz status for ${progressRecords.length} users with Module 4 progress`);

  console.log('✅ Module 4 quiz update completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error updating Module 4 quiz:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
