import type { CheerioAPI } from 'cheerio';
import type { QuizInput, CheckpointQuestion } from '../types';

/**
 * Per-module checkpoint placement config.
 * Each entry specifies where to insert a Knowledge Check relative to an h4 heading.
 * - anchor: the slugified h4 heading text to anchor to
 * - position: 'before' inserts above the h4, 'after' inserts below it
 * Knowledge Checks are numbered sequentially in the order they appear here (reading order).
 */
interface CheckpointPlacement {
  anchor: string;
  position: 'before' | 'after';
  question: CheckpointQuestion;
}

const checkpointPlacements: Record<number, CheckpointPlacement[]> = {
  1: [
    // KC#1: Before Grubbing h4
    {
      anchor: 'grubbing-and-organic-material-removal',
      position: 'before',
      question: {
        questionText: 'Where should tree protection fencing be installed relative to trees designated for preservation?',
        options: [
          { label: 'A', text: 'At the tree trunk' },
          { label: 'B', text: '5 feet from the trunk' },
          { label: 'C', text: 'At or beyond the dripline' },
          { label: 'D', text: '10 feet from the trunk' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#2: Before Soil Classification expandable
    {
      anchor: 'soil-classification-and-suitability',
      position: 'before',
      question: {
        questionText: 'What is the typical minimum grubbing depth requirement for residential construction in areas that will support structures?',
        options: [
          { label: 'A', text: '6 to 12 inches below proposed grade' },
          { label: 'B', text: '18 to 36 inches below proposed grade' },
          { label: 'C', text: '48 to 60 inches below proposed grade' },
          { label: 'D', text: '12 to 18 inches below proposed grade' },
        ],
        correctLabel: 'B',
      },
    },
    // KC#3: Before Building Pad h4
    {
      anchor: 'building-pad-preparation-and-drainage-establishment',
      position: 'before',
      question: {
        questionText: 'What is the typical compaction requirement for fill material beneath foundations and pavements, expressed as a percentage of Modified Proctor density?',
        options: [
          { label: 'A', text: '85% to 90%' },
          { label: 'B', text: '90% to 95%' },
          { label: 'C', text: '95% to 98%' },
          { label: 'D', text: '98% to 100%' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#4: Same anchor as KC#3 (inserted second, appears after KC#3)
    {
      anchor: 'building-pad-preparation-and-drainage-establishment',
      position: 'before',
      question: {
        questionText: 'What is the typical aggregate size range for constructing a Stabilized Construction Entrance (SCE)?',
        options: [
          { label: 'A', text: '1/2 to 1 inch diameter' },
          { label: 'B', text: '2 to 4 inches diameter' },
          { label: 'C', text: '6 to 8 inches diameter' },
          { label: 'D', text: '1 to 2 inches diameter' },
        ],
        correctLabel: 'B',
      },
    },
  ],
  2: [
    // KC#1: Before wall form assembly (transition: Excavation → Foundation Walls)
    {
      anchor: 'step-1-wall-form-assembly',
      position: 'before',
      question: {
        questionText: 'Why must excavated soil never be stockpiled close to the edge of the excavation?',
        options: [
          { label: 'A', text: 'It interferes with equipment access' },
          { label: 'B', text: 'It prevents proper drainage of the excavation' },
          { label: 'C', text: 'The weight can cause excavation walls to collapse' },
          { label: 'D', text: 'It violates environmental regulations' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#2: Before waterproofing application (transition: Wall Construction → Waterproofing)
    {
      anchor: 'step-2-waterproofing-application',
      position: 'before',
      question: {
        questionText: 'What is the minimum curing time before foundation walls should be backfilled?',
        options: [
          { label: 'A', text: '12 hours' },
          { label: 'B', text: '24 hours' },
          { label: 'C', text: '3-7 days' },
          { label: 'D', text: '28 days' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#3: Before DWV systems (transition: Waterproofing → Under-Slab Plumbing)
    {
      anchor: 'drain-waste-and-vent-dwv-systems',
      position: 'before',
      question: {
        questionText: 'What is the difference between dampproofing and waterproofing?',
        options: [
          { label: 'A', text: 'Dampproofing is applied to interior walls; waterproofing to exterior walls' },
          { label: 'B', text: 'Dampproofing resists moisture but not hydrostatic pressure; waterproofing resists both' },
          { label: 'C', text: 'Dampproofing is permanent; waterproofing requires periodic reapplication' },
          { label: 'D', text: 'There is no difference—the terms are interchangeable' },
        ],
        correctLabel: 'B',
      },
    },
    // KC#4: Before air test (within plumbing testing section)
    {
      anchor: 'air-test',
      position: 'before',
      question: {
        questionText: "Why is under-slab plumbing considered 'point of no return' work?",
        options: [
          { label: 'A', text: 'It must be completed within 24 hours' },
          { label: 'B', text: 'Once the slab is poured, the pipes are permanently inaccessible except through demolition' },
          { label: 'C', text: 'It cannot be inspected before installation' },
          { label: 'D', text: 'It requires specialized licensing' },
        ],
        correctLabel: 'B',
      },
    },
  ],
  3: [
    // KC#1: Before subfloor material comparison (transition: Floor Joists → Subfloor)
    {
      anchor: 'subfloor-material-comparison',
      position: 'before',
      question: {
        questionText: 'What is the most critical reason for NEVER cutting or modifying engineered I-joists or trusses without approval?',
        options: [
          { label: 'A', text: 'It voids the warranty' },
          { label: 'B', text: "It's more difficult than cutting dimensional lumber" },
          { label: 'C', text: 'It can reduce load capacity by 50% or more and cause catastrophic failure' },
          { label: 'D', text: 'It makes the joists look unprofessional' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#2: Before wall assembly layout (transition: Subfloor → Wall Assembly)
    {
      anchor: 'step-1-layout-and-dimensional-transfer',
      position: 'before',
      question: {
        questionText: 'Why must construction adhesive be applied to joist tops before subfloor installation?',
        options: [
          { label: 'A', text: 'It makes installation faster' },
          { label: 'B', text: "It's required by building codes" },
          { label: 'C', text: 'It significantly reduces floor squeaks and increases stiffness' },
          { label: 'D', text: 'It prevents the subfloor from warping' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#3: Before sheathing application (within Wall Assembly)
    {
      anchor: 'step-4-sheathing-application-exterior-walls',
      position: 'before',
      question: {
        questionText: 'When measuring diagonals to check if a wall is square, what is the maximum acceptable difference between the two measurements?',
        options: [
          { label: 'A', text: '1/8 inch' },
          { label: 'B', text: '1/4 inch' },
          { label: 'C', text: '1/2 inch' },
          { label: 'D', text: '1 inch' },
        ],
        correctLabel: 'B',
      },
    },
    // KC#4: Before header sizing section (transition: Wall Assembly → Headers)
    {
      anchor: 'header-sizing-for-window-and-door-openings',
      position: 'before',
      question: {
        questionText: 'What is the primary structural function of wall sheathing on exterior walls?',
        options: [
          { label: 'A', text: 'To provide a surface for painting' },
          { label: 'B', text: 'To provide lateral (racking) resistance' },
          { label: 'C', text: 'To increase insulation value' },
          { label: 'D', text: 'To make walls look finished' },
        ],
        correctLabel: 'B',
      },
    },
  ],
  4: [
    // KC#1: Before Building Science (transition: Roofing → Building Science)
    {
      anchor: 'building-science-principles-and-moisture-transport-mechanisms',
      position: 'before',
      question: {
        questionText: 'Step flashing pieces must NEVER be:',
        options: [
          { label: 'A', text: 'Installed with each shingle course' },
          { label: 'B', text: 'Made from galvanized metal' },
          { label: 'C', text: 'Nailed through both legs simultaneously' },
          { label: 'D', text: 'Overlapped by the subsequent piece' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#2: Before Vinyl Siding (transition: Building Science/WRB → Exterior Cladding)
    {
      anchor: 'vinyl-siding-installation-and-thermal-movement-accommodation',
      position: 'before',
      question: {
        questionText: 'In the proper sequence for window opening flashing, which component must be installed FIRST?',
        options: [
          { label: 'A', text: 'Head flashing' },
          { label: 'B', text: 'Jamb flashing' },
          { label: 'C', text: 'Sill pan flashing' },
          { label: 'D', text: 'All components installed simultaneously' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#3: Before Roofing Compliance (transition: Exterior Cladding → Inspection/Compliance)
    {
      anchor: 'roofing-system-compliance-and-warranty-documentation',
      position: 'before',
      question: {
        questionText: 'When installing vinyl siding, fasteners should be left with approximately how much clearance between the fastener head and the siding surface?',
        options: [
          { label: 'A', text: 'Driven tight against the surface' },
          { label: 'B', text: '1/64 inch (thickness of paper)' },
          { label: 'C', text: '1/32 inch (thickness of a dime)' },
          { label: 'D', text: '1/16 inch (thickness of a penny)' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#4: Before Fall Protection (transition: Quality → Safety)
    {
      anchor: 'equipment-coordination-and-fall-protection-compliance',
      position: 'before',
      question: {
        questionText: 'What is the primary safety concern when cutting fiber cement siding that requires OSHA-mandated engineering controls or respiratory protection?',
        options: [
          { label: 'A', text: 'Asbestos exposure' },
          { label: 'B', text: 'Respirable crystalline silica' },
          { label: 'C', text: 'Lead dust' },
          { label: 'D', text: 'Formaldehyde vapors' },
        ],
        correctLabel: 'B',
      },
    },
  ],
  5: [
    // KC#1: Before Plumbing section (transition: HVAC → Plumbing)
    {
      anchor: 'water-service-and-distribution-system-fundamentals',
      position: 'before',
      question: {
        questionText: 'What type of sealant is NOT acceptable for sealing duct joints according to the IRC?',
        options: [
          { label: 'A', text: 'Mastic with embedded mesh' },
          { label: 'B', text: 'Cloth-backed duct tape' },
          { label: 'C', text: 'Metal-backed (foil-faced) pressure-sensitive tape' },
          { label: 'D', text: 'Mastic' },
        ],
        correctLabel: 'B',
      },
    },
    // KC#2: Before Electrical section (transition: Plumbing → Electrical)
    {
      anchor: 'service-entrance-and-load-calculation',
      position: 'before',
      question: {
        questionText: 'What is the standard rough-in distance from the finished back wall to the center of a water closet drainage flange?',
        options: [
          { label: 'A', text: '16 inches' },
          { label: 'B', text: '10 inches' },
          { label: 'C', text: '12 inches' },
          { label: 'D', text: '14 inches' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#3: Before Inspection section (transition: Electrical → Inspection)
    {
      anchor: 'inspection-scope-and-objectives',
      position: 'before',
      question: {
        questionText: 'What is the minimum clearance required in front of electrical panels for working space according to the NEC?',
        options: [
          { label: 'A', text: '24 inches depth' },
          { label: 'B', text: '42 inches depth' },
          { label: 'C', text: '30 inches depth' },
          { label: 'D', text: '36 inches depth' },
        ],
        correctLabel: 'D',
      },
    },
    // KC#4: Before Coordination section (transition: Inspection → Coordination)
    {
      anchor: 'trade-scheduling-and-sequencing',
      position: 'before',
      question: {
        questionText: 'Industry studies indicate that inadequate MEP coordination accounts for approximately what percentage of all construction change orders?',
        options: [
          { label: 'A', text: '20-30%' },
          { label: 'B', text: '40-50%' },
          { label: 'C', text: '10-20%' },
          { label: 'D', text: '30-40%' },
        ],
        correctLabel: 'D',
      },
    },
  ],
  6: [
    // KC#1: Before Gypsum Board (transition: Insulation → Drywall)
    {
      anchor: 'gypsum-board-material-science-and-product-selection',
      position: 'before',
      question: {
        questionText: 'According to research by Oak Ridge National Laboratory, what percentage reduction in cavity R-value occurs when just 4% void area exists in batt insulation installation?',
        options: [
          { label: 'A', text: '25% reduction' },
          { label: 'B', text: '50% reduction' },
          { label: 'C', text: '35% reduction' },
          { label: 'D', text: '60% reduction' },
        ],
        correctLabel: 'B',
      },
    },
    // KC#2: Before Joint Treatment (transition: Hanging → Finishing)
    {
      anchor: 'joint-treatment-systems-and-finishing-levels',
      position: 'before',
      question: {
        questionText: 'What critical installation error occurs when drywall screws are driven with excessive force using improperly adjusted screw guns?',
        options: [
          { label: 'A', text: 'Screws strip out of wood framing requiring replacement' },
          { label: 'B', text: 'Face paper breaks or gypsum core crushes, eliminating holding power' },
          { label: 'C', text: 'Screws overheat and lose tensile strength' },
          { label: 'D', text: 'Electrical wiring behind drywall becomes damaged' },
        ],
        correctLabel: 'B',
      },
    },
    // KC#3: Before Insulation Inspection (transition: Drywall → Inspector)
    {
      anchor: 'insulation-inspection-protocols-and-thermal-envelope-verification',
      position: 'before',
      question: {
        questionText: 'What distinguishes a Level 5 drywall finish from a Level 4 finish according to Gypsum Association specifications?',
        options: [
          { label: 'A', text: 'Level 5 uses three coats while Level 4 uses only two coats' },
          { label: 'B', text: 'Level 5 requires spray-applied texture while Level 4 is smooth' },
          { label: 'C', text: 'Level 5 requires an additional skim coat over the entire surface beyond Level 4 requirements' },
          { label: 'D', text: 'Level 5 mandates sanding between all coats while Level 4 does not' },
        ],
        correctLabel: 'C',
      },
    },
    // KC#4: Before Schedule Optimization (transition: Inspection → Management)
    {
      anchor: 'schedule-optimization-and-trade-coordination',
      position: 'before',
      question: {
        questionText: 'Why is the rough blower door test conducted after insulation but before drywall installation rather than only at final completion?',
        options: [
          { label: 'A', text: 'Building codes prohibit testing after drywall installation' },
          { label: 'B', text: 'Testing equipment cannot fit through doorways once trim is installed' },
          { label: 'C', text: 'It allows identification and correction of air leakage sources while they remain accessible' },
          { label: 'D', text: 'Drywall installation alters building volume calculations' },
        ],
        correctLabel: 'C',
      },
    },
  ],
  7: [
    // KC#1: Before Backing Requirements (transition: Painting → Trim Carpentry)
    {
      anchor: 'backing-requirements-and-substrate-preparation',
      position: 'before',
      question: {
        questionText: 'Where is caulk applied during interior finishing?',
        options: [
          { label: 'A', text: 'Only around windows' },
          { label: 'B', text: 'Joints where trim meets walls and ceilings' },
          { label: 'C', text: 'Only around doors' },
          { label: 'D', text: 'Only in bathrooms' },
        ],
        correctLabel: 'B',
      },
    },
    // KC#2: Before Upper Cabinet Installation (transition: Trim → Cabinets)
    {
      anchor: 'upper-cabinet-installation-and-shimming-techniques',
      position: 'before',
      question: {
        questionText: 'Where is crown molding typically installed?',
        options: [
          { label: 'A', text: 'Around windows' },
          { label: 'B', text: 'Where walls meet the ceiling' },
          { label: 'C', text: 'Around doors' },
          { label: 'D', text: 'Along baseboards' },
        ],
        correctLabel: 'B',
      },
    },
    // KC#3: Before Substrate Preparation (transition: Cabinets → Flooring)
    {
      anchor: 'substrate-preparation-and-moisture-testing-protocols',
      position: 'before',
      question: {
        questionText: 'When does countertop templating occur?',
        options: [
          { label: 'A', text: 'Before cabinet installation' },
          { label: 'B', text: 'After cabinets are installed' },
          { label: 'C', text: 'During cabinet installation' },
          { label: 'D', text: 'Before flooring' },
        ],
        correctLabel: 'B',
      },
    },
    // KC#4: After Engineered Wood (end of module content)
    {
      anchor: 'engineered-wood-and-floating-floor-installation',
      position: 'after',
      question: {
        questionText: 'What type of floor is vinyl plank or laminate considered?',
        options: [
          { label: 'A', text: 'Glued down' },
          { label: 'B', text: 'Floating floor' },
          { label: 'C', text: 'Nailed down' },
          { label: 'D', text: 'Stapled down' },
        ],
        correctLabel: 'B',
      },
    },
  ],
  8: [
    {
      anchor: 'plumbing-fixture-installation-sequence-and-rough-in-verification',
      position: 'before',
      question: {
        questionText: 'According to NEC requirements, what is the maximum recess depth allowed for electrical boxes installed behind combustible wall surfaces before box extenders are required?',
        options: [
          { label: 'A', text: '1/8 inch' },
          { label: 'B', text: '1/4 inch' },
          { label: 'C', text: '3/8 inch' },
          { label: 'D', text: '1/2 inch' },
        ],
        correctLabel: 'B',
      },
    },
    {
      anchor: 'supply-register-and-return-grille-installation',
      position: 'before',
      question: {
        questionText: 'What is the primary functional purpose of the P-trap water seal in plumbing drain assemblies?',
        options: [
          { label: 'A', text: 'To create hydraulic pressure that improves drainage flow velocity' },
          { label: 'B', text: 'To prevent sewer gases from entering living spaces while allowing drainage' },
          { label: 'C', text: 'To filter solid particles before they enter the main drainage system' },
          { label: 'D', text: 'To equalize air pressure between the drainage system and atmosphere' },
        ],
        correctLabel: 'B',
      },
    },
    {
      anchor: 'subgrade-preparation-and-vapor-barrier-installation',
      position: 'before',
      question: {
        questionText: 'What is the typical acceptable temperature split range between return air and supply air during cooling mode operation that indicates proper system performance?',
        options: [
          { label: 'A', text: '5°F to 10°F' },
          { label: 'B', text: '10°F to 15°F' },
          { label: 'C', text: '15°F to 22°F' },
          { label: 'D', text: '22°F to 30°F' },
        ],
        correctLabel: 'C',
      },
    },
    {
      anchor: 'individual-trade-final-inspections',
      position: 'before',
      question: {
        questionText: 'According to building codes, what is the typical minimum slope requirement for the first 10 feet extending from building foundations to establish positive drainage?',
        options: [
          { label: 'A', text: '2% grade (2 feet vertical drop per 100 feet horizontal)' },
          { label: 'B', text: '5% grade (6 inches vertical drop per 10 feet horizontal)' },
          { label: 'C', text: '10% grade (1 foot vertical drop per 10 feet horizontal)' },
          { label: 'D', text: '15% grade (18 inches vertical drop per 10 feet horizontal)' },
        ],
        correctLabel: 'B',
      },
    },
  ],
  9: [
    {
      anchor: 'door-hardware-selection-and-standards',
      position: 'before',
      question: {
        questionText: 'When installing a dishwasher drain hose, the high loop must rise to within what distance of the underside of the countertop?',
        options: [
          { label: 'A', text: '1 inch' },
          { label: 'B', text: '2 inches' },
          { label: 'C', text: '3 inches' },
          { label: 'D', text: '4 inches' },
        ],
        correctLabel: 'B',
      },
    },
    {
      anchor: 'paint-touch-up-strategy-and-materials-management',
      position: 'before',
      question: {
        questionText: 'According to BHMA/ANSI standards, how many operational cycles must a Grade 1 lockset withstand during testing?',
        options: [
          { label: 'A', text: '200,000 cycles' },
          { label: 'B', text: '800,000 cycles' },
          { label: 'C', text: '1,600,000 cycles' },
          { label: 'D', text: '2,400,000 cycles' },
        ],
        correctLabel: 'C',
      },
    },
    {
      anchor: 'cleaning-phase-distinction-and-sequencing',
      position: 'before',
      question: {
        questionText: 'Which paint sheen is MOST forgiving for touch-up work due to minimal light reflection?',
        options: [
          { label: 'A', text: 'Gloss' },
          { label: 'B', text: 'Semi-gloss' },
          { label: 'C', text: 'Satin' },
          { label: 'D', text: 'Matte/Flat' },
        ],
        correctLabel: 'D',
      },
    },
    {
      anchor: 'comprehensive-punch-list-inspection-methodology',
      position: 'before',
      question: {
        questionText: 'Natural stone materials including marble and limestone require which type of cleaner to prevent etching?',
        options: [
          { label: 'A', text: 'pH-neutral cleaners' },
          { label: 'B', text: 'Acidic cleaners' },
          { label: 'C', text: 'Alkaline cleaners' },
          { label: 'D', text: 'Ammonia-based cleaners' },
        ],
        correctLabel: 'A',
      },
    },
  ],
  10: [
    {
      anchor: 'inspector-evaluation-methodology-and-scope',
      position: 'before',
      question: {
        questionText: 'When testing GFCI devices during final inspection, what indicates a properly functioning device?',
        options: [
          { label: 'A', text: 'The device makes a clicking sound when the test button is pressed' },
          { label: 'B', text: 'The circuit breaker trips at the main panel' },
          { label: 'C', text: 'The device trips and power is interrupted when the test button is pressed' },
          { label: 'D', text: 'A red light illuminates on the device face' },
        ],
        correctLabel: 'C',
      },
    },
    {
      anchor: 'regulatory-authority-and-legal-significance',
      position: 'before',
      question: {
        questionText: 'During final building inspection, what minimum clear opening size is required for emergency escape windows from sleeping rooms?',
        options: [
          { label: 'A', text: '5.0 square feet net clear opening' },
          { label: 'B', text: '5.7 square feet net clear opening' },
          { label: 'C', text: '6.5 square feet net clear opening' },
          { label: 'D', text: '4.8 square feet net clear opening' },
        ],
        correctLabel: 'B',
      },
    },
    {
      anchor: 'comprehensive-lien-release-procurement',
      position: 'before',
      question: {
        questionText: 'During homeowner orientation, what monthly maintenance task is most critical for preventing HVAC system damage and maintaining efficiency?',
        options: [
          { label: 'A', text: 'Checking thermostat battery levels' },
          { label: 'B', text: 'Cleaning outdoor condenser coils with a hose' },
          { label: 'C', text: 'Air filter inspection and replacement as needed' },
          { label: 'D', text: 'Verifying refrigerant line insulation condition' },
        ],
        correctLabel: 'C',
      },
    },
    {
      anchor: 'formal-handover-procedures-and-key-transfer',
      position: 'before',
      question: {
        questionText: 'What percentage of construction work is typically withheld as retainage throughout the construction period to ensure contractor performance?',
        options: [
          { label: 'A', text: '2% to 5% of contract value' },
          { label: 'B', text: '10% to 15% of contract value' },
          { label: 'C', text: '5% to 10% of contract value' },
          { label: 'D', text: '15% to 20% of contract value' },
        ],
        correctLabel: 'C',
      },
    },
  ],
};

function selectCheckpointQuestions(quizzes: QuizInput[], count: number): CheckpointQuestion[] {
  if (quizzes.length === 0) return [];

  const selected: CheckpointQuestion[] = [];
  const stride = Math.max(1, Math.floor(quizzes.length / count));

  for (let i = 0; i < count && i * stride < quizzes.length; i++) {
    const q = quizzes[i * stride];
    selected.push({
      questionText: q.questionText,
      options: [
        { label: 'A', text: q.optionA },
        { label: 'B', text: q.optionB },
        { label: 'C', text: q.optionC },
        { label: 'D', text: q.optionD },
      ],
      correctLabel: q.correctAnswer,
    });
  }

  return selected;
}

function buildCheckpointHtml(question: CheckpointQuestion, index: number): string {
  const optionsHtml = question.options
    .map(
      (opt) =>
        `<div class="knowledge-check__option" data-option="${opt.label}"><span class="knowledge-check__option-label">${opt.label}</span> ${opt.text}</div>`
    )
    .join('\n');

  const correctOption = question.options.find((o) => o.label === question.correctLabel);
  const answerText = correctOption
    ? `${correctOption.label}. ${correctOption.text}`
    : question.correctLabel;

  return `
    <div class="knowledge-check" data-correct="${question.correctLabel}">
      <div class="knowledge-check__header">
        <span class="knowledge-check__badge">Knowledge Check #${index + 1}</span>
      </div>
      <div class="knowledge-check__body">
        <p class="knowledge-check__question">${question.questionText}</p>
        <div class="knowledge-check__options">
          ${optionsHtml}
        </div>
        <button class="knowledge-check__reveal-btn knowledge-check__reveal-btn--locked" disabled>Select an answer first</button>
        <div class="knowledge-check__answer knowledge-check__answer--hidden">${answerText}</div>
      </div>
    </div>
  `;
}

export function insertCheckpoints($: CheerioAPI, quizzes: QuizInput[], moduleNumber?: number): void {
  const placements = moduleNumber ? checkpointPlacements[moduleNumber] : undefined;

  if (placements) {
    // Config-driven placement: questions are hardcoded in the placement config
    const slugify = (text: string) =>
      text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Ensure all h3s and h4s have IDs (h3s may already have them from extract-toc)
    $('h3, h4').each((_, el) => {
      if (!$(el).attr('id')) {
        const text = $(el).text().trim();
        if (text) $(el).attr('id', slugify(text));
      }
    });

    // Insert in forward order. For same-anchor 'before' placements, each
    // before() inserts between the previous KC and the target, preserving
    // config order in the DOM (first config entry = first in reading order).
    for (let i = 0; i < placements.length; i++) {
      const placement = placements[i];
      const anchor = $(`h3#${placement.anchor}, h4#${placement.anchor}`);
      if (anchor.length === 0) continue;

      const html = buildCheckpointHtml(placement.question, i);

      // If the anchor heading is inside a <details> element, insert relative to the
      // <details> instead — so the KC is visible outside the collapsible section
      const parentDetails = anchor.closest('details');
      const insertTarget = parentDetails.length > 0 ? parentDetails : anchor;

      if (placement.position === 'before') {
        insertTarget.before(html);
      } else {
        insertTarget.after(html);
      }
    }
  } else {
    // Fallback: distribute across h3 sections (for modules without specific config)
    const questions = selectCheckpointQuestions(quizzes, 5);
    if (questions.length === 0) return;

    const h3Elements = $('h3').toArray();
    if (h3Elements.length === 0) return;

    const sectionCount = h3Elements.length;
    const distribution: number[] = new Array(sectionCount).fill(0);
    for (let i = 0; i < questions.length; i++) {
      distribution[i % sectionCount]++;
    }

    let questionIndex = 0;
    for (let sectionIdx = 0; sectionIdx < sectionCount; sectionIdx++) {
      const questionsForSection = distribution[sectionIdx];
      if (questionsForSection === 0) continue;

      let checkpointHtml = '';
      for (let q = 0; q < questionsForSection; q++) {
        if (questionIndex < questions.length) {
          checkpointHtml += buildCheckpointHtml(questions[questionIndex], questionIndex);
          questionIndex++;
        }
      }

      if (sectionIdx < sectionCount - 1) {
        $(h3Elements[sectionIdx + 1]).before(checkpointHtml);
      } else {
        $('body').children().last().after(checkpointHtml);
      }
    }
  }
}
