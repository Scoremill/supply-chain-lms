
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const module7Questions = [
  {
    questionText: "What is the primary reason that surface preparation accounts for approximately 80% of paint system performance and longevity?",
    optionA: "Primer costs are significantly higher than finish coats, making preparation the most expensive phase",
    optionB: "Inadequate surface preparation prevents proper primer adhesion and allows defects to telegraph through finish coats",
    optionC: "Modern paint formulations require perfectly smooth surfaces to achieve manufacturer-specified coverage rates",
    optionD: "Building codes mandate specific surface preparation protocols that consume most of the painting timeline",
    correctAnswer: "B"
  },
  {
    questionText: "When installing crown molding using the upside-down/nested method on a compound miter saw, what is the primary advantage of this technique?",
    optionA: "It eliminates the need to calculate compound miter and bevel angles since the saw remains at 90-degree bevel",
    optionB: "It allows the carpenter to cut crown molding without specialized equipment or training",
    optionC: "It produces tighter joints than the compound miter saw method due to wood fiber compression",
    optionD: "It prevents tear-out on the visible crown face by cutting from the back surface forward",
    correctAnswer: "A"
  },
  {
    questionText: "According to National Wood Flooring Association (NWFA) standards, what is the maximum acceptable moisture content difference between wood subfloors and solid hardwood flooring?",
    optionA: "2%",
    optionB: "4%",
    optionC: "6%",
    optionD: "8%",
    correctAnswer: "B"
  },
  {
    questionText: "Why are inside corner joints in baseboard installation formed using coped joints rather than mitered joints in professional carpentry practice?",
    optionA: "Coped joints are faster to cut and install, reducing labor costs significantly",
    optionB: "Building codes require coped joints in all interior trim applications for structural integrity",
    optionC: "Coped joints remain tight despite wood shrinkage or building settlement, while mitered joints open over time",
    optionD: "Coped joints provide superior paint adhesion at the joint interface compared to mitered connections",
    correctAnswer: "C"
  },
  {
    questionText: "What is the typical acclimation period required for hardwood flooring before installation can begin?",
    optionA: "12-24 hours",
    optionB: "3-7 days",
    optionC: "2-3 weeks",
    optionD: "30-45 days",
    correctAnswer: "B"
  },
  {
    questionText: "When installing upper cabinets, why must installation begin at inside corners or reference walls rather than starting at random locations?",
    optionA: "Electrical and plumbing rough-in requirements dictate that corner cabinets must be installed first",
    optionB: "Corner cabinets are heavier and require additional structural support that must be verified before proceeding",
    optionC: "Starting at fixed reference points allows systematic progression while maintaining alignment to reference lines",
    optionD: "Building codes require corner cabinet installation before other cabinets to establish proper fire separation",
    correctAnswer: "C"
  },
  {
    questionText: "What is the primary function of cement backer board when installed over wood subfloors prior to tile installation?",
    optionA: "To provide structural reinforcement that reduces subfloor deflection below tile floor tolerance limits",
    optionB: "To create a stable, water-resistant substrate with superior tile mortar bonding characteristics",
    optionC: "To serve as a thermal break preventing heat transfer from the structure to the tile surface",
    optionD: "To eliminate the need for thin-set mortar by providing a pre-textured bonding surface",
    correctAnswer: "B"
  },
  {
    questionText: "In professional painting practice, what does \"cutting-in\" refer to?",
    optionA: "The process of removing excess paint from roller covers before application to walls",
    optionB: "The technique of painting precise lines at trim interfaces and ceiling lines using brushes",
    optionC: "The procedure for mixing custom paint colors by combining base tints",
    optionD: "The method of applying primer coats thinner than finish coats to reduce material costs",
    correctAnswer: "B"
  },
  {
    questionText: "Why is countertop templating performed only after cabinet installation is complete, rather than during the cabinet ordering phase?",
    optionA: "Cabinet manufacturers do not provide accurate dimensions until cabinets are physically produced",
    optionB: "Templates created before installation risk dimensional inaccuracies if cabinets are not positioned exactly as anticipated",
    optionC: "Countertop fabricators require templates to be created within 48 hours of installation to maintain material freshness",
    optionD: "Building inspectors must approve cabinet installation before countertop fabrication can legally proceed",
    correctAnswer: "B"
  },
  {
    questionText: "What is the purpose of the \"reveal\" in door casing installation?",
    optionA: "To create a visible offset between the casing inner edge and door jamb face, providing dimensional depth through shadow lines",
    optionB: "To provide an expansion gap that accommodates seasonal wood movement in the door jamb",
    optionC: "To establish proper clearance for door swing without interference from the casing profile",
    optionD: "To create a recess where caulk can be applied to seal the joint between jamb and casing",
    correctAnswer: "A"
  },
  {
    questionText: "When installing tile flooring, why is grout sanded for joints 1/8 inch and wider but unsanded for narrower joints?",
    optionA: "Sanded grout is less expensive than unsanded grout, making it suitable for wider joints requiring more material",
    optionB: "Unsanded grout provides superior bonding strength in narrow joints due to higher polymer content",
    optionC: "Sand provides body that prevents shrinkage in wider joints, while sand particles would prevent complete filling of narrow joints",
    optionD: "Building codes require sanded grout in all residential applications except where joints are narrower than 1/8 inch",
    correctAnswer: "C"
  },
  {
    questionText: "What is the primary reason for installing upper cabinets before lower cabinets during kitchen installation?",
    optionA: "Upper cabinets must cure and settle for 48 hours before lower cabinet installation can proceed",
    optionB: "Installing lower cabinets first would impede access for upper cabinet attachment and create trip hazards for installers working overhead",
    optionC: "Plumbing and electrical rough-in requires upper cabinet installation first to establish proper utility routing paths",
    optionD: "Building codes mandate upper cabinet installation before lower cabinets to ensure proper ventilation clearances",
    correctAnswer: "B"
  },
  {
    questionText: "In hardwood floor installation using the nail-down method, why are flooring nailers designed to drive fasteners at a 45-degree angle through the tongue edge?",
    optionA: "The angled fastening provides superior holding power compared to perpendicular fastening into the subfloor",
    optionB: "This method leaves the flooring surface unmarred and positions fasteners where they are concealed by the next board's groove",
    optionC: "Angled fasteners allow for seasonal wood expansion without causing floor buckling or nail pops",
    optionD: "The 45-degree angle is required by building codes to prevent fastener penetration into radiant heating systems",
    correctAnswer: "B"
  },
  {
    questionText: "Why must base shoe molding be nailed into the floor rather than the baseboard?",
    optionA: "This nailing pattern allows the floor to expand and contract with seasonal humidity changes without base shoe separation",
    optionB: "Nailing into the baseboard would create splitting due to the thin profile of base shoe material",
    optionC: "Building codes require base shoe attachment to flooring for proper seismic performance during earthquakes",
    optionD: "Attaching base shoe to the floor provides superior resistance to damage from vacuum cleaners and foot traffic",
    correctAnswer: "A"
  },
  {
    questionText: "What is the typical standard overhang dimension at cabinet fronts for kitchen countertops?",
    optionA: "1/2 to 3/4 inches",
    optionB: "1 to 1-1/2 inches",
    optionC: "2 to 2-1/2 inches",
    optionD: "3 to 3-1/2 inches",
    correctAnswer: "B"
  },
  {
    questionText: "When performing tile installation, what does achieving 95% mortar coverage of the tile back prevent?",
    optionA: "Excessive mortar squeeze-out at tile joints that would interfere with proper grout application",
    optionB: "Tile cracking and hollow spots that could lead to failure under load or impact",
    optionC: "Mortar curing defects caused by inadequate moisture retention at the tile-substrate interface",
    optionD: "Building code violations related to minimum adhesive requirements for floor tile installations",
    correctAnswer: "B"
  },
  {
    questionText: "Why are PVA (polyvinyl acetate) drywall primers preferred over other primer types for new drywall installations?",
    optionA: "PVA primers meet federal VOC regulations while oil-based primers exceed allowable emission limits",
    optionB: "PVA primers are significantly less expensive than alternative primer formulations",
    optionC: "PVA primers provide excellent sealing of porous paper face and create uniform surface absorption characteristics",
    optionD: "PVA primers eliminate the need for surface preparation and defect remediation before application",
    correctAnswer: "C"
  },
  {
    questionText: "In floating floor installation using engineered wood with locking mechanisms, why does the lack of fastener attachment require more meticulous substrate preparation compared to nail-down installations?",
    optionA: "Building codes mandate stricter levelness tolerances for floating floors due to increased deflection potential",
    optionB: "Floating floors cannot be \"pulled down\" to irregular substrates, so any irregularities transfer directly to the finished floor surface",
    optionC: "Locking mechanisms require perfectly level substrates to engage properly and prevent joint separation",
    optionD: "Substrate irregularities void manufacturer warranties on floating floor products but not on nail-down installations",
    correctAnswer: "B"
  },
  {
    questionText: "What is the primary purpose of proof rolling the building pad following rough grading and before construction begins?",
    optionA: "To achieve the specified compaction density through the weight of the loaded vehicle or roller",
    optionB: "To identify areas of inadequate compaction, soft spots, or unexpected subsurface conditions requiring remediation",
    optionC: "To create a smooth driving surface for construction vehicles during the building phase",
    optionD: "To satisfy building code requirements for geotechnical verification before foundation construction",
    correctAnswer: "B"
  },
  {
    questionText: "Why are cabinet door adjustment mechanisms on European-style concealed hinges designed with three-way adjustment capability (vertical, horizontal, and depth)?",
    optionA: "To allow homeowners to perform maintenance adjustments without professional tools or expertise",
    optionB: "To compensate for installation variations, wood movement, or hinge mounting inaccuracies, allowing perfect door alignment",
    optionC: "To meet international building standards that require adjustable hardware in all cabinet applications",
    optionD: "To eliminate the need for precise cabinet installation since all alignment can be corrected through hinge adjustment",
    correctAnswer: "B"
  }
];

