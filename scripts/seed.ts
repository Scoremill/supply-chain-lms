
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const moduleData = [
  {
    moduleNumber: 1,
    title: "Current State, and How We Got Here",
    description: "Understand the current state of the residential construction supply chain, how it evolved, and why change is necessary to protect margins and improve operations.",
    content: `
<div class="module-content">
  <section class="learning-objectives">
    <h2>Learning Objectives</h2>
    <ul>
      <li>Understand the course goals and expectations</li>
      <li>Navigate and use the online application effectively</li>
      <li>Recognize how the residential construction supply chain evolved to its current state</li>
      <li>Identify the key challenges and inefficiencies in today's supply chain model</li>
      <li>Understand why change is necessary to remain competitive</li>
    </ul>
  </section>

  <section class="content-section">
    <h2>Overview</h2>
    <p>The residential construction supply chain has evolved over decades through a combination of industry consolidation, changing trade dynamics, and economic cycles. Understanding how we got to the current state — and why that state is insufficient for the challenges ahead — is the essential first step in transforming supply chain operations.</p>

    <h3>Course Goals and Expectations</h3>
    <p>This course is designed to give construction professionals a comprehensive understanding of supply chain management as it applies specifically to residential homebuilding. By the end of this course, you will understand unit pricing, supply chain communication, disruption management, continuous improvement, and global best practices — all through the lens of building homes more efficiently and profitably.</p>

    <h3>The Evolution of the Construction Supply Chain</h3>
    <p>Content to be developed — covering the historical progression from local, relationship-based purchasing to today's complex, multi-tier supply networks. Key milestones include the rise of national homebuilders, the consolidation of building material distributors, the impact of the 2008 housing crisis on trade capacity, and the supply chain disruptions of 2020-2022.</p>

    <h3>Why Change Is Necessary</h3>
    <p>Content to be developed — covering the competitive pressures, margin compression, labor constraints, and material volatility that make supply chain transformation essential for builders who want to thrive in the next decade.</p>
  </section>
</div>
    `,
    order: 1
  },
  {
    moduleNumber: 2,
    title: "Unit Pricing for Materials and Labor is the Key",
    description: "Learn why unit pricing is the foundation of effective supply chain management and how to implement it across material and labor categories.",
    content: `
<div class="module-content">
  <section class="learning-objectives">
    <h2>Learning Objectives</h2>
    <ul>
      <li>Understand the fundamentals of unit pricing in residential construction</li>
      <li>Master key terminology and definitions used in supply chain cost analysis</li>
      <li>Calculate unit costs for common material and labor categories</li>
      <li>Use unit pricing to benchmark performance and identify savings opportunities</li>
      <li>Recognize the difference between unit pricing and lump-sum pricing approaches</li>
    </ul>
  </section>

  <section class="content-section">
    <h2>Overview</h2>
    <p>Unit pricing is the single most powerful tool in a supply chain professional's toolkit. Without understanding the true cost per unit of every material and labor component that goes into a home, it is impossible to benchmark, negotiate, or improve. Yet the majority of builders still operate with lump-sum pricing that hides inefficiencies, subsidizes waste, and prevents meaningful cost comparison.</p>

    <h3>Introduction to Unit Pricing</h3>
    <p>Content to be developed — covering the definition of unit pricing, how it differs from lump-sum approaches, and why it matters for cost transparency and continuous improvement.</p>

    <h3>Key Terminology and Definitions</h3>
    <p>Content to be developed — a comprehensive glossary of supply chain cost terms including unit cost, landed cost, total cost of ownership, cost per square foot, material yield, waste factor, and labor productivity rates.</p>

    <h3>Applying Unit Pricing in Practice</h3>
    <p>Content to be developed — step-by-step methodology for converting lump-sum bids to unit pricing, building unit cost databases, and using unit pricing for vendor comparison and negotiation.</p>
  </section>
</div>
    `,
    order: 2
  },
  {
    moduleNumber: 3,
    title: "How Supply Chain Management is Typically Done",
    description: "Examine the major principles, theoretical frameworks, and real-world practices that define supply chain management in residential construction today.",
    content: `
<div class="module-content">
  <section class="learning-objectives">
    <h2>Learning Objectives</h2>
    <ul>
      <li>Understand the major principles and theoretical frameworks of supply chain management</li>
      <li>Analyze real-world case studies of supply chain practices in homebuilding</li>
      <li>Identify common supply chain structures used by production builders</li>
      <li>Recognize the strengths and weaknesses of current approaches</li>
      <li>Evaluate how different builder sizes and types approach supply chain differently</li>
    </ul>
  </section>

  <section class="content-section">
    <h2>Overview</h2>
    <p>Supply chain management in residential construction follows patterns that have developed over decades. Understanding how the industry typically manages procurement, logistics, and vendor relationships — including both the effective practices and the persistent inefficiencies — provides the baseline from which improvement efforts can be measured.</p>

    <h3>Major Principles and Frameworks</h3>
    <p>Content to be developed — covering the theoretical foundations of supply chain management and how they apply to the unique characteristics of residential construction (project-based delivery, temporary worksites, trade partner dependency, seasonal demand).</p>

    <h3>Case Studies and Real-World Examples</h3>
    <p>Content to be developed — examining how top builders structure their supply chains, including procurement organization, vendor management programs, technology adoption, and performance measurement. Both successful approaches and cautionary examples will be included.</p>

    <h3>Current State Assessment</h3>
    <p>Content to be developed — providing a framework for builders to assess their own supply chain maturity and identify the highest-impact improvement opportunities.</p>
  </section>
</div>
    `,
    order: 3
  },
  {
    moduleNumber: 4,
    title: "The Way Turn-key Subcontractors Manage Materials and Labor",
    description: "Explore how turn-key subcontractors manage their own supply chains and labor, and what builders need to understand about this critical relationship.",
    content: `
<div class="module-content">
  <section class="learning-objectives">
    <h2>Learning Objectives</h2>
    <ul>
      <li>Understand the turn-key subcontractor model and how it affects the supply chain</li>
      <li>Analyze practical use cases and scenarios involving subcontractor material management</li>
      <li>Walk through step-by-step processes for subcontractor procurement coordination</li>
      <li>Identify opportunities to improve material efficiency within the subcontractor model</li>
      <li>Evaluate the true cost implications of turn-key versus builder-supplied material models</li>
    </ul>
  </section>

  <section class="content-section">
    <h2>Overview</h2>
    <p>In residential construction, the majority of materials are procured and installed by turn-key subcontractors who provide both labor and materials as a bundled service. This model has significant implications for supply chain management — the builder delegates material procurement but also loses visibility into pricing, waste, and sourcing decisions. Understanding how subcontractors manage their supply chains is essential for builders seeking to optimize total construction cost.</p>

    <h3>The Turn-Key Model</h3>
    <p>Content to be developed — covering how turn-key subcontractors price work, manage material procurement, handle waste, and make sourcing decisions. Includes the economic incentives and constraints that drive subcontractor behavior.</p>

    <h3>Practical Scenarios</h3>
    <p>Content to be developed — step-by-step walkthroughs of common scenarios including subcontractor material management, change order pricing, waste accountability, and quality control in the turn-key model.</p>

    <h3>Hands-On Exercises</h3>
    <p>Content to be developed — practical exercises analyzing real subcontractor bids, identifying hidden costs, and evaluating alternative procurement approaches.</p>
  </section>
</div>
    `,
    order: 4
  },
  {
    moduleNumber: 5,
    title: "Whole Supply Chain Communications",
    description: "Master the communication tools, processes, and technologies that enable effective information flow across the entire construction supply chain.",
    content: `
<div class="module-content">
  <section class="learning-objectives">
    <h2>Learning Objectives</h2>
    <ul>
      <li>Identify the essential communication tools used in construction supply chains</li>
      <li>Navigate key resources and platforms for supply chain coordination</li>
      <li>Understand how information flows between builders, suppliers, and trade partners</li>
      <li>Implement effective communication processes that reduce errors and delays</li>
      <li>Evaluate technology solutions for supply chain communication</li>
    </ul>
  </section>

  <section class="content-section">
    <h2>Overview</h2>
    <p>Information flow is the weakest link in most construction supply chains. While material and financial flows have been incrementally improved over decades, the way builders communicate with suppliers and trade partners remains largely manual, fragmented, and error-prone. Broken communication causes late deliveries, wrong materials, duplicated orders, and scheduling conflicts — all of which cost money and extend cycle times.</p>

    <h3>Essential Communication Tools</h3>
    <p>Content to be developed — covering the tools and platforms used for purchase orders, delivery scheduling, change orders, inventory tracking, and supplier performance communication.</p>

    <h3>Resource Navigation</h3>
    <p>Content to be developed — demonstrating how to navigate key supply chain resources including distributor portals, manufacturer specification databases, and industry pricing indices.</p>

    <h3>Technology Integration</h3>
    <p>Content to be developed — examining how modern technology platforms integrate communication across the supply chain, including ERP systems, procurement platforms, and mobile field tools.</p>
  </section>
</div>
    `,
    order: 5
  },
  {
    moduleNumber: 6,
    title: "When the Supply Chain Breaks – 1.2 million",
    description: "Analyze what happens when supply chain disruptions occur, understand the true cost impact, and develop strategies for resilience and recovery.",
    content: `
<div class="module-content">
  <section class="learning-objectives">
    <h2>Learning Objectives</h2>
    <ul>
      <li>Explore advanced methods for identifying and responding to supply chain disruptions</li>
      <li>Analyze problem-solving approaches for common and catastrophic supply chain failures</li>
      <li>Calculate the true cost impact of supply chain disruptions on homebuilding operations</li>
      <li>Develop resilience strategies that protect operations during market volatility</li>
      <li>Apply lessons learned from recent industry disruptions (2020-2022)</li>
    </ul>
  </section>

  <section class="content-section">
    <h2>Overview</h2>
    <p>The title of this module references a stark reality: the estimated cost impact when supply chain failures cascade through a homebuilding operation. When materials don't arrive, trade partners sit idle, schedules slip, carrying costs mount, and customer satisfaction plummets. Understanding the full impact of disruption — and building systems to prevent and recover from it — is one of the highest-value activities in supply chain management.</p>

    <h3>When Things Go Wrong</h3>
    <p>Content to be developed — analyzing common and catastrophic supply chain failure modes including supplier bankruptcy, commodity price spikes, logistics breakdowns, quality failures, and demand-supply mismatches.</p>

    <h3>Problem-Solving Approaches</h3>
    <p>Content to be developed — structured problem-solving methodologies for diagnosing and resolving supply chain disruptions, including root cause analysis, rapid response protocols, and stakeholder communication.</p>

    <h3>Building Resilience</h3>
    <p>Content to be developed — strategies for supply chain resilience including supplier diversification, strategic inventory positioning, flexible contracts, and early warning systems.</p>
  </section>
</div>
    `,
    order: 6
  },
  {
    moduleNumber: 7,
    title: "Continual Improvement and Artificial Intelligence in Supply Chain Management",
    description: "Discover how continuous improvement methodologies and emerging AI technologies are transforming construction supply chain performance.",
    content: `
<div class="module-content">
  <section class="learning-objectives">
    <h2>Learning Objectives</h2>
    <ul>
      <li>Understand current best practices and standards in supply chain continuous improvement</li>
      <li>Explore how artificial intelligence and machine learning apply to construction procurement</li>
      <li>Identify practical AI applications for demand forecasting, pricing, and logistics</li>
      <li>Develop a continuous improvement framework for supply chain operations</li>
      <li>Evaluate the readiness and realistic timeline for AI adoption in homebuilding</li>
    </ul>
  </section>

  <section class="content-section">
    <h2>Overview</h2>
    <p>Continuous improvement is not a one-time project — it is an operating philosophy that drives incremental gains across every supply chain process. When combined with emerging artificial intelligence capabilities, continuous improvement becomes even more powerful: AI can identify patterns, predict disruptions, optimize pricing, and automate routine decisions at a scale and speed that human analysis cannot match.</p>

    <h3>Current Best Practices and Standards</h3>
    <p>Content to be developed — covering lean supply chain principles, Six Sigma applications in construction procurement, Kaizen methodology, and industry benchmarking standards.</p>

    <h3>AI in Construction Supply Chain</h3>
    <p>Content to be developed — examining practical AI applications including demand forecasting, dynamic pricing optimization, predictive maintenance for logistics assets, automated quality inspection, and intelligent procurement recommendations.</p>

    <h3>Expert Perspectives</h3>
    <p>Content to be developed — insights from industry experts on the trajectory of AI adoption in construction, including realistic expectations, implementation challenges, and the human role in an AI-augmented supply chain.</p>
  </section>
</div>
    `,
    order: 7
  },
  {
    moduleNumber: 8,
    title: "What Japanese Homebuilders Do Differently",
    description: "Examine the supply chain practices of Japanese homebuilders and explore how their approaches to standardization, quality, and efficiency can be adapted for the U.S. market.",
    content: `
<div class="module-content">
  <section class="learning-objectives">
    <h2>Learning Objectives</h2>
    <ul>
      <li>Understand the policies, regulations, and cultural factors that shape Japanese homebuilding</li>
      <li>Examine the supply chain practices that enable Japanese builders to achieve superior quality and efficiency</li>
      <li>Explore ethical considerations and standards in global supply chain management</li>
      <li>Evaluate which Japanese practices can be adapted for U.S. residential construction</li>
      <li>Apply scenario-based learning to envision supply chain transformation</li>
    </ul>
  </section>

  <section class="content-section">
    <h2>Overview</h2>
    <p>Japanese homebuilders operate with a fundamentally different approach to supply chain management — one that emphasizes standardization, prefabrication, quality at the source, and deep supplier integration. While the U.S. and Japanese markets differ in many respects, the principles that Japanese builders have perfected offer powerful lessons for American builders seeking to improve supply chain performance.</p>

    <h3>The Japanese Approach</h3>
    <p>Content to be developed — covering how Japanese homebuilders like Sekisui House, Daiwa House, and Toyota Housing structure their supply chains, including factory prefabrication, supplier keiretsu relationships, quality management systems, and technology integration.</p>

    <h3>Policies and Regulations</h3>
    <p>Content to be developed — examining the regulatory and cultural context that enables Japanese supply chain practices, including building standards, labor policies, and industry structure.</p>

    <h3>Lessons for U.S. Builders</h3>
    <p>Content to be developed — scenario-based exercises exploring how specific Japanese practices could be adapted and implemented in U.S. residential construction, including realistic assessments of barriers and benefits.</p>
  </section>
</div>
    `,
    order: 8
  }
];

