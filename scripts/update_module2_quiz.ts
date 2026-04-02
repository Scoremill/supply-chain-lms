
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const prisma = new PrismaClient();

const module2Questions = [
  {
    moduleNumber: 2,
    question: "Why is undisturbed soil critical for foundation bearing capacity?",
    optionA: "It has better drainage properties than compacted fill",
    optionB: "It has been naturally compacted over thousands of years, providing predictable bearing capacity",
    optionC: "It is easier to excavate than disturbed soil",
    optionD: "It prevents frost heave more effectively",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "What is the minimum slope requirement for 3-inch and 4-inch residential drain pipes?",
    optionA: "1/8 inch per foot",
    optionB: "1/4 inch per foot",
    optionC: "1/2 inch per foot",
    optionD: "1 inch per foot",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "What is the primary purpose of rebar in concrete foundations?",
    optionA: "To increase the concrete's compressive strength",
    optionB: "To add tensile strength that concrete naturally lacks",
    optionC: "To prevent the concrete from shrinking during curing",
    optionD: "To reduce the amount of concrete needed",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "Why must excavated soil never be stockpiled close to the edge of the excavation?",
    optionA: "It interferes with equipment access",
    optionB: "It prevents proper drainage of the excavation",
    optionC: "The weight can cause excavation walls to collapse",
    optionD: "It violates environmental regulations",
    correct: "C"
  },
  {
    moduleNumber: 2,
    question: "What is the typical frost line depth range in cold northern climates?",
    optionA: "12-24 inches",
    optionB: "24-36 inches",
    optionC: "36-48 inches",
    optionD: "48-60 inches or more",
    correct: "D"
  },
  {
    moduleNumber: 2,
    question: "What must be done before calling for a footing inspection?",
    optionA: "Pour the concrete and wait 24 hours",
    optionB: "Complete forms, install rebar, and ensure proper excavation conditions",
    optionC: "Backfill around the excavation perimeter",
    optionD: "Install the foundation drainage system",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "What is the difference between dampproofing and waterproofing?",
    optionA: "Dampproofing is applied to interior walls; waterproofing to exterior walls",
    optionB: "Dampproofing resists moisture but not hydrostatic pressure; waterproofing resists both",
    optionC: "Dampproofing is permanent; waterproofing requires periodic reapplication",
    optionD: "There is no difference—the terms are interchangeable",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "Why is under-slab plumbing considered 'point of no return' work?",
    optionA: "It must be completed within 24 hours",
    optionB: "Once the slab is poured, the pipes are permanently inaccessible except through demolition",
    optionC: "It cannot be inspected before installation",
    optionD: "It requires specialized licensing",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "What is the minimum curing time before foundation walls should be backfilled?",
    optionA: "12 hours",
    optionB: "24 hours",
    optionC: "3-7 days",
    optionD: "28 days",
    correct: "C"
  },
  {
    moduleNumber: 2,
    question: "What is the purpose of anchor bolts in foundation construction?",
    optionA: "To tie the foundation wall to the footing",
    optionB: "To secure the wood sill plate to the top of the foundation wall",
    optionC: "To attach waterproofing membranes",
    optionD: "To support rebar during concrete placement",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "Why should perforated foundation drain pipe have holes facing downward?",
    optionA: "To prevent roots from entering the pipe",
    optionB: "To collect water from the gravel bed below rather than allowing soil to enter from above",
    optionC: "To increase water flow velocity",
    optionD: "To make installation easier",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "What is honeycombing in concrete, and why is it a problem?",
    optionA: "Surface cracks from rapid drying; cosmetic issue only",
    optionB: "Voids and gaps in concrete from incomplete consolidation; significantly weakens the wall",
    optionC: "Discoloration from mineral deposits; affects appearance only",
    optionD: "Normal texture created by form patterns; not a defect",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "When must the building inspector approve the foundation before work continues?",
    optionA: "Only after the entire foundation is complete and backfilled",
    optionB: "Before concrete is poured in footings AND before backfilling/slab pour",
    optionC: "Only if problems are suspected",
    optionD: "After backfilling but before framing begins",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "What is the typical residential foundation wall thickness for single-story construction?",
    optionA: "4-6 inches",
    optionB: "6-8 inches",
    optionC: "8-10 inches",
    optionD: "10-12 inches",
    correct: "C"
  },
  {
    moduleNumber: 2,
    question: "What test pressure is typically used for air testing under-slab plumbing?",
    optionA: "2 PSI",
    optionB: "5 PSI",
    optionC: "10 PSI",
    optionD: "15 PSI",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "Why is a vapor barrier placed under concrete slabs?",
    optionA: "To prevent concrete from bonding to the gravel",
    optionB: "To provide a smooth surface for concrete finishing",
    optionC: "To prevent ground moisture from migrating up through the slab into the building",
    optionD: "To add insulation value to the floor system",
    correct: "C"
  },
  {
    moduleNumber: 2,
    question: "What is the construction manager's primary role during the foundation stage?",
    optionA: "To operate excavation equipment",
    optionB: "To pour and finish concrete personally",
    optionC: "To coordinate multiple trades, manage scheduling, ensure quality control, and handle inspections",
    optionD: "To approve building permits",
    correct: "C"
  },
  {
    moduleNumber: 2,
    question: "Before the 811 utility locating service, what must be done before any excavation?",
    optionA: "Obtain a soil report",
    optionB: "Call to have underground utilities marked",
    optionC: "Schedule a pre-construction meeting",
    optionD: "Complete the building permit application",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "What is the purpose of control joints in concrete slabs?",
    optionA: "To separate different concrete pours",
    optionB: "To create planned weak points where cracking can occur in a controlled manner",
    optionC: "To provide expansion space for temperature changes",
    optionD: "To mark the location of under-slab plumbing",
    correct: "B"
  },
  {
    moduleNumber: 2,
    question: "What is the typical compressive strength specification for residential foundation concrete?",
    optionA: "1000-2000 PSI",
    optionB: "2000-3000 PSI",
    optionC: "3000-4000 PSI",
    optionD: "5000-6000 PSI",
    correct: "C"
  }
];

async function main() {
  console.log('Starting Module 2 quiz update...');
  
  // Get Module 2 ID
  const module2 = await prisma.module.findFirst({
    where: { moduleNumber: 2 }
  });

  if (!module2) {
    console.error('Module 2 not found!');
    return;
  }

  console.log(`Found Module 2 (ID: ${module2.id})`);

  // Delete existing Module 2 quiz questions
  const deleteResult = await prisma.quiz.deleteMany({
    where: { moduleId: module2.id }
  });
  console.log(`Deleted ${deleteResult.count} existing Module 2 quiz questions`);

  // Create new quiz questions
  let createdCount = 0;
  for (const q of module2Questions) {
    await prisma.quiz.create({
      data: {
        moduleId: module2.id,
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
  console.log(`Created ${createdCount} new Module 2 quiz questions`);

  // Reset quiz progress for all users who have attempted Module 2
  const progressRecords = await prisma.userProgress.findMany({
    where: { moduleId: module2.id }
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
  console.log(`Reset quiz status for ${progressRecords.length} users with Module 2 progress`);

  console.log('✅ Module 2 quiz update completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error updating Module 2 quiz:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
