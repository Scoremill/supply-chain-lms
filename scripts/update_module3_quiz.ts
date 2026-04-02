
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const prisma = new PrismaClient();

const module3Questions = [
  {
    moduleNumber: 3,
    question: "What is the maximum acceptable deviation for sill plate levelness over its entire length?",
    optionA: "1/4 inch",
    optionB: "1/8 inch",
    optionC: "1/2 inch",
    optionD: "1/16 inch",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "What is the minimum retention level required for pressure-treated sill plates rated for ground contact?",
    optionA: "0.25 pcf",
    optionB: "0.40 pcf",
    optionC: "0.60 pcf",
    optionD: "0.80 pcf",
    correct: "C"
  },
  {
    moduleNumber: 3,
    question: "When installing floor joists, which direction should the crown (natural bow) face?",
    optionA: "Down toward the foundation",
    optionB: "Up toward the ceiling",
    optionC: "Alternating up and down",
    optionD: "Direction doesn't matter",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "What is the typical maximum spacing for anchor bolts securing the sill plate to the foundation?",
    optionA: "4 feet on center",
    optionB: "6 feet on center",
    optionC: "8 feet on center",
    optionD: "10 feet on center",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "What is the recommended waste factor to add when calculating lumber quantities for framing?",
    optionA: "5-8%",
    optionB: "10-15%",
    optionC: "20-25%",
    optionD: "30-35%",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "For professional framing, what is the maximum acceptable tolerance for walls to be out of plumb?",
    optionA: "1/8 inch over 8 feet",
    optionB: "1/4 inch over 8 feet",
    optionC: "1/2 inch over 8 feet",
    optionD: "3/4 inch over 8 feet",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "What fastening pattern is required for subfloor sheathing installation?",
    optionA: "4 inches on edges, 8 inches in field",
    optionB: "6 inches on edges, 12 inches in field",
    optionC: "8 inches on edges, 16 inches in field",
    optionD: "12 inches on edges, 24 inches in field",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "What is the purpose of installing sill seal gasket between the concrete foundation and sill plate?",
    optionA: "To make the sill plate level",
    optionB: "To prevent air infiltration and moisture transfer",
    optionC: "To increase the height of the foundation",
    optionD: "To provide additional structural strength",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "When measuring diagonals to check if a wall is square, what is the maximum acceptable difference between the two measurements?",
    optionA: "1/8 inch",
    optionB: "1/4 inch",
    optionC: "1/2 inch",
    optionD: "1 inch",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "What is the most critical reason for NEVER cutting or modifying engineered I-joists or trusses without approval?",
    optionA: "It voids the warranty",
    optionB: "It's more difficult than cutting dimensional lumber",
    optionC: "It can reduce load capacity by 50% or more and cause catastrophic failure",
    optionD: "It makes the joists look unprofessional",
    correct: "C"
  },
  {
    moduleNumber: 3,
    question: "In the double top plate assembly, what is the minimum distance that joints must be offset between the upper and lower plates?",
    optionA: "24 inches",
    optionB: "36 inches",
    optionC: "48 inches",
    optionD: "60 inches",
    correct: "C"
  },
  {
    moduleNumber: 3,
    question: "What is the primary structural function of wall sheathing on exterior walls?",
    optionA: "To provide a surface for painting",
    optionB: "To provide lateral (racking) resistance",
    optionC: "To increase insulation value",
    optionD: "To make walls look finished",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "Which component directly supports the header at a window or door opening?",
    optionA: "King studs",
    optionB: "Cripple studs",
    optionC: "Trimmer studs (jack studs)",
    optionD: "Bottom plate",
    correct: "C"
  },
  {
    moduleNumber: 3,
    question: "What is the typical maximum span for a 2x10 floor joist at 16 inches on center (assuming Douglas Fir-Larch #2)?",
    optionA: "12'-6\"",
    optionB: "16'-5\"",
    optionC: "19'-11\"",
    optionD: "22'-0\"",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "Why must construction adhesive be applied to joist tops before subfloor installation?",
    optionA: "It makes installation faster",
    optionB: "It's required by building codes",
    optionC: "It significantly reduces floor squeaks and increases stiffness",
    optionD: "It prevents the subfloor from warping",
    correct: "C"
  },
  {
    moduleNumber: 3,
    question: "What is the recommended header size for a 6-foot wide opening in a single-story load-bearing wall?",
    optionA: "Double 2x6",
    optionB: "Double 2x8",
    optionC: "Double 2x12 or LVL",
    optionD: "Triple 2x12",
    correct: "C"
  },
  {
    moduleNumber: 3,
    question: "What is the Golden Rule of flashing installation for windows and doors?",
    optionA: "Use as much flashing as possible",
    optionB: "Upper layers always overlap lower layers",
    optionC: "Install flashing after the window",
    optionD: "Flashing should be visible from outside",
    correct: "B"
  },
  {
    moduleNumber: 3,
    question: "How much gap should be left between subfloor panel edges perpendicular to joists to allow for expansion?",
    optionA: "No gap needed",
    optionB: "1/16 inch",
    optionC: "1/8 inch",
    optionD: "1/4 inch",
    correct: "C"
  },
  {
    moduleNumber: 3,
    question: "What is one of the most common framing violations cited during municipal inspections?",
    optionA: "Using wrong lumber species",
    optionB: "Walls painted the wrong color",
    optionC: "Missing or improperly filled joist hanger nail holes",
    optionD: "Subfloor installed upside down",
    correct: "C"
  },
  {
    moduleNumber: 3,
    question: "During the framing inspection, what is the inspector primarily verifying with the 'load path' check?",
    optionA: "The path workers take through the site",
    optionB: "How forces transfer from roof to foundation through all connections",
    optionC: "The route for material deliveries",
    optionD: "The location of temporary storage areas",
    correct: "B"
  }
];

async function main() {
  console.log('Starting Module 3 quiz update...');
  
  // Get Module 3 ID
  const module3 = await prisma.module.findFirst({
    where: { moduleNumber: 3 }
  });

  if (!module3) {
    console.error('Module 3 not found!');
    return;
  }

  console.log(`Found Module 3 (ID: ${module3.id})`);

  // Delete existing Module 3 quiz questions
  const deleteResult = await prisma.quiz.deleteMany({
    where: { moduleId: module3.id }
  });
  console.log(`Deleted ${deleteResult.count} existing Module 3 quiz questions`);

  // Create new quiz questions
  let createdCount = 0;
  for (const q of module3Questions) {
    await prisma.quiz.create({
      data: {
        moduleId: module3.id,
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
  console.log(`Created ${createdCount} new Module 3 quiz questions`);

  // Reset quiz progress for all users who have attempted Module 3
  const progressRecords = await prisma.userProgress.findMany({
    where: { moduleId: module3.id }
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
  console.log(`Reset quiz status for ${progressRecords.length} users with Module 3 progress`);

  console.log('✅ Module 3 quiz update completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error updating Module 3 quiz:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
