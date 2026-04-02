import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

async function updateModule10Quiz() {
  try {
    // First, find Module 10
    const module = await prisma.module.findUnique({
      where: { moduleNumber: 10 }
    });

    if (!module) {
      console.error('Module 10 not found!');
      return;
    }

    console.log(`Found Module 10: ${module.title}`);

    // Delete existing quiz questions for Module 10
    const deleteResult = await prisma.quiz.deleteMany({
      where: { moduleId: module.id }
    });
    console.log(`Deleted ${deleteResult.count} existing quiz questions`);

    // New quiz questions for Module 10
    const module10Questions = [
      {
        questionText: "During the Construction Manager's pre-final inspection, what is the typical timeframe before the anticipated municipal final inspection date?",
        optionA: "1 to 3 days before the final inspection",
        optionB: "7 to 14 days before the final inspection",
        optionC: "21 to 30 days before the final inspection",
        optionD: "3 to 5 days before the final inspection",
        correctAnswer: "B"
      },
      {
        questionText: "What is the maximum spacing between balusters in guard railing installations to prevent code violations?",
        optionA: "6 inches to prevent passage of a child's head",
        optionB: "3 inches to prevent passage of small objects",
        optionC: "4 inches to prevent passage of a sphere",
        optionD: "5 inches to prevent passage of toys",
        correctAnswer: "C"
      },
      {
        questionText: "When testing GFCI devices during final inspection, what indicates a properly functioning device?",
        optionA: "The device makes a clicking sound when the test button is pressed",
        optionB: "The circuit breaker trips at the main panel",
        optionC: "The device trips and power is interrupted when the test button is pressed",
        optionD: "A red light illuminates on the device face",
        correctAnswer: "C"
      },
      {
        questionText: "What is the recommended residential water heater temperature setting that balances safety, bacteria control, and energy efficiency?",
        optionA: "140°F to ensure complete bacteria elimination",
        optionB: "110°F to maximize energy savings",
        optionC: "130°F to balance all factors",
        optionD: "120°F to balance safety and efficiency",
        correctAnswer: "D"
      },
      {
        questionText: "During final building inspection, what minimum clear opening size is required for emergency escape windows from sleeping rooms?",
        optionA: "5.0 square feet net clear opening",
        optionB: "5.7 square feet net clear opening",
        optionC: "6.5 square feet net clear opening",
        optionD: "4.8 square feet net clear opening",
        correctAnswer: "B"
      },
      {
        questionText: "What is the typical allocation of time for a municipal inspector to conduct a final inspection of a single-family residential structure?",
        optionA: "30 minutes to 1 hour for standard inspections",
        optionB: "4 to 6 hours for comprehensive evaluation",
        optionC: "2 to 4 hours for thorough inspection",
        optionD: "1 to 1.5 hours for basic compliance verification",
        correctAnswer: "C"
      },
      {
        questionText: "What represents the leading cause of premature HVAC equipment failure that should be emphasized during homeowner orientation?",
        optionA: "Incorrect thermostat programming by homeowners",
        optionB: "Improper filter maintenance causing airflow restriction",
        optionC: "Outdoor unit exposure to weather elements",
        optionD: "Using the system continuously without breaks",
        correctAnswer: "B"
      },
      {
        questionText: "According to OSHA regulations, what is the maximum depth for excavations before protective systems (sloping, benching, shoring, or shielding) become mandatory?",
        optionA: "4 feet in depth requires protective systems",
        optionB: "6 feet in depth requires protective systems",
        optionC: "5 feet in depth requires protective systems",
        optionD: "8 feet in depth requires protective systems",
        correctAnswer: "C"
      },
      {
        questionText: "What is the primary legal function of the Certificate of Occupancy beyond construction completion notification?",
        optionA: "It provides proof of property ownership transfer",
        optionB: "It establishes legal authorization for human occupancy",
        optionC: "It guarantees the building's market value",
        optionD: "It certifies the contractor's professional qualifications",
        correctAnswer: "B"
      },
      {
        questionText: "When should manufacturer product warranties typically be registered to ensure full coverage rather than limited default warranties?",
        optionA: "Within 60 to 90 days following project completion",
        optionB: "Before the final building inspection",
        optionC: "Within 30 to 90 days following installation",
        optionD: "Within 6 months of substantial completion",
        correctAnswer: "C"
      },
      {
        questionText: "What percentage of construction work is typically withheld as retainage throughout the construction period to ensure contractor performance?",
        optionA: "2% to 5% of contract value",
        optionB: "10% to 15% of contract value",
        optionC: "5% to 10% of contract value",
        optionD: "15% to 20% of contract value",
        correctAnswer: "C"
      },
      {
        questionText: "During homeowner orientation, what monthly maintenance task is most critical for preventing HVAC system damage and maintaining efficiency?",
        optionA: "Checking thermostat battery levels",
        optionB: "Cleaning outdoor condenser coils with a hose",
        optionC: "Air filter inspection and replacement as needed",
        optionD: "Verifying refrigerant line insulation condition",
        correctAnswer: "C"
      },
      {
        questionText: "What is the minimum residential guard railing height requirement to meet building code standards?",
        optionA: "42 inches for residential applications",
        optionB: "30 inches for residential applications",
        optionC: "36 inches for residential applications",
        optionD: "34 inches for residential applications",
        correctAnswer: "C"
      },
      {
        questionText: "According to industry research cited in the module, what percentage of post-construction disputes and warranty claims originate from inadequate closeout procedures?",
        optionA: "Approximately 40% of disputes",
        optionB: "Approximately 60% of disputes",
        optionC: "Approximately 80% of disputes",
        optionD: "Approximately 50% of disputes",
        correctAnswer: "B"
      },
      {
        questionText: "What maximum penalty amount can OSHA assess per violation for willful or repeat safety violations on construction sites?",
        optionA: "$70,500 per willful violation",
        optionB: "$156,259 per willful violation",
        optionC: "$100,000 per willful violation",
        optionD: "$50,000 per willful violation",
        correctAnswer: "B"
      },
      {
        questionText: "What is the typical statutory lien filing period after notice of completion during which mechanics liens can still be validly filed?",
        optionA: "60 days following notice of completion",
        optionB: "120 days following notice of completion",
        optionC: "90 days following notice of completion",
        optionD: "30 days following notice of completion",
        correctAnswer: "C"
      },
      {
        questionText: "During final walkthrough, what is the recommended replacement interval for toilet flapper valves to prevent water waste from leaking tanks?",
        optionA: "Every 1 to 2 years as preventive maintenance",
        optionB: "Every 5 to 7 years during routine inspection",
        optionC: "Every 3 to 5 years to maintain efficiency",
        optionD: "Every 7 to 10 years or when failure occurs",
        correctAnswer: "C"
      },
      {
        questionText: "What is the proper ceiling fan direction for summer operation to create a cooling effect?",
        optionA: "Reverse (clockwise) to push air upward",
        optionB: "Forward (counterclockwise) to push air downward",
        optionC: "Either direction depending on ceiling height",
        optionD: "Alternating direction every few hours",
        correctAnswer: "B"
      },
      {
        questionText: "What minimum handrail diameter or equivalent profile dimension is typically required to allow secure grasp according to building codes?",
        optionA: "1.0 to 1.5 inches for proper grip",
        optionB: "1.5 to 2.5 inches for adequate holding",
        optionC: "1.25 to 2 inches for secure grasp",
        optionD: "2 to 3 inches for maximum safety",
        correctAnswer: "C"
      },
      {
        questionText: "What is the maximum allowable sill height above the floor for emergency escape windows in sleeping rooms?",
        optionA: "48 inches maximum above floor level",
        optionB: "36 inches maximum above floor level",
        optionC: "44 inches maximum above floor level",
        optionD: "42 inches maximum above floor level",
        correctAnswer: "C"
      }
    ];

    // Insert new questions
    for (const question of module10Questions) {
      await prisma.quiz.create({
        data: {
          moduleId: module.id,
          ...question
        }
      });
    }

    console.log(`\n✓ Successfully added ${module10Questions.length} new quiz questions to Module 10`);

    // Verify the update
    const updatedQuestions = await prisma.quiz.findMany({
      where: { moduleId: module.id },
      orderBy: { id: 'asc' }
    });

    console.log(`\nVerification: Module 10 now has ${updatedQuestions.length} quiz questions`);
    console.log('\nFirst question:');
    console.log(`Q: ${updatedQuestions[0].questionText}`);
    console.log(`Correct Answer: ${updatedQuestions[0].correctAnswer}`);
    console.log('\nLast question:');
    console.log(`Q: ${updatedQuestions[19].questionText}`);
    console.log(`Correct Answer: ${updatedQuestions[19].correctAnswer}`);

  } catch (error) {
    console.error('Error updating Module 10 quiz:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateModule10Quiz();