async function updateModule7Quiz() {
  try {
    console.log('Starting Module 7 quiz update...');

    // Find Module 7
    const module7 = await prisma.module.findFirst({
      where: { moduleNumber: 7 }
    });

    if (!module7) {
      throw new Error('Module 7 not found');
    }

    console.log(`Found Module 7 with ID: ${module7.id}`);

    // Delete existing quiz questions for Module 7
    const deleteResult = await prisma.quiz.deleteMany({
      where: { moduleId: module7.id }
    });

    console.log(`Deleted ${deleteResult.count} existing quiz questions`);

    // Insert new quiz questions
    for (const question of module7Questions) {
      await prisma.quiz.create({
        data: {
          moduleId: module7.id,
          questionText: question.questionText,
          optionA: question.optionA,
          optionB: question.optionB,
          optionC: question.optionC,
          optionD: question.optionD,
          correctAnswer: question.correctAnswer
        }
      });
    }

    console.log(`Successfully created ${module7Questions.length} new quiz questions for Module 7`);

    // Verify the update
    const updatedQuestions = await prisma.quiz.findMany({
      where: { moduleId: module7.id },
      orderBy: { id: 'asc' }
    });

    console.log('\nVerification - Updated questions:');
    updatedQuestions.forEach((q, index) => {
      console.log(`${index + 1}. ${q.questionText.substring(0, 80)}... (Answer: ${q.correctAnswer})`);
    });

    console.log('\n✅ Module 7 quiz update completed successfully!');
  } catch (error) {
    console.error('Error updating Module 7 quiz:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

updateModule7Quiz();