const quizQuestions = [
  // Module 1: Current State, and How We Got Here (20 questions)
  { moduleNumber: 1, question: "What percentage of a home's total construction cost is typically represented by material costs?", optionA: "20-30%", optionB: "40-50%", optionC: "60-70%", optionD: "80-90%", correct: "B" },
  { moduleNumber: 1, question: "Which event most dramatically exposed supply chain vulnerabilities in residential construction?", optionA: "The 2008 housing crisis", optionB: "The COVID-19 pandemic and subsequent supply chain disruptions", optionC: "Hurricane Katrina", optionD: "The 2001 recession", correct: "B" },
  { moduleNumber: 1, question: "What is the primary reason supply chain change is necessary for homebuilders?", optionA: "Government regulations require it", optionB: "Competitive pressures, margin compression, and material volatility demand better operations", optionC: "Customers are demanding it", optionD: "Technology companies are forcing adoption", correct: "B" },
  { moduleNumber: 1, question: "What is the weakest link in most construction supply chains?", optionA: "Material quality", optionB: "Transportation capacity", optionC: "Information flow", optionD: "Labor availability", correct: "C" },
  { moduleNumber: 1, question: "How many material categories does a typical production home require coordination of?", optionA: "10-20", optionB: "20-30", optionC: "50+", optionD: "100+", correct: "C" },
  { moduleNumber: 1, question: "What is the typical build cycle duration for a production home?", optionA: "30-60 days", optionB: "90-120 days", optionC: "180-240 days", optionD: "365+ days", correct: "B" },
  { moduleNumber: 1, question: "Which supply chain participant provides warehousing, delivery, and credit services?", optionA: "Manufacturers", optionB: "Distributors and dealers", optionC: "Trade partners", optionD: "Architects", correct: "B" },
  { moduleNumber: 1, question: "What drove the consolidation of building material distributors?", optionA: "Government mandates", optionB: "Market forces including economies of scale, purchasing power, and logistics efficiency", optionC: "Customer preferences", optionD: "Environmental regulations", correct: "B" },
  { moduleNumber: 1, question: "How did the 2008 housing crisis affect the trade partner workforce?", optionA: "It had no effect", optionB: "Significant loss of skilled trade capacity that took years to rebuild", optionC: "It increased the workforce", optionD: "It only affected large builders", correct: "B" },
  { moduleNumber: 1, question: "What is a primary consequence of poor supply chain management for homebuilders?", optionA: "Better customer relationships", optionB: "Longer cycle times, higher costs, and margin erosion", optionC: "Increased home values", optionD: "Reduced competition", correct: "B" },
  { moduleNumber: 1, question: "Which of the following is NOT one of the three primary flows in a supply chain?", optionA: "Material flow", optionB: "Information flow", optionC: "Labor flow", optionD: "Financial flow", correct: "C" },
  { moduleNumber: 1, question: "For a builder constructing 200 homes per year at $400,000 average price, what does a 1% improvement in material efficiency represent?", optionA: "$200,000", optionB: "$400,000", optionC: "$800,000", optionD: "$1,200,000", correct: "C" },
  { moduleNumber: 1, question: "What role do trade partners play in the supply chain?", optionA: "They only provide labor", optionB: "They both consume materials and drive demand signals through their schedules", optionC: "They design the homes", optionD: "They provide financing", correct: "B" },
  { moduleNumber: 1, question: "What fundamental characteristic makes the construction supply chain different from manufacturing?", optionA: "Construction uses fewer materials", optionB: "Deliveries go to temporary, unique job sites rather than fixed locations", optionC: "Construction has simpler logistics", optionD: "Manufacturing has more suppliers", correct: "B" },
  { moduleNumber: 1, question: "What is the primary benefit of supply chain efficiency for a homebuilder?", optionA: "Faster home design", optionB: "Direct margin improvement and shorter cycle times", optionC: "Reduced labor requirements", optionD: "Better customer reviews", correct: "B" },
  { moduleNumber: 1, question: "What happened to lumber prices during 2020-2022?", optionA: "They decreased significantly", optionB: "They tripled from pre-pandemic levels", optionC: "They remained stable", optionD: "They increased by 10%", correct: "B" },
  { moduleNumber: 1, question: "What is the relationship between supply chain efficiency and project timelines?", optionA: "No relationship", optionB: "Better efficiency extends timelines", optionC: "Better efficiency shortens timelines and protects margins", optionD: "Only affects costs, not timelines", correct: "C" },
  { moduleNumber: 1, question: "Why is understanding the current state of the supply chain important before attempting change?", optionA: "It is a regulatory requirement", optionB: "You must understand where you are before you can chart a course to where you want to be", optionC: "It impresses customers", optionD: "It is not important — just start changing things", correct: "B" },
  { moduleNumber: 1, question: "How has the rise of national homebuilders affected supply chain dynamics?", optionA: "No effect — all builders operate the same way", optionB: "Increased leverage with suppliers, more complex logistics, and greater need for standardized processes", optionC: "Simplified the supply chain", optionD: "Eliminated the need for distributors", correct: "B" },
  { moduleNumber: 1, question: "What is the course's core premise about residential construction supply chains?", optionA: "They are already optimized", optionB: "The current state is insufficient and transformation is necessary to compete", optionC: "Technology will solve all problems automatically", optionD: "Only large builders need to worry about supply chain", correct: "B" },

  // Module 2: Unit Pricing for Materials and Labor is the Key (20 questions)
  { moduleNumber: 2, question: "What is unit pricing in construction?", optionA: "The total cost of a home", optionB: "The cost per individual unit of material or labor (per board foot, per square foot, per linear foot, etc.)", optionC: "The price of one home lot", optionD: "The markup percentage on materials", correct: "B" },
  { moduleNumber: 2, question: "Why is lump-sum pricing problematic for supply chain management?", optionA: "It is always more expensive", optionB: "It hides inefficiencies, subsidizes waste, and prevents meaningful cost comparison", optionC: "Suppliers refuse to provide it", optionD: "It is not commonly used", correct: "B" },
  { moduleNumber: 2, question: "What is the primary advantage of unit pricing over lump-sum pricing?", optionA: "It is simpler to calculate", optionB: "It provides cost transparency that enables benchmarking, negotiation, and improvement", optionC: "It always results in lower costs", optionD: "Suppliers prefer it", correct: "B" },
  { moduleNumber: 2, question: "What is 'landed cost' in supply chain terminology?", optionA: "The cost of the building lot", optionB: "The total cost of a material delivered to the job site, including purchase price, freight, and handling", optionC: "The cost of land development", optionD: "The retail price of the material", correct: "B" },
  { moduleNumber: 2, question: "What is a 'waste factor' in material pricing?", optionA: "The cost of waste removal from the job site", optionB: "The additional percentage of material ordered beyond what is theoretically needed, to account for cutting, damage, and errors", optionC: "The environmental impact fee", optionD: "The recycling credit", correct: "B" },
  { moduleNumber: 2, question: "How does unit pricing enable supplier comparison?", optionA: "It doesn't — all suppliers price the same way", optionB: "It normalizes costs to a common unit, allowing apples-to-apples comparison across suppliers", optionC: "It only compares delivery speed", optionD: "It only compares quality", correct: "B" },
  { moduleNumber: 2, question: "What is 'total cost of ownership' in construction procurement?", optionA: "Only the purchase price", optionB: "Purchase price plus freight, handling, waste, installation labor, warranty exposure, and administrative overhead", optionC: "The home's sale price minus profit", optionD: "The cost of land and construction combined", correct: "B" },
  { moduleNumber: 2, question: "What is 'material yield' as a supply chain metric?", optionA: "The total amount purchased", optionB: "The percentage of purchased material that actually ends up installed in the home", optionC: "The number of deliveries per week", optionD: "The return rate of defective materials", correct: "B" },
  { moduleNumber: 2, question: "How should a builder convert a lump-sum subcontractor bid to unit pricing?", optionA: "Ask the subcontractor to lower their price", optionB: "Break the bid into material and labor components, then divide by the relevant quantity measure", optionC: "Just divide by square footage of the home", optionD: "It cannot be done", correct: "B" },
  { moduleNumber: 2, question: "What is 'cost per square foot' used for in supply chain analysis?", optionA: "Comparing home sizes", optionB: "Normalizing material costs across different plan sizes to enable meaningful comparisons", optionC: "Calculating home sale prices", optionD: "Determining labor costs only", correct: "B" },
  { moduleNumber: 2, question: "Why is a unit cost database valuable for a builder?", optionA: "It satisfies auditing requirements", optionB: "It provides historical benchmarks for evaluating bids, tracking trends, and identifying anomalies", optionC: "It replaces the need for negotiation", optionD: "It is only useful for accounting", correct: "B" },
  { moduleNumber: 2, question: "What is 'labor productivity rate' in construction?", optionA: "The hourly wage of workers", optionB: "The amount of work completed per unit of labor time (e.g., square feet of drywall hung per man-hour)", optionC: "The number of workers on site", optionD: "The overtime rate", correct: "B" },
  { moduleNumber: 2, question: "How does understanding unit pricing help during vendor negotiations?", optionA: "It doesn't — negotiations are relationship-based", optionB: "It gives the builder objective data to discuss specific cost components rather than just total price", optionC: "It eliminates the need for negotiation", optionD: "It only helps with small purchases", correct: "B" },
  { moduleNumber: 2, question: "What is a 'board foot' as a unit of measure?", optionA: "A square foot of flooring", optionB: "A volume measurement for lumber: 1 inch thick x 12 inches wide x 12 inches long", optionC: "A linear foot of baseboard", optionD: "A measurement of wall height", correct: "B" },
  { moduleNumber: 2, question: "Why do most builders still use lump-sum pricing despite its limitations?", optionA: "It is required by law", optionB: "It is simpler, requires less data management, and has been the historical industry norm", optionC: "It provides better cost control", optionD: "Suppliers only offer lump-sum pricing", correct: "B" },
  { moduleNumber: 2, question: "What happens when a builder cannot identify unit costs for key materials?", optionA: "Nothing — lump-sum pricing works fine", optionB: "They cannot benchmark, identify waste, or negotiate effectively on specific cost components", optionC: "Suppliers provide the data automatically", optionD: "The building inspector requires it", correct: "B" },
  { moduleNumber: 2, question: "How should builders track unit pricing over time?", optionA: "Check prices once per year", optionB: "Maintain a database that tracks unit costs by material, supplier, and time period for trend analysis", optionC: "Rely on supplier notifications", optionD: "Only track the most expensive items", correct: "B" },
  { moduleNumber: 2, question: "What is the relationship between unit pricing and waste reduction?", optionA: "No relationship", optionB: "Unit pricing reveals the true cost of waste, creating financial incentive and accountability for reduction", optionC: "Unit pricing increases waste", optionD: "Waste is only a labor issue", correct: "B" },
  { moduleNumber: 2, question: "What does 'cost per unit installed' capture that 'cost per unit purchased' does not?", optionA: "The supplier's profit margin", optionB: "The waste, handling, and installation labor required to get from purchase to installation", optionC: "The manufacturer's cost", optionD: "The architect's fee", correct: "B" },
  { moduleNumber: 2, question: "How does Ken Pinto's concept of 'How Much Is the Milk?' relate to unit pricing?", optionA: "It is about grocery shopping", optionB: "It illustrates that you cannot make good purchasing decisions without knowing the unit cost of what you are buying", optionC: "It is about dairy farming supply chains", optionD: "It refers to the color of building materials", correct: "B" },

  // Module 3: How Supply Chain Management is Typically Done (20 questions)
  { moduleNumber: 3, question: "What is the most common procurement approach used by production homebuilders?", optionA: "Just-in-time manufacturing", optionB: "Centralized purchasing with negotiated supplier agreements and scheduled deliveries", optionC: "Each site manager purchases independently", optionD: "All materials are manufactured on site", correct: "B" },
  { moduleNumber: 3, question: "What makes construction supply chain management unique compared to other industries?", optionA: "It uses more technology", optionB: "Project-based delivery, temporary worksites, trade partner dependency, and seasonal demand", optionC: "It is simpler than manufacturing", optionD: "It has fewer suppliers", correct: "B" },
  { moduleNumber: 3, question: "What is the typical role of a purchasing department in a production builder?", optionA: "Only placing orders", optionB: "Negotiating contracts, managing supplier relationships, tracking costs, and coordinating deliveries", optionC: "Designing the homes", optionD: "Managing construction schedules", correct: "B" },
  { moduleNumber: 3, question: "How do small custom builders typically manage their supply chain?", optionA: "The same as national builders", optionB: "More informally, often relying on personal relationships and individual supplier negotiation", optionC: "Through enterprise software systems", optionD: "They don't manage supply chain", correct: "B" },
  { moduleNumber: 3, question: "What is a 'negotiated supplier agreement' in homebuilding?", optionA: "A handshake deal", optionB: "A formal contract establishing pricing, service levels, and terms for a defined volume commitment", optionC: "A verbal price quote", optionD: "A credit application", correct: "B" },
  { moduleNumber: 3, question: "Why is construction one of the least digitized industries in supply chain management?", optionA: "Technology doesn't work in construction", optionB: "Fragmented industry structure, project-based work, field conditions, and resistance to change", optionC: "Construction doesn't need technology", optionD: "Technology is too expensive for builders", correct: "B" },
  { moduleNumber: 3, question: "What is a major weakness of current supply chain practices in homebuilding?", optionA: "Too much technology adoption", optionB: "Lack of visibility into true costs, particularly when subcontractors bundle materials and labor", optionC: "Too many suppliers", optionD: "Excessive data collection", correct: "B" },
  { moduleNumber: 3, question: "How does the size of a homebuilder affect their supply chain approach?", optionA: "Size has no effect", optionB: "Larger builders have more leverage, more formal processes, and more technology, but also more complexity", optionC: "Smaller builders have better supply chains", optionD: "Only builders above 1000 units need supply chain management", correct: "B" },
  { moduleNumber: 3, question: "What is supply chain maturity assessment?", optionA: "Measuring the age of supplier relationships", optionB: "A framework for evaluating how advanced a builder's supply chain capabilities are across key dimensions", optionC: "Checking if suppliers are financially mature", optionD: "Testing material durability", correct: "B" },
  { moduleNumber: 3, question: "What role does seasonality play in construction supply chain management?", optionA: "No role — construction is year-round", optionB: "Demand fluctuates seasonally, affecting material pricing, supplier capacity, and delivery schedules", optionC: "Only affects outdoor work", optionD: "Only matters in northern climates", correct: "B" },
  { moduleNumber: 3, question: "What is the most common method for builders to communicate purchase orders to suppliers?", optionA: "Automated EDI systems", optionB: "Phone calls, emails, and faxes — despite the availability of electronic alternatives", optionC: "Mobile apps exclusively", optionD: "In-person meetings", correct: "B" },
  { moduleNumber: 3, question: "How do top-performing builders approach supply chain differently?", optionA: "They spend less time on procurement", optionB: "They invest in data, relationships, technology, and continuous improvement", optionC: "They use the cheapest suppliers", optionD: "They eliminate all subcontractors", correct: "B" },
  { moduleNumber: 3, question: "What is a 'scheduled delivery' in the builder-supplier relationship?", optionA: "A delivery that arrives whenever the supplier has time", optionB: "A pre-planned delivery timed to align with the construction schedule for a specific home", optionC: "A daily delivery of all materials", optionD: "A delivery once per month", correct: "B" },
  { moduleNumber: 3, question: "What percentage of construction supply chain activities are still performed manually?", optionA: "Less than 10%", optionB: "The majority — 60-80% in most organizations", optionC: "About 50%", optionD: "Nearly 0%", correct: "B" },
  { moduleNumber: 3, question: "What is the primary challenge of managing suppliers across multiple communities?", optionA: "Finding enough suppliers", optionB: "Ensuring consistent pricing, quality, and service levels across different locations and teams", optionC: "Transportation costs only", optionD: "Different building codes", correct: "B" },
  { moduleNumber: 3, question: "How do builders typically measure supplier performance?", optionA: "They don't — they rely on gut feeling", optionB: "Through scorecards tracking delivery, quality, pricing, and responsiveness — though many builders lack formal programs", optionC: "Only by checking invoice accuracy", optionD: "Only through annual surveys", correct: "B" },
  { moduleNumber: 3, question: "What is the most common supply chain organizational structure in homebuilding?", optionA: "Fully centralized procurement", optionB: "A hybrid model with centralized contracts/strategy and decentralized execution at the division level", optionC: "Fully decentralized with no coordination", optionD: "Outsourced to third parties", correct: "B" },
  { moduleNumber: 3, question: "What is a key takeaway from studying how supply chain management is typically done?", optionA: "Current practices are optimal", optionB: "Significant opportunities exist to improve cost, speed, and quality through better supply chain practices", optionC: "Supply chain management is unnecessary for builders", optionD: "Only technology can improve the supply chain", correct: "B" },
  { moduleNumber: 3, question: "What theoretical framework is most applicable to construction supply chain improvement?", optionA: "Only accounting theory", optionB: "Lean thinking combined with supply chain management principles adapted for project-based delivery", optionC: "Only manufacturing theory", optionD: "Marketing theory", correct: "B" },
  { moduleNumber: 3, question: "Why is it valuable to study case studies of other builders' supply chain practices?", optionA: "To copy them exactly", optionB: "To learn from both successes and failures and adapt proven approaches to your own operation", optionC: "Case studies are not useful", optionD: "Only successful case studies matter", correct: "B" },

  // Module 4: The Way Turn-key Subcontractors Manage Materials and Labor (20 questions)
  { moduleNumber: 4, question: "What is a turn-key subcontractor model?", optionA: "The builder provides all materials and labor", optionB: "The subcontractor provides both materials and labor as a bundled service", optionC: "The subcontractor provides only labor", optionD: "The builder hires employees instead of subcontractors", correct: "B" },
  { moduleNumber: 4, question: "What visibility does a builder lose in the turn-key model?", optionA: "Quality visibility", optionB: "Visibility into material pricing, sourcing decisions, and waste within the subcontractor's operation", optionC: "Schedule visibility", optionD: "Safety visibility", correct: "B" },
  { moduleNumber: 4, question: "How do turn-key subcontractors typically price their work?", optionA: "Unit pricing for every component", optionB: "A lump sum that bundles material cost, labor cost, overhead, and profit margin", optionC: "Cost-plus with open books", optionD: "Hourly rate only", correct: "B" },
  { moduleNumber: 4, question: "What is hidden in a turn-key subcontractor's lump-sum bid?", optionA: "Nothing — all costs are transparent", optionB: "Material markup, waste factor, labor inefficiency, and overhead allocation", optionC: "Only the profit margin", optionD: "Only the material cost", correct: "B" },
  { moduleNumber: 4, question: "What economic incentive drives subcontractor material purchasing decisions?", optionA: "Getting the best quality for the builder", optionB: "Maximizing their own margin — which may not align with the builder's quality or cost objectives", optionC: "Meeting environmental standards", optionD: "Impressing the builder", correct: "B" },
  { moduleNumber: 4, question: "How can a builder gain better cost visibility in a turn-key relationship?", optionA: "Ignore material costs and focus only on the total bid", optionB: "Request unit pricing breakdowns, track material specifications, and audit waste on site", optionC: "Switch to all self-performed work", optionD: "Accept whatever the subcontractor proposes", correct: "B" },
  { moduleNumber: 4, question: "What is the primary advantage of the turn-key model for builders?", optionA: "Lower material costs", optionB: "Simplified management — the builder delegates procurement complexity to the subcontractor", optionC: "Better material quality", optionD: "Faster construction", correct: "B" },
  { moduleNumber: 4, question: "What is the primary disadvantage of the turn-key model?", optionA: "Higher labor costs", optionB: "Loss of cost visibility and control over material sourcing, pricing, and waste", optionC: "Slower construction", optionD: "More complex scheduling", correct: "B" },
  { moduleNumber: 4, question: "How do subcontractors typically handle material waste?", optionA: "They absorb all waste costs", optionB: "Waste costs are embedded in the lump-sum bid and ultimately paid by the builder", optionC: "The builder pays separately for waste removal", optionD: "There is no waste in construction", correct: "B" },
  { moduleNumber: 4, question: "What is 'builder-supplied material' as an alternative to turn-key?", optionA: "The builder manufactures materials", optionB: "The builder purchases materials directly and provides them to subcontractors for installation", optionC: "The builder stores all materials at a central warehouse", optionD: "Materials are supplied by the homeowner", correct: "B" },
  { moduleNumber: 4, question: "When might builder-supplied material be more cost-effective than turn-key?", optionA: "Never — turn-key is always cheaper", optionB: "When the builder can leverage volume across many homes to negotiate better pricing than individual subcontractors", optionC: "Only for small custom homes", optionD: "Only during material shortages", correct: "B" },
  { moduleNumber: 4, question: "What risk does a builder take on with builder-supplied material?", optionA: "No additional risk", optionB: "Responsibility for ordering, delivery timing, damage, and ensuring the right materials are on site when needed", optionC: "Only financial risk", optionD: "Only quality risk", correct: "B" },
  { moduleNumber: 4, question: "How should change orders be evaluated in a turn-key relationship?", optionA: "Accept the subcontractor's price without question", optionB: "Break down the change order into unit pricing to evaluate whether the charge reflects true cost", optionC: "Reject all change orders", optionD: "Only approve change orders under $500", correct: "B" },
  { moduleNumber: 4, question: "What is the impact of subcontractor material choices on builder warranty exposure?", optionA: "No impact — subcontractors handle all warranties", optionB: "The builder ultimately bears warranty liability, even when subcontractors chose the materials", optionC: "Warranties are the manufacturer's responsibility only", optionD: "Warranty exposure is covered by insurance", correct: "B" },
  { moduleNumber: 4, question: "How can builders incentivize subcontractors to reduce waste?", optionA: "Demand lower prices", optionB: "Shared savings programs where both parties benefit from documented waste reduction", optionC: "Threaten to find new subcontractors", optionD: "Waste cannot be reduced", correct: "B" },
  { moduleNumber: 4, question: "What should builders audit on job sites regarding turn-key subcontractor materials?", optionA: "Nothing — trust the subcontractor", optionB: "Material specifications match contract requirements, waste levels, and installation quality", optionC: "Only the final appearance", optionD: "Only the delivery tickets", correct: "B" },
  { moduleNumber: 4, question: "How does the turn-key model affect the builder's ability to benchmark costs across divisions?", optionA: "It makes benchmarking easier", optionB: "Lump-sum pricing makes it difficult to compare unit costs across regions or subcontractors", optionC: "Benchmarking is not needed in turn-key", optionD: "It has no effect on benchmarking", correct: "B" },
  { moduleNumber: 4, question: "What is a hybrid procurement model?", optionA: "Only using one subcontractor", optionB: "Builder supplies some materials directly while subcontractors supply others, based on where the builder can add value", optionC: "Using both domestic and international suppliers", optionD: "A temporary arrangement during shortages", correct: "B" },
  { moduleNumber: 4, question: "What determines whether a builder should supply a material directly versus through a subcontractor?", optionA: "Only the builder's preference", optionB: "Volume leverage potential, category complexity, logistics capability, and the builder's procurement infrastructure", optionC: "Subcontractor willingness", optionD: "Material weight", correct: "B" },
  { moduleNumber: 4, question: "What is the key takeaway about the turn-key subcontractor model?", optionA: "It is the only viable model", optionB: "It trades simplicity for cost visibility — builders must actively manage the trade-off", optionC: "It should be eliminated entirely", optionD: "It has no disadvantages", correct: "B" },

  // Module 5: Whole Supply Chain Communications (20 questions)
  { moduleNumber: 5, question: "What is the most common cause of supply chain errors in residential construction?", optionA: "Bad suppliers", optionB: "Communication breakdowns — wrong information, late information, or missing information", optionC: "Incorrect building plans", optionD: "Bad weather", correct: "B" },
  { moduleNumber: 5, question: "What does 'whole supply chain communication' encompass?", optionA: "Only builder-to-supplier communication", optionB: "Information flow between all participants: builders, suppliers, distributors, trade partners, and manufacturers", optionC: "Only internal company communication", optionD: "Only digital communication", correct: "B" },
  { moduleNumber: 5, question: "Why do communication breakdowns have cascading effects in construction?", optionA: "They don't — problems stay isolated", optionB: "Each task depends on preceding tasks, so errors propagate through the schedule", optionC: "Only affect the person who made the error", optionD: "They are easily corrected", correct: "B" },
  { moduleNumber: 5, question: "What is the primary benefit of electronic purchase orders over phone-based ordering?", optionA: "Lower prices", optionB: "Reduced errors, audit trails, faster processing, and better record-keeping", optionC: "Faster delivery", optionD: "Better supplier relationships", correct: "B" },
  { moduleNumber: 5, question: "How does poor communication affect material delivery accuracy?", optionA: "No effect", optionB: "Wrong items, wrong quantities, wrong timing, and wrong delivery locations", optionC: "Only affects pricing", optionD: "Only affects quality", correct: "B" },
  { moduleNumber: 5, question: "What information should a construction schedule communicate to the supply chain?", optionA: "Only the project start date", optionB: "Activity start dates, material need dates, trade partner mobilization dates, and milestone targets", optionC: "Only the completion date", optionD: "Only weather delays", correct: "B" },
  { moduleNumber: 5, question: "What is a purchase order in supply chain communication?", optionA: "A verbal request for materials", optionB: "A formal document specifying what is needed, quantities, pricing, delivery date, and location", optionC: "An invoice from the supplier", optionD: "A budget estimate", correct: "B" },
  { moduleNumber: 5, question: "How should change orders be communicated in the supply chain?", optionA: "Verbally to the trade partner only", optionB: "Documented and communicated to all affected parties: supplier, trade partner, scheduler, and accounting", optionC: "Only in the project file", optionD: "Only at the weekly meeting", correct: "B" },
  { moduleNumber: 5, question: "What technology enables real-time visibility into delivery status?", optionA: "Fax machines", optionB: "GPS tracking, delivery management platforms, and mobile confirmation systems", optionC: "Phone calls only", optionD: "Weekly status reports", correct: "B" },
  { moduleNumber: 5, question: "What is the cost of a communication error that sends wrong materials to a job site?", optionA: "Only the cost of returning the materials", optionB: "Return freight, restocking fees, trade partner idle time, schedule delay, and administrative overhead", optionC: "No cost — the supplier absorbs it", optionD: "Only the difference in material price", correct: "B" },
  { moduleNumber: 5, question: "What is a 'delivery confirmation' in supply chain communication?", optionA: "A phone call saying the truck left", optionB: "Documented verification that correct materials were delivered complete, undamaged, and to the right location", optionC: "The driver's signature only", optionD: "The invoice", correct: "B" },
  { moduleNumber: 5, question: "How does ERP software improve supply chain communication?", optionA: "It replaces all human communication", optionB: "It creates a single source of truth that all functions can access for consistent, current information", optionC: "It only helps accounting", optionD: "It slows down communication", correct: "B" },
  { moduleNumber: 5, question: "What communication should occur when a schedule changes?", optionA: "Wait until the next regularly scheduled meeting", optionB: "Immediate notification to all affected suppliers and trade partners with updated delivery dates", optionC: "Only notify the project manager", optionD: "No communication needed", correct: "B" },
  { moduleNumber: 5, question: "What is a 'supplier portal' in supply chain technology?", optionA: "A physical entrance to the supplier's warehouse", optionB: "A web-based platform where builders and suppliers share orders, schedules, and performance data", optionC: "A marketing website", optionD: "An employee training system", correct: "B" },
  { moduleNumber: 5, question: "Why is standardized communication important across multiple divisions?", optionA: "It limits creativity", optionB: "Consistent processes and formats reduce errors and enable meaningful performance comparison", optionC: "Each division should communicate differently", optionD: "It only matters for large builders", correct: "B" },
  { moduleNumber: 5, question: "What role does mobile technology play in job site communication?", optionA: "None — job sites don't use technology", optionB: "Enables real-time receiving confirmation, issue reporting, and schedule updates from the field", optionC: "Only for taking photos", optionD: "Only for personal communication", correct: "B" },
  { moduleNumber: 5, question: "What information should flow from the job site back to the purchasing team?", optionA: "Nothing — purchasing only sends information out", optionB: "Delivery confirmations, damage reports, quality issues, quantity discrepancies, and schedule changes", optionC: "Only complaints", optionD: "Only completion notifications", correct: "B" },
  { moduleNumber: 5, question: "How does the lack of standardized product identification (SKUs) affect supply chain communication?", optionA: "No effect", optionB: "Creates ambiguity and errors — different people may use different names or codes for the same product", optionC: "Makes communication easier", optionD: "Only affects inventory counting", correct: "B" },
  { moduleNumber: 5, question: "What is the single most impactful improvement most builders can make in supply chain communication?", optionA: "Buy more software", optionB: "Replacing manual, fragmented processes with documented, standardized workflows", optionC: "Hire more people", optionD: "Hold more meetings", correct: "B" },
  { moduleNumber: 5, question: "What role does communication play in supplier performance management?", optionA: "No role — performance is measured automatically", optionB: "Regular, data-driven communication about performance creates accountability and drives improvement", optionC: "Only annual reviews matter", optionD: "Communication hurts supplier relationships", correct: "B" },

  // Module 6: When the Supply Chain Breaks – 1.2 million (20 questions)
  { moduleNumber: 6, question: "What does the '1.2 million' in this module's title refer to?", optionA: "The number of homes built per year", optionB: "The estimated cost impact when supply chain failures cascade through a homebuilding operation", optionC: "The number of suppliers in the U.S.", optionD: "The number of construction workers", correct: "B" },
  { moduleNumber: 6, question: "What is the most common trigger for supply chain disruptions in homebuilding?", optionA: "Natural disasters", optionB: "Commodity price volatility and supplier capacity constraints", optionC: "Technology failures", optionD: "Regulatory changes", correct: "B" },
  { moduleNumber: 6, question: "What happened to appliance lead times during the 2020-2022 supply chain crisis?", optionA: "They shortened", optionB: "They stretched to six months or more", optionC: "They remained the same", optionD: "Appliances were unaffected", correct: "B" },
  { moduleNumber: 6, question: "What is the cascade effect of a missing material on a job site?", optionA: "Only a minor delay", optionB: "Trade partners sit idle, subsequent trades are delayed, carrying costs mount, and closing dates slip", optionC: "Only affects the immediate trade", optionD: "No effect if you have other work to do", correct: "B" },
  { moduleNumber: 6, question: "What is 'concentration risk' in supply chain management?", optionA: "Having too many suppliers", optionB: "Depending on a single supplier for a critical material — if they fail, you have no backup", optionC: "Focusing on one geographic market", optionD: "Having too much inventory", correct: "B" },
  { moduleNumber: 6, question: "What is the first step in responding to a supply chain disruption?", optionA: "Blame the supplier", optionB: "Assess the scope and impact, then activate contingency plans with clear communication to all stakeholders", optionC: "Wait and hope it resolves", optionD: "Immediately switch all suppliers", correct: "B" },
  { moduleNumber: 6, question: "What is root cause analysis in supply chain problem-solving?", optionA: "Identifying who is to blame", optionB: "A structured method to identify the underlying cause of a problem rather than just treating symptoms", optionC: "Analyzing tree root damage to foundations", optionD: "A financial accounting method", correct: "B" },
  { moduleNumber: 6, question: "How did builders with diversified supply bases fare during recent disruptions?", optionA: "The same as everyone else", optionB: "Better — they had alternative sources when primary suppliers couldn't deliver", optionC: "Worse — more suppliers means more complexity", optionD: "Diversification didn't matter", correct: "B" },
  { moduleNumber: 6, question: "What is a supply chain contingency plan?", optionA: "A list of complaints about suppliers", optionB: "A pre-developed plan identifying alternative actions, suppliers, and processes for likely disruption scenarios", optionC: "An insurance policy", optionD: "A legal document", correct: "B" },
  { moduleNumber: 6, question: "What is 'strategic inventory positioning' as a resilience strategy?", optionA: "Storing all inventory at the corporate office", optionB: "Maintaining safety stock of long-lead, critical materials to buffer against disruptions", optionC: "Eliminating all inventory", optionD: "Moving inventory between job sites", correct: "B" },
  { moduleNumber: 6, question: "How do strong supplier relationships help during supply chain disruptions?", optionA: "They don't help during disruptions", optionB: "Suppliers prioritize allocation to builders they have strong relationships with", optionC: "Only contractual obligations matter", optionD: "Relationships make disruptions worse", correct: "B" },
  { moduleNumber: 6, question: "What is the true cost of a one-week construction delay?", optionA: "One week of carrying costs only", optionB: "Carrying costs, trade partner re-mobilization, schedule cascade effects, customer dissatisfaction, and opportunity cost", optionC: "Zero — delays are normal", optionD: "Only the interest on the construction loan", correct: "B" },
  { moduleNumber: 6, question: "What early warning indicators suggest a supply chain disruption is developing?", optionA: "There are no early warning signs", optionB: "Increasing lead times, supplier communication changes, commodity price spikes, and industry reports", optionC: "Only when materials don't arrive", optionD: "News headlines only", correct: "B" },
  { moduleNumber: 6, question: "What is the role of flexible contracts in disruption management?", optionA: "Contracts can't help during disruptions", optionB: "Provisions for volume adjustments, price mechanisms, and alternative sourcing provide options during volatility", optionC: "Only long-term fixed contracts help", optionD: "Verbal agreements are more flexible", correct: "B" },
  { moduleNumber: 6, question: "What should a builder's rapid response team include?", optionA: "Only the CEO", optionB: "Representatives from purchasing, construction, finance, and sales with authority to make decisions", optionC: "Only the purchasing department", optionD: "External consultants only", correct: "B" },
  { moduleNumber: 6, question: "How should pricing decisions be made during supply disruptions?", optionA: "Wait until the disruption is over", optionB: "Decisively and early — delayed pricing decisions during rising markets compound losses", optionC: "Freeze all prices", optionD: "Pass all costs to subcontractors", correct: "B" },
  { moduleNumber: 6, question: "What lesson about just-in-time inventory did the 2020-2022 crisis teach?", optionA: "JIT is always the best strategy", optionB: "Pure JIT is vulnerable — some strategic inventory buffer for critical items is essential", optionC: "JIT should be abandoned completely", optionD: "JIT worked perfectly during the crisis", correct: "B" },
  { moduleNumber: 6, question: "What is the relationship between supply chain resilience and cost?", optionA: "Resilience always costs more", optionB: "Smart resilience complements efficiency — the cost of building in buffers is far less than the cost of disruption", optionC: "They are unrelated", optionD: "Resilience eliminates all costs", correct: "B" },
  { moduleNumber: 6, question: "How should builders communicate supply chain disruptions to homebuyers?", optionA: "Don't tell them anything", optionB: "Proactively, honestly, and with a plan — customers handle delays better when informed early", optionC: "Only when they complain", optionD: "Through lawyers only", correct: "B" },
  { moduleNumber: 6, question: "What is the most important action a builder can take BEFORE a disruption occurs?", optionA: "Nothing — disruptions can't be anticipated", optionB: "Develop relationships, diversify suppliers, build contingency plans, and invest in visibility systems", optionC: "Stockpile all materials", optionD: "Cancel all orders", correct: "B" },

  // Module 7: Continual Improvement and AI in Supply Chain Management (20 questions)
  { moduleNumber: 7, question: "What is the core principle of continuous improvement?", optionA: "Making big changes once per year", optionB: "Systematically identifying and eliminating waste through ongoing incremental improvements", optionC: "Hiring consultants to fix problems", optionD: "Replacing all processes with technology", correct: "B" },
  { moduleNumber: 7, question: "What is Kaizen methodology?", optionA: "A Japanese construction technique", optionB: "A philosophy of continuous, incremental improvement involving all employees", optionC: "A software platform", optionD: "A quality certification", correct: "B" },
  { moduleNumber: 7, question: "How can AI improve demand forecasting in construction supply chain?", optionA: "AI cannot help with forecasting", optionB: "By analyzing historical patterns, market data, and permit trends to predict material needs more accurately", optionC: "By replacing human judgment entirely", optionD: "Only for large national builders", correct: "B" },
  { moduleNumber: 7, question: "What is Six Sigma in the context of supply chain management?", optionA: "A type of construction tool", optionB: "A data-driven methodology for reducing defects and variability in processes", optionC: "A financial accounting method", optionD: "A building code standard", correct: "B" },
  { moduleNumber: 7, question: "What is the most realistic near-term AI application for construction procurement?", optionA: "Fully autonomous purchasing", optionB: "Spend analysis, price anomaly detection, and demand pattern recognition", optionC: "Replacing procurement staff", optionD: "Designing homes", correct: "B" },
  { moduleNumber: 7, question: "What is value stream mapping used for in continuous improvement?", optionA: "Mapping property values", optionB: "Visualizing the entire flow of materials and information to identify waste and improvement opportunities", optionC: "Mapping supplier locations", optionD: "Creating organizational charts", correct: "B" },
  { moduleNumber: 7, question: "What is the human role in an AI-augmented supply chain?", optionA: "Humans are no longer needed", optionB: "Humans provide judgment, relationships, and strategic thinking; AI handles data analysis and pattern recognition", optionC: "Humans only monitor the AI", optionD: "AI only handles accounting", correct: "B" },
  { moduleNumber: 7, question: "What does 'lean supply chain' mean?", optionA: "Using fewer suppliers", optionB: "Eliminating waste in every supply chain process while maintaining quality and responsiveness", optionC: "Reducing inventory to zero", optionD: "Cutting procurement staff", correct: "B" },
  { moduleNumber: 7, question: "What is the biggest barrier to AI adoption in construction?", optionA: "AI technology doesn't exist for construction", optionB: "Data quality, organizational readiness, and change management challenges", optionC: "Cost of AI software", optionD: "Government regulations", correct: "B" },
  { moduleNumber: 7, question: "What is a PDCA cycle in continuous improvement?", optionA: "A purchasing discount calculation", optionB: "Plan-Do-Check-Act: a systematic framework for testing and implementing improvements", optionC: "A delivery coordination process", optionD: "A project management certification", correct: "B" },
  { moduleNumber: 7, question: "How can AI help with dynamic pricing optimization?", optionA: "AI cannot help with pricing", optionB: "By analyzing market conditions, supplier patterns, and demand signals to recommend optimal purchase timing", optionC: "By automatically lowering all prices", optionD: "By eliminating the need for negotiation", correct: "B" },
  { moduleNumber: 7, question: "What does 'standard work' mean in continuous improvement?", optionA: "Doing the same thing every day", optionB: "Documenting the current best-known method for a process as the baseline for improvement", optionC: "Following building codes", optionD: "Using only standard materials", correct: "B" },
  { moduleNumber: 7, question: "What data is essential for AI-driven supply chain optimization?", optionA: "Only financial data", optionB: "Historical purchase data, pricing trends, delivery performance, quality records, and schedule data", optionC: "Only supplier data", optionD: "Only market reports", correct: "B" },
  { moduleNumber: 7, question: "What is the realistic timeline for meaningful AI adoption in homebuilder supply chains?", optionA: "Already fully adopted", optionB: "Early adopters now; widespread adoption in 3-5 years as data infrastructure improves", optionC: "10+ years away", optionD: "Never — AI won't work in construction", correct: "B" },
  { moduleNumber: 7, question: "How should continuous improvement results be measured?", optionA: "They cannot be measured", optionB: "Through specific metrics tied to the improvement: cost reduction, time savings, error reduction, waste reduction", optionC: "Only through employee surveys", optionD: "Only through customer satisfaction", correct: "B" },
  { moduleNumber: 7, question: "What is the role of leadership in continuous improvement?", optionA: "Leadership is not involved", optionB: "Setting the vision, providing resources, removing barriers, and modeling the improvement mindset", optionC: "Only approving budgets", optionD: "Only reviewing results", correct: "B" },
  { moduleNumber: 7, question: "What is 'predictive maintenance' as an AI application in logistics?", optionA: "Predicting when buildings need maintenance", optionB: "Using data to predict when delivery vehicles or equipment will need service, preventing breakdowns", optionC: "Predicting material quality issues", optionD: "Scheduling home warranty visits", correct: "B" },
  { moduleNumber: 7, question: "Why should builders start continuous improvement before adopting AI?", optionA: "AI is unnecessary", optionB: "CI creates the process discipline and data foundation that AI needs to be effective", optionC: "They should adopt AI first", optionD: "CI and AI are unrelated", correct: "B" },
  { moduleNumber: 7, question: "What is the most common mistake in continuous improvement programs?", optionA: "Starting too small", optionB: "Treating it as a one-time project rather than an ongoing operating discipline", optionC: "Involving too many people", optionD: "Improving too quickly", correct: "B" },
  { moduleNumber: 7, question: "What should a builder's first step be in building AI readiness?", optionA: "Buy AI software", optionB: "Ensure clean, structured data collection across procurement and supply chain processes", optionC: "Hire a data scientist", optionD: "Wait for the industry to adopt first", correct: "B" },

  // Module 8: What Japanese Homebuilders Do Differently (20 questions)
  { moduleNumber: 8, question: "What is a key differentiator of Japanese homebuilding compared to U.S. practices?", optionA: "They build fewer homes", optionB: "Heavy emphasis on factory prefabrication, standardization, and integrated supply chains", optionC: "They use completely different materials", optionD: "They don't use subcontractors", correct: "B" },
  { moduleNumber: 8, question: "What is a 'keiretsu' in Japanese business?", optionA: "A type of construction tool", optionB: "A network of interlocking business relationships where companies have long-term, mutual-benefit partnerships", optionC: "A government regulation", optionD: "A construction technique", correct: "B" },
  { moduleNumber: 8, question: "How do Japanese homebuilders approach quality management?", optionA: "Quality inspection at the end of construction", optionB: "Quality built in at every step — prevention rather than inspection", optionC: "Same as U.S. builders", optionD: "They rely on government inspections only", correct: "B" },
  { moduleNumber: 8, question: "What percentage of a Japanese home is typically built in a factory?", optionA: "Less than 10%", optionB: "Up to 80-85% of components are factory-manufactured", optionC: "About 50%", optionD: "100% — they are entirely factory-built", correct: "B" },
  { moduleNumber: 8, question: "How does factory prefabrication affect material waste?", optionA: "It increases waste", optionB: "It dramatically reduces waste through precision cutting, controlled conditions, and optimized material usage", optionC: "No effect on waste", optionD: "Waste is transferred from the site to the factory", correct: "B" },
  { moduleNumber: 8, question: "What is the typical construction timeline for a Japanese prefabricated home after site work begins?", optionA: "Same as U.S. — 4-6 months", optionB: "Significantly faster — often 45-90 days for assembly", optionC: "Longer due to quality requirements", optionD: "About 1 year", correct: "B" },
  { moduleNumber: 8, question: "How do Japanese builders manage their supplier relationships?", optionA: "Purely transactional, lowest-price bidding", optionB: "Deep, long-term partnerships with integrated planning and shared improvement goals", optionC: "They manufacture everything themselves", optionD: "Same as U.S. builders", correct: "B" },
  { moduleNumber: 8, question: "What concept from Toyota's production system is most applicable to construction supply chain?", optionA: "Mass production", optionB: "Just-in-time delivery combined with built-in quality (jidoka)", optionC: "Maximum inventory", optionD: "Worker specialization only", correct: "B" },
  { moduleNumber: 8, question: "What is a major barrier to adopting Japanese practices in the U.S.?", optionA: "Japanese practices don't work outside Japan", optionB: "Different industry structure, labor model, building codes, and cultural expectations around customization", optionC: "U.S. materials are incompatible", optionD: "Japanese practices are more expensive", correct: "B" },
  { moduleNumber: 8, question: "How do Japanese builders handle product customization?", optionA: "Every home is completely custom", optionB: "Mass customization — standardized components configured in different combinations", optionC: "No customization is offered", optionD: "Customization is done only after move-in", correct: "B" },
  { moduleNumber: 8, question: "What role does technology play in Japanese homebuilding supply chains?", optionA: "Less technology than U.S. builders", optionB: "Extensively integrated — from design through manufacturing, delivery, and installation", optionC: "Same level as U.S. builders", optionD: "Technology is only used in the factory", correct: "B" },
  { moduleNumber: 8, question: "Which Japanese homebuilder is most associated with applying automotive manufacturing principles?", optionA: "Mitsubishi Estate", optionB: "Toyota Housing (now Prime Life Technologies)", optionC: "Sony Homes", optionD: "Honda Housing", correct: "B" },
  { moduleNumber: 8, question: "What is 'monozukuri' in Japanese manufacturing philosophy?", optionA: "A construction technique", optionB: "The art and science of making things — a deep commitment to craftsmanship and continuous improvement", optionC: "A business negotiation style", optionD: "A type of supply chain software", correct: "B" },
  { moduleNumber: 8, question: "How do Japanese builders typically handle material procurement?", optionA: "Same as U.S. — through independent distributors", optionB: "Often through integrated supplier networks with long-term agreements and shared planning systems", optionC: "Exclusively from overseas", optionD: "Each home is procured independently", correct: "B" },
  { moduleNumber: 8, question: "What can U.S. builders realistically adopt from Japanese practices in the near term?", optionA: "Nothing — the markets are too different", optionB: "Standardization, waste reduction discipline, supplier partnership models, and quality-at-source thinking", optionC: "Full factory prefabrication", optionD: "The keiretsu supplier model", correct: "B" },
  { moduleNumber: 8, question: "How does standardization in Japanese homebuilding affect supply chain efficiency?", optionA: "Standardization reduces efficiency", optionB: "It enables precise material planning, reduced waste, simplified logistics, and better supplier alignment", optionC: "It has no effect on supply chain", optionD: "It only affects design, not supply chain", correct: "B" },
  { moduleNumber: 8, question: "What ethical considerations are relevant when studying global supply chain practices?", optionA: "Ethics don't apply to supply chain", optionB: "Labor practices, environmental impact, fair trade, and cultural respect in adapting practices across markets", optionC: "Only pricing ethics matter", optionD: "Ethics only apply to international trade", correct: "B" },
  { moduleNumber: 8, question: "What is the biggest lesson from Japanese homebuilding for U.S. supply chain professionals?", optionA: "Build everything in factories", optionB: "Integrated, long-term thinking about quality, waste, and partnerships delivers superior results", optionC: "Copy everything exactly", optionD: "Japanese methods are too expensive for the U.S.", correct: "B" },
  { moduleNumber: 8, question: "How does the Japanese approach to defect management differ from typical U.S. practice?", optionA: "They have more defects", optionB: "Defects are prevented through process design rather than caught through inspection after the fact", optionC: "There is no difference", optionD: "They inspect more frequently", correct: "B" },
  { moduleNumber: 8, question: "What is the most transformative idea from this module for a U.S. builder?", optionA: "Japanese homes are smaller", optionB: "The supply chain can be designed as an integrated system rather than managed as a collection of independent transactions", optionC: "Prefabrication is the only answer", optionD: "U.S. practices are already world-class", correct: "B" }
];

