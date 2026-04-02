
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function updateModule6Quiz() {
  try {
    console.log('Starting Module 6 quiz update...');

    // Find Module 6
    const module = await prisma.module.findFirst({
      where: { moduleNumber: 6 },
      include: { quizzes: { orderBy: { id: 'asc' } } }
    });

    if (!module) {
      throw new Error('Module 6 not found');
    }

    console.log(`Found Module 6 (ID: ${module.id}) with ${module.quizzes.length} existing questions`);

    // Delete existing quizzes for Module 6
    await prisma.quiz.deleteMany({
      where: { moduleId: module.id }
    });
    console.log('Deleted existing quiz questions');

    // New quiz questions from the PDF
    const quizQuestions = [
      {
        question: "According to research by Oak Ridge National Laboratory, what percentage reduction in cavity R-value occurs when just 4% void area exists in batt insulation installation?",
        options: ["25% reduction", "50% reduction", "35% reduction", "60% reduction"],
        correctAnswer: "B"
      },
      {
        question: "What is the primary reason that mineral wool (rock wool) batts are preferred over fiberglass in fire-rated assemblies?",
        options: ["Lower cost per square foot of coverage", "Easier installation in tight spaces", "Higher melting point", "Better moisture resistance in humid climates"],
        correctAnswer: "C"
      },
      {
        question: "In Climate Zone 5 (covering regions like Chicago and Denver), what are the typical minimum R-value requirements for ceilings under current IECC standards?",
        options: ["R-38", "R-60", "R-30", "R-49"],
        correctAnswer: "D"
      },
      {
        question: "Why does cellulose insulation perform better than fiberglass in preventing wind washing in ventilated attic applications?",
        options: ["It has a higher installed density of 1.5 to 2.0 pounds per cubic foot", "It contains fire-retardant chemicals that seal air gaps", "It naturally adheres to roof sheathing", "It expands after installation to fill voids"],
        correctAnswer: "A"
      },
      {
        question: "What is the critical difference between open-cell and closed-cell spray polyurethane foam regarding vapor permeability?",
        options: ["Open-cell is vapor impermeable while closed-cell allows drying", "Both types have identical vapor transmission characteristics", "Closed-cell provides less than 1.0 perm at 2 inches while open-cell is vapor permeable at 5-20 perms", "Open-cell requires separate vapor barriers in all climate zones"],
        correctAnswer: "C"
      },
      {
        question: "During spray foam installation, what personal protective equipment concern makes the process particularly hazardous compared to other insulation types?",
        options: ["Extreme temperatures requiring heat-resistant gloves", "Isocyanate health hazards requiring respirators and full protective suits", "High voltage electrical risks from spray equipment", "Silica dust exposure requiring N95 respirators"],
        correctAnswer: "B"
      },
      {
        question: "What property of gypsum (calcium sulfate dihydrate) allows it to be manufactured into board form through rehydration?",
        options: ["When heated to drive off moisture and reground, it can be remixed with water to form a paste that hardens", "It naturally bonds with cellulose fibers under pressure", "It becomes adhesive when exposed to air", "It crystallizes when combined with paper facing"],
        correctAnswer: "A"
      },
      {
        question: "Why is Type X gypsum board required in attached garage walls according to building codes?",
        options: ["It provides superior sound isolation from vehicle noise", "It resists moisture damage from humidity", "It incorporates glass fiber reinforcement achieving one-hour fire-resistance ratings", "It has higher impact resistance for vehicle damage"],
        correctAnswer: "C"
      },
      {
        question: "What is the primary technical reason for hanging ceiling drywall before wall drywall in standard construction sequencing?",
        options: ["Ceilings require different screw types than walls", "Wall sheets support ceiling sheet edges and simplify ceiling-wall joint treatment", "Ceiling compound must dry before wall compound is applied", "Building codes mandate ceiling installation first for fire safety"],
        correctAnswer: "B"
      },
      {
        question: "According to code-mandated fastener spacing, what is the maximum spacing for drywall screws on ceilings in standard wind zones?",
        options: ["16 inches on-center", "8 inches on-center", "12 inches on-center", "7 inches on-center"],
        correctAnswer: "C"
      },
      {
        question: "What critical installation error occurs when drywall screws are driven with excessive force using improperly adjusted screw guns?",
        options: ["Screws strip out of wood framing requiring replacement", "Face paper breaks or gypsum core crushes, eliminating holding power", "Screws overheat and lose tensile strength", "Electrical wiring behind drywall becomes damaged"],
        correctAnswer: "B"
      },
      {
        question: "In professional drywall finishing, why is paper tape universally preferred over fiberglass mesh tape for achieving Level 4 and Level 5 finishes?",
        options: ["Paper tape costs less per linear foot", "Mesh tape cannot be used with setting-type compounds", "Paper tape provides maximum strength and crack resistance with proper embedding", "Mesh tape requires special application tools"],
        correctAnswer: "C"
      },
      {
        question: "What distinguishes a Level 5 drywall finish from a Level 4 finish according to Gypsum Association specifications?",
        options: ["Level 5 uses three coats while Level 4 uses only two coats", "Level 5 requires spray-applied texture while Level 4 is smooth", "Level 5 requires an additional skim coat over the entire surface beyond Level 4 requirements", "Level 5 mandates sanding between all coats while Level 4 does not"],
        correctAnswer: "C"
      },
      {
        question: "During the tape coat application, what is the primary purpose of the thin cover coat applied immediately after tape embedment?",
        options: ["To add structural strength to the joint", "To prevent tape edges from lifting during drying and begin surface leveling", "To seal the tape against moisture penetration", "To provide a surface for measuring joint width"],
        correctAnswer: "B"
      },
      {
        question: "What inspection technique do Construction Managers use to reveal surface irregularities invisible under diffuse overhead lighting?",
        options: ["Infrared thermal imaging", "Moisture meters to detect compound density variations", "Low-angle lighting (raking light) that highlights ridges and depressions", "Ultrasonic testing for void detection"],
        correctAnswer: "C"
      },
      {
        question: "According to current energy codes, what is the typical air leakage limit for residential buildings in Climate Zones 3-8 measured in air changes per hour at 50 Pascals (ACH50)?",
        options: ["7 to 10 ACH50", "1 to 2 ACH50", "3 to 5 ACH50", "10 to 15 ACH50"],
        correctAnswer: "C"
      },
      {
        question: "Why is the rough blower door test conducted after insulation but before drywall installation rather than only at final completion?",
        options: ["Building codes prohibit testing after drywall installation", "Testing equipment cannot fit through doorways once trim is installed", "It allows identification and correction of air leakage sources while they remain accessible", "Drywall installation alters building volume calculations"],
        correctAnswer: "C"
      },
      {
        question: "What environmental condition most dramatically extends joint compound drying times, potentially requiring dehumidification equipment?",
        options: ["Relative humidity above 70%", "Temperatures below 32°F", "Direct sunlight exposure", "Poor ventilation with stagnant air"],
        correctAnswer: "A"
      },
      {
        question: "What percentage of generated dust do vacuum sanders typically capture at the sanding point before it becomes airborne?",
        options: ["60-70%", "75-85%", "50-60%", "90-95%"],
        correctAnswer: "D"
      },
      {
        question: "According to industry research, what percentage of energy performance deficiencies in residential and commercial buildings can be attributed to improper insulation installation?",
        options: ["5-10%", "15-40%", "40-60%", "60-80%"],
        correctAnswer: "B"
      }
    ];

    // Insert new quiz questions
    for (const quiz of quizQuestions) {
      await prisma.quiz.create({
        data: {
          moduleId: module.id,
          questionText: quiz.question,
          optionA: quiz.options[0],
          optionB: quiz.options[1],
          optionC: quiz.options[2],
          optionD: quiz.options[3],
          correctAnswer: quiz.correctAnswer
        }
      });
    }

    console.log(`Successfully created ${quizQuestions.length} new quiz questions for Module 6`);

    // Verify the update
    const updatedQuizzes = await prisma.quiz.findMany({
      where: { moduleId: module.id },
      orderBy: { id: 'asc' }
    });

    console.log('\nVerification:');
    console.log(`Total questions: ${updatedQuizzes.length}`);
    updatedQuizzes.forEach((q, idx) => {
      console.log(`Q${idx + 1}: ${q.questionText.substring(0, 60)}... (Answer: ${q.correctAnswer})`);
    });

  } catch (error) {
    console.error('Error updating Module 6 quiz:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updateModule6Quiz()
  .then(() => {
    console.log('\n✅ Module 6 quiz update completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Module 6 quiz update failed:', error);
    process.exit(1);
  });
