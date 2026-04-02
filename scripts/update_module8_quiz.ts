
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const newQuizQuestions = [
  {
    questionText: "When installing residential electrical receptacles, what is the typical torque specification for tightening terminal screws to ensure proper connection without damaging the device?",
    optionA: "8 inch-pounds",
    optionB: "12 inch-pounds",
    optionC: "18 inch-pounds",
    optionD: "24 inch-pounds",
    correctAnswer: "B"
  },
  {
    questionText: "What is the primary reason that three-way switch installations frequently fail to operate correctly during initial testing?",
    optionA: "Insufficient wire gauge for the circuit amperage",
    optionB: "Reversed polarity on the neutral connections",
    optionC: "Incorrect identification and connection of the common terminal",
    optionD: "Inadequate separation between traveler wires in the conduit",
    correctAnswer: "C"
  },
  {
    questionText: "According to NEC requirements, what is the maximum recess depth allowed for electrical boxes installed behind combustible wall surfaces before box extenders are required?",
    optionA: "1/8 inch",
    optionB: "1/4 inch",
    optionC: "3/8 inch",
    optionD: "1/2 inch",
    correctAnswer: "B"
  },
  {
    questionText: "When installing a toilet, what is the standard horizontal distance from the finished wall to the centerline of the toilet flange for proper rough-in alignment?",
    optionA: "10 inches",
    optionB: "12 inches",
    optionC: "14 inches",
    optionD: "16 inches",
    correctAnswer: "B"
  },
  {
    questionText: "What is the primary functional purpose of the P-trap water seal in plumbing drain assemblies?",
    optionA: "To create hydraulic pressure that improves drainage flow velocity",
    optionB: "To prevent sewer gases from entering living spaces while allowing drainage",
    optionC: "To filter solid particles before they enter the main drainage system",
    optionD: "To equalize air pressure between the drainage system and atmosphere",
    correctAnswer: "B"
  },
  {
    questionText: "During wax ring installation for toilet mounting, what indicates that the wax ring has been properly compressed to create an effective seal?",
    optionA: "The toilet rocks slightly when pressure is applied to opposite sides",
    optionB: "Wax material is visible extruding from beneath the toilet base",
    optionC: "The toilet is pressed firmly down and shows no water seepage during multiple flush tests",
    optionD: "The closet bolts can be tightened until the bolt threads are fully engaged",
    correctAnswer: "C"
  },
  {
    questionText: "What is the code-compliant depth range for maintaining proper P-trap water seal according to plumbing standards?",
    optionA: "1 to 2 inches",
    optionB: "2 to 4 inches",
    optionC: "4 to 6 inches",
    optionD: "6 to 8 inches",
    correctAnswer: "B"
  },
  {
    questionText: "When installing a gas-fired water heater in a confined closet space, what is the standard calculation for determining combustion air requirements when air comes from within the building?",
    optionA: "25 CFM per 1,000 BTU/hour input rating",
    optionB: "50 CFM per 1,000 BTU/hour input rating",
    optionC: "75 CFM per 1,000 BTU/hour input rating",
    optionD: "100 CFM per 1,000 BTU/hour input rating",
    correctAnswer: "B"
  },
  {
    questionText: "Which charging method is typically used for air conditioning systems with fixed orifice metering devices (such as thermostatic expansion valves)?",
    optionA: "Superheat method",
    optionB: "Subcooling method",
    optionC: "Total charge weight method",
    optionD: "Ambient differential method",
    correctAnswer: "B"
  },
  {
    questionText: "What is the typical acceptable temperature split range between return air and supply air during cooling mode operation that indicates proper system performance?",
    optionA: "5°F to 10°F",
    optionB: "10°F to 15°F",
    optionC: "15°F to 22°F",
    optionD: "22°F to 30°F",
    correctAnswer: "C"
  },
  {
    questionText: "What is the primary purpose of secondary condensate drain connections in HVAC systems?",
    optionA: "To increase drainage capacity during peak humidity conditions",
    optionB: "To provide backup protection against primary drain failures that could cause water damage",
    optionC: "To separate condensate from different zones for individual monitoring",
    optionD: "To maintain consistent drain pan water levels during variable load conditions",
    correctAnswer: "B"
  },
  {
    questionText: "When positioning thermostats for optimal HVAC system performance, what is the recommended mounting height above the finished floor?",
    optionA: "36 to 42 inches",
    optionB: "42 to 48 inches",
    optionC: "52 to 60 inches",
    optionD: "60 to 66 inches",
    correctAnswer: "C"
  },
  {
    questionText: "What is the primary reason for installing aggregate base courses beneath concrete flatwork slabs?",
    optionA: "To provide additional thermal insulation reducing heat loss through slabs",
    optionB: "To create chemical bonding between concrete and subgrade soil",
    optionC: "To provide uniform support, facilitate drainage, and reduce capillary moisture transmission",
    optionD: "To increase total slab thickness for improved structural load capacity",
    correctAnswer: "C"
  },
  {
    questionText: "For residential concrete driveways and walkways, what compressive strength specification is commonly used?",
    optionA: "2,000 psi",
    optionB: "2,500 psi",
    optionC: "3,000 psi",
    optionD: "4,000 psi",
    correctAnswer: "C"
  },
  {
    questionText: "What is the minimum vapor barrier overlap requirement at seams to prevent moisture transmission through gaps during concrete slab construction?",
    optionA: "2 to 4 inches",
    optionB: "6 to 12 inches",
    optionC: "12 to 18 inches",
    optionD: "18 to 24 inches",
    correctAnswer: "B"
  },
  {
    questionText: "Where should welded wire reinforcement be positioned within a 4-inch concrete slab thickness to provide optimal crack control?",
    optionA: "At the bottom surface of the slab (on the vapor barrier)",
    optionB: "In the upper third of the slab, approximately 1-1/2 inches below the surface",
    optionC: "At the exact mid-point, 2 inches from both top and bottom",
    optionD: "In the lower third of the slab, approximately 1 inch above the vapor barrier",
    correctAnswer: "B"
  },
  {
    questionText: "According to building codes, what is the typical minimum slope requirement for the first 10 feet extending from building foundations to establish positive drainage?",
    optionA: "2% grade (2 feet vertical drop per 100 feet horizontal)",
    optionB: "5% grade (6 inches vertical drop per 10 feet horizontal)",
    optionC: "10% grade (1 foot vertical drop per 10 feet horizontal)",
    optionD: "15% grade (18 inches vertical drop per 10 feet horizontal)",
    correctAnswer: "B"
  },
  {
    questionText: "What is the recommended topsoil placement depth for typical residential turf areas to support adequate grass growth?",
    optionA: "2 to 3 inches",
    optionB: "4 to 6 inches",
    optionC: "8 to 10 inches",
    optionD: "12 to 14 inches",
    correctAnswer: "B"
  },
  {
    questionText: "During final electrical inspection, what tool do inspectors typically use to verify proper receptacle wiring including polarity, grounding, and GFCI functionality?",
    optionA: "Digital multimeter with voltage and continuity testing",
    optionB: "Plug-in circuit tester with indicator lights",
    optionC: "Infrared thermal imaging camera",
    optionD: "Clamp-on ammeter for current measurement",
    correctAnswer: "B"
  },
  {
    questionText: "What document represents the formal municipal authorization certifying that construction is substantially complete, all required inspections are approved, and the building is safe for occupancy?",
    optionA: "Building Permit",
    optionB: "Notice to Proceed",
    optionC: "Final Inspection Report",
    optionD: "Certificate of Occupancy",
    correctAnswer: "D"
  }
];

async function updateModule8Quiz() {
  try {
    console.log('Finding Module 8...');
    const module8 = await prisma.module.findFirst({
      where: { moduleNumber: 8 }
    });

    if (!module8) {
      throw new Error('Module 8 not found');
    }

    console.log('Deleting existing Module 8 quiz questions...');
    await prisma.quiz.deleteMany({
      where: { moduleId: module8.id }
    });

    console.log('Inserting new quiz questions...');
    for (const question of newQuizQuestions) {
      await prisma.quiz.create({
        data: {
          ...question,
          moduleId: module8.id
        }
      });
    }

    console.log('Verifying updates...');
    const updatedQuestions = await prisma.quiz.findMany({
      where: { moduleId: module8.id },
      orderBy: { id: 'asc' }
    });

    console.log(`\nSuccessfully updated Module 8 quiz with ${updatedQuestions.length} questions`);
    console.log('\nFirst question:', updatedQuestions[0].questionText);
    console.log('Last question:', updatedQuestions[updatedQuestions.length - 1].questionText);

  } catch (error) {
    console.error('Error updating Module 8 quiz:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updateModule8Quiz();