async function main() {
  console.log('🌱 Starting seed process...');

  try {
    // Check if data already exists
    const existingCompanyCount = await prisma.company.count();
    const existingUserCount = await prisma.user.count();
    const existingModuleCount = await prisma.module.count();

    if (existingCompanyCount > 0 || existingUserCount > 0 || existingModuleCount > 0) {
      console.log('📊 Database already contains data:');
      console.log(`   - Companies: ${existingCompanyCount}`);
      console.log(`   - Users: ${existingUserCount}`);
      console.log(`   - Modules: ${existingModuleCount}`);
      console.log('⏭️  Skipping seed process to prevent duplicates.');
      console.log('✅ Seed process completed (no changes made).');
      return;
    }

    // Create Public company
    console.log('📢 Creating Public company...');
    const publicCompany = await prisma.company.create({
      data: {
        companyName: 'Public',
        companyCode: 'PUBLIC',
        isPublic: true,
      },
    });

    // Create Super Admin user
    console.log('👨‍💼 Creating Super Admin user...');
    const hashedSuperAdminPassword = await bcrypt.hash('SupplyChain2026!', 10);

    const superAdmin = await prisma.user.create({
      data: {
        name: 'Drew Stevens',
        email: 'astevens@strategem.pro',
        password: hashedSuperAdminPassword,
        role: Role.SUPER_ADMIN,
        companyId: publicCompany.id,
      },
    });

    // Create default test student account
    console.log('🧪 Creating test student account...');
    const hashedTestPassword = await bcrypt.hash('teststudent123', 10);

    const testStudent = await prisma.user.create({
      data: {
        name: 'Test Student',
        email: 'test@strategem.pro',
        password: hashedTestPassword,
        role: Role.STUDENT,
        companyId: publicCompany.id,
      },
    });

    // Create modules
    console.log('📚 Creating modules...');
    const modules = [];

    for (const moduleInfo of moduleData) {
      const module = await prisma.module.create({
        data: {
          moduleNumber: moduleInfo.moduleNumber,
          title: moduleInfo.title,
          description: moduleInfo.description,
          content: moduleInfo.content,
          order: moduleInfo.order,
        },
      });
      modules.push(module);
      console.log(`   ✓ Created Module ${moduleInfo.moduleNumber}: ${moduleInfo.title}`);
    }

    // Create quiz questions
    console.log('❓ Creating quiz questions...');

    for (const question of quizQuestions) {
      const module = modules.find(m => m.moduleNumber === question.moduleNumber);
      if (module) {
        await prisma.quiz.create({
          data: {
            moduleId: module.id,
            questionText: question.question,
            optionA: question.optionA,
            optionB: question.optionB,
            optionC: question.optionC,
            optionD: question.optionD,
            correctAnswer: question.correct,
          },
        });
      }
    }

    console.log(`   ✓ Created ${quizQuestions.length} quiz questions across all modules`);

    // Create initial progress for test student (Module 1 unlocked)
    console.log('🎯 Setting up initial progress...');
    const firstModule = modules.find(m => m.moduleNumber === 1);
    if (firstModule) {
      await prisma.userProgress.create({
        data: {
          userId: testStudent.id,
          moduleId: firstModule.id,
          videoWatched: false,
          quizPassed: false,
          quizAttempts: 0,
        },
      });
    }

    console.log('✅ Seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   • 1 Public company created`);
    console.log(`   • 1 Super Admin user created (astevens@strategem.pro)`);
    console.log(`   • 1 Test student user created (test@strategem.pro)`);
    console.log(`   • ${modules.length} modules created`);
    console.log(`   • ${quizQuestions.length} quiz questions created`);
    console.log(`   • Initial progress setup complete`);

  } catch (error) {
    console.error('❌ Error during seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
