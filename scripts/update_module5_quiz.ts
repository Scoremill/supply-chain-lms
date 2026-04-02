import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const quizData = [
  {
    question: "What is the minimum clearance required in front of electrical panels for working space according to the NEC?",
    options: {
      A: "24 inches depth",
      B: "42 inches depth",
      C: "30 inches depth",
      D: "36 inches depth"
    },
    correctAnswer: "D"
  },
  {
    question: "What is the ampacity rating for a 12 AWG copper conductor with THHN/THWN insulation?",
    options: {
      A: "30 amperes",
      B: "20 amperes",
      C: "15 amperes",
      D: "25 amperes"
    },
    correctAnswer: "B"
  },
  {
    question: "According to ACCA Manual J methodology, what is the typical cooling capacity range for residential HVAC systems expressed in tons?",
    options: {
      A: "1 to 3 tons",
      B: "5 to 10 tons",
      C: "2 to 5 tons",
      D: "4 to 7 tons"
    },
    correctAnswer: "C"
  },
  {
    question: "What minimum air pressure (in PSI) is typically used when conducting an air pressure test on a DWV system?",
    options: {
      A: "10 PSI",
      B: "3 PSI",
      C: "15 PSI",
      D: "5 PSI"
    },
    correctAnswer: "D"
  },
  {
    question: "What is the minimum height above the roof surface that vent pipe terminals must extend in most jurisdictions?",
    options: {
      A: "6 inches",
      B: "24 inches",
      C: "3 inches",
      D: "12 inches"
    },
    correctAnswer: "A"
  },
  {
    question: "When installing flexible ductwork, what is the maximum support interval required to prevent sagging?",
    options: {
      A: "3 feet",
      B: "2 feet",
      C: "4 feet",
      D: "6 feet"
    },
    correctAnswer: "C"
  },
  {
    question: "Industry studies indicate that inadequate MEP coordination accounts for approximately what percentage of all construction change orders?",
    options: {
      A: "20-30%",
      B: "40-50%",
      C: "10-20%",
      D: "30-40%"
    },
    correctAnswer: "D"
  },
  {
    question: "What is the standard rough-in distance from the finished back wall to the center of a water closet drainage flange?",
    options: {
      A: "16 inches",
      B: "10 inches",
      C: "12 inches",
      D: "14 inches"
    },
    correctAnswer: "C"
  },
  {
    question: "For a 200-ampere residential electrical service, what is the typical size of the grounding electrode conductor using copper?",
    options: {
      A: "1/0 AWG",
      B: "6 AWG",
      C: "2 AWG",
      D: "4 AWG"
    },
    correctAnswer: "D"
  },
  {
    question: "What is the maximum developed length allowed for a trap arm on a 1-1/2 inch fixture drain pipe?",
    options: {
      A: "6 feet",
      B: "5 feet",
      C: "3-1/2 feet",
      D: "10 feet"
    },
    correctAnswer: "B"
  },
  {
    question: "According to the IPC, what is the minimum required CFM for bathroom exhaust fans operating intermittently?",
    options: {
      A: "50 CFM",
      B: "75 CFM",
      C: "30 CFM",
      D: "20 CFM"
    },
    correctAnswer: "A"
  },
  {
    question: "What type of sealant is NOT acceptable for sealing duct joints according to the IRC?",
    options: {
      A: "Mastic with embedded mesh",
      B: "Cloth-backed duct tape",
      C: "Metal-backed (foil-faced) pressure-sensitive tape",
      D: "Mastic"
    },
    correctAnswer: "B"
  },
  {
    question: "When installing PEX water supply piping horizontally, what is the maximum support interval required?",
    options: {
      A: "48 inches",
      B: "72 inches",
      C: "32 inches",
      D: "24 inches"
    },
    correctAnswer: "C"
  },
  {
    question: "What is the minimum required slope for horizontal drainage piping 3 inches and larger?",
    options: {
      A: "1/4 inch per foot",
      B: "1/8 inch per foot",
      C: "3/8 inch per foot",
      D: "1/2 inch per foot"
    },
    correctAnswer: "A"
  },
  {
    question: "In the standard MEP installation sequence, which trade typically performs rough-in work first?",
    options: {
      A: "Plumbing",
      B: "HVAC",
      C: "All trades work simultaneously",
      D: "Electrical"
    },
    correctAnswer: "B"
  },
  {
    question: "What is the recommended maximum voltage drop percentage for branch circuits according to NEC guidelines?",
    options: {
      A: "8%",
      B: "2%",
      C: "3%",
      D: "5%"
    },
    correctAnswer: "C"
  },
  {
    question: "According to current IRC requirements, what is the maximum allowable air leakage for duct systems when tested at 25 Pascals pressure?",
    options: {
      A: "8 CFM per 100 square feet of conditioned floor area",
      B: "4 CFM per 100 square feet of conditioned floor area",
      C: "2 CFM per 100 square feet of conditioned floor area",
      D: "6 CFM per 100 square feet of conditioned floor area"
    },
    correctAnswer: "B"
  },
  {
    question: "For water supply system pressure testing, what is the minimum pressure requirement expressed as a multiplier of the working pressure?",
    options: {
      A: "1.5 times working pressure",
      B: "2.5 times working pressure",
      C: "2.0 times working pressure",
      D: "1.0 times working pressure"
    },
    correctAnswer: "A"
  },
  {
    question: "When installing high-efficiency condensing furnaces in attics where overflow could cause damage, what additional safety device is required in many jurisdictions?",
    options: {
      A: "Automatic damper",
      B: "Pressure relief valve",
      C: "Float switch only",
      D: "Water-sensing shutoff device"
    },
    correctAnswer: "D"
  },
  {
    question: "What is the maximum interval at which non-metallic sheathed cable (NM cable) must be supported according to the NEC?",
    options: {
      A: "4-1/2 feet",
      B: "3 feet",
      C: "8 feet",
      D: "6 feet"
    },
    correctAnswer: "A"
  }
];

async function main() {
  console.log('Finding Module 5...');
  
  // Find Module 5
  const module5 = await prisma.module.findFirst({
    where: {
      order: 5
    }
  });

  if (!module5) {
    console.error('Module 5 not found!');
    return;
  }

  console.log(`Found Module 5: ${module5.title} (ID: ${module5.id})`);
  
  // Delete existing quiz questions for Module 5
  console.log('Deleting existing quiz questions...');
  const deleted = await prisma.quiz.deleteMany({
    where: {
      moduleId: module5.id
    }
  });
  console.log(`Deleted ${deleted.count} existing questions`);

  // Insert new quiz questions
  console.log('Inserting new quiz questions...');
  for (let i = 0; i < quizData.length; i++) {
    const q = quizData[i];
    await prisma.quiz.create({
      data: {
        moduleId: module5.id,
        questionText: q.question,
        optionA: q.options.A,
        optionB: q.options.B,
        optionC: q.options.C,
        optionD: q.options.D,
        correctAnswer: q.correctAnswer
      }
    });
    console.log(`Added question ${i + 1}/${quizData.length}`);
  }

  console.log('\n✅ Module 5 quiz successfully updated!');
  console.log(`Total questions: ${quizData.length}`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
