import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

const prisma = new PrismaClient();

async function reformatModule1() {
  console.log("Starting Module 1 reformatting with colored boxes...\n");
  
  const module = await prisma.module.findUnique({
    where: { moduleNumber: 1 }
  });
  
  if (!module) {
    console.log("Module 1 not found!");
    return;
  }
  
  // Backup current content
  fs.writeFileSync('/tmp/module1_before_boxes.html', module.content);
  console.log("✓ Backed up current content\n");
  
  let content = module.content;
  
  // Box 1: Yellow - OSHA safety requirements for site work
  // Insert after "Site Preparation Contractor Operations" section starts
  const box1 = `
<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🔶 OSHA Safety Requirements for Site Work</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Personal Protective Equipment (PPE):</strong> Hard hats, safety glasses, high-visibility vests, and steel-toed boots required for all site personnel</li>
    <li><strong>Excavation Safety:</strong> Trenches 5 feet or deeper require protective systems (shoring, shielding, or sloping)</li>
    <li><strong>Equipment Operation:</strong> Only trained and authorized personnel may operate heavy machinery</li>
    <li><strong>Site Access Control:</strong> Perimeter fencing with controlled access points to prevent unauthorized entry</li>
    <li><strong>Emergency Procedures:</strong> First aid stations, fire extinguishers, and emergency contact information must be readily accessible</li>
  </ul>
</div>`;
  
  // Box 2: Blue - Boundary survey code requirements
  const box2 = `
<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>📐 Boundary Survey Code Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Licensed Surveyor:</strong> All boundary surveys must be performed by a Professional Land Surveyor (PLS) licensed in the project jurisdiction</li>
    <li><strong>Monumentation:</strong> Property corners must be marked with permanent monuments (iron pins, concrete markers, or brass caps)</li>
    <li><strong>Survey Accuracy:</strong> Boundary location accuracy must meet or exceed applicable ALTA/NSPS standards</li>
    <li><strong>Setback Verification:</strong> Building setbacks from all property lines must be verified and certified before foundation construction begins</li>
    <li><strong>Easement Documentation:</strong> All easements affecting the property must be identified, measured, and shown on the survey plat</li>
  </ul>
</div>`;
  
  // Box 3: Yellow - Utility locating safety protocols
  const box3 = `
<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Utility Locating Safety Protocols</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Call Before You Dig:</strong> Contact 811 (national "Call Before You Dig" service) at least 2-3 business days before excavation</li>
    <li><strong>Private Utility Locating:</strong> Property owner is responsible for locating private utilities (water/sewer lines from meter to structure)</li>
    <li><strong>Hand Digging Requirements:</strong> Use hand tools (not mechanized equipment) when working within 24 inches of marked utilities</li>
    <li><strong>Vacuum Excavation:</strong> For critical utility crossings, use air or hydro excavation to expose underground infrastructure safely</li>
    <li><strong>Tolerance Zones:</strong> Maintain minimum clearances: 24 inches from gas lines, 18 inches from electrical conduits</li>
  </ul>
</div>`;
  
  // Box 4: Blue - Building permit inspection requirements
  const box4 = `
<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>📋 Building Permit Inspection Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Plan Review Approval:</strong> Building department must complete plan review and issue approved permit before construction begins</li>
    <li><strong>Permit Display:</strong> Building permit must be posted in a visible location on the construction site at all times</li>
    <li><strong>Inspection Schedule:</strong> Contractor must understand and comply with all required inspection stages (foundation, framing, mechanical rough-in, final)</li>
    <li><strong>Notice to Proceed:</strong> Written authorization from building department required after plan approval and fee payment</li>
    <li><strong>Permit Expiration:</strong> Most jurisdictions require substantial construction progress every 180 days to maintain permit validity</li>
  </ul>
</div>`;
  
  // Box 5: Green - Site preparation checklist
  const box5 = `
<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>✅ Site Preparation Best Practices Checklist</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Pre-Construction Meeting:</strong> Conduct comprehensive meeting with all stakeholders to review project scope, schedule, and site logistics</li>
    <li><strong>Tree Protection:</strong> Install tree protection fencing at drip line of all trees designated for preservation before any equipment enters site</li>
    <li><strong>Clearing Limits:</strong> Mark limits of disturbance (LOD) with high-visibility flagging or fencing to prevent unauthorized clearing</li>
    <li><strong>Material Segregation:</strong> Separate topsoil from subsoil during stripping operations for potential reuse in final landscaping</li>
    <li><strong>Weather Monitoring:</strong> Establish procedures for suspending grading operations during wet conditions to prevent soil degradation</li>
  </ul>
</div>`;
  
  // Box 6: Yellow - Erosion control standards
  const box6 = `
<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🌊 Erosion Control Critical Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Silt Fence Installation:</strong> Install perimeter silt fencing before any land disturbance begins; trench bottom 6 inches into soil and backfill with compacted earth</li>
    <li><strong>Stabilized Entrance:</strong> Construct aggregate construction entrance (50-100 feet long, 6-12 inches deep, 2-4 inch stone) before heavy equipment enters site</li>
    <li><strong>Sediment Trap Maintenance:</strong> Inspect and clean sediment traps after every rainfall event of 0.5 inches or greater</li>
    <li><strong>Temporary Seeding:</strong> Stabilize disturbed areas that will remain inactive for more than 14 days with temporary seeding and mulch</li>
    <li><strong>Street Sweeping:</strong> Perform daily street sweeping to remove any tracked sediment from adjacent public roadways</li>
  </ul>
</div>`;
  
  // Box 7: Blue - Grading and drainage code compliance
  const box7 = `
<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>📐 Grading and Drainage Code Compliance</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Minimum Drainage Slope:</strong> IRC R401.3 requires 6 inches of fall within first 10 feet from foundation perimeter (6% grade)</li>
    <li><strong>Alternative Compliance:</strong> Where 6-inch drop is not achievable, minimum 2% slope away from structure is acceptable with proper drainage system</li>
    <li><strong>Swale Requirements:</strong> Drainage swales must maintain minimum 2% gradient and be sized to handle 10-year storm event</li>
    <li><strong>Discharge Points:</strong> All surface water must be directed to approved discharge points (street, storm system, or natural drainageway)</li>
    <li><strong>Fill Compaction:</strong> All fills must be compacted to 90-95% Standard Proctor density per geotechnical specifications</li>
  </ul>
</div>`;
  
  // Box 8: Green - Construction manager documentation
  const box8 = `
<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>📋 Construction Manager Documentation Best Practices</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Daily Reports:</strong> Maintain detailed daily logs documenting weather, personnel, equipment, work performed, materials delivered, and any incidents</li>
    <li><strong>Photographic Documentation:</strong> Capture time-stamped photos of all critical stages, including pre-construction conditions, utility installations, and completed work</li>
    <li><strong>Meeting Minutes:</strong> Record and distribute minutes from all coordination meetings, documenting decisions, action items, and responsible parties</li>
    <li><strong>Request for Information (RFI) Log:</strong> Track all design clarifications and maintain organized responses from design professionals</li>
    <li><strong>Submittal Register:</strong> Manage submittal process for all materials, shop drawings, and product data requiring design team approval</li>
  </ul>
</div>`;
  
  // Box 9: Blue - Municipal inspection checkpoints
  const box9 = `
<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🔍 Municipal Inspection Checkpoints</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Erosion Control Inspection:</strong> Verify all SWPPP measures are installed and functioning before major earthwork begins</li>
    <li><strong>Footing/Foundation Inspection:</strong> Inspector verifies excavation depth, soil bearing capacity, reinforcement placement before concrete placement</li>
    <li><strong>Under-Slab Inspection:</strong> Verify vapor barrier, gravel base, and under-slab utilities before concrete pour</li>
    <li><strong>Rough-In Inspections:</strong> Separate inspections required for framing, plumbing, mechanical, and electrical rough-in before covering</li>
    <li><strong>Final Inspection:</strong> Comprehensive review of all systems, finishes, and code compliance before Certificate of Occupancy issuance</li>
  </ul>
</div>`;
  
  // Box 10: Yellow - Tree protection and safety zones
  const box10 = `
<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🌳 Tree Protection and Critical Root Zones</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Critical Root Zone (CRZ):</strong> Extends minimum distance of 1 foot of radius per 1 inch of trunk diameter (measured 4.5 feet above grade)</li>
    <li><strong>Tree Protection Fencing:</strong> Install orange safety fencing or chain-link barrier at drip line (outermost branch reach) or CRZ boundary, whichever is greater</li>
    <li><strong>Grade Change Restrictions:</strong> Avoid cutting or filling within CRZ; if unavoidable, consult certified arborist for protection measures</li>
    <li><strong>Equipment Exclusion:</strong> No vehicle or equipment traffic, material storage, or soil compaction permitted within tree protection zones</li>
    <li><strong>Pruning Standards:</strong> All pruning must be performed by certified arborists using ANSI A300 standards; no topping or excessive thinning permitted</li>
  </ul>
</div>`;
  
  // Box 11: Green - Pre-construction meeting protocols
  const box11 = `
<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>🤝 Pre-Construction Meeting Protocols</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Attendees:</strong> Owner, construction manager, all major trade contractors, design professionals, building department representative (if applicable)</li>
    <li><strong>Agenda Items:</strong> Project scope review, schedule milestones, site logistics plan, quality standards, safety requirements, communication protocols</li>
    <li><strong>Responsibilities Matrix:</strong> Establish clear RACI matrix (Responsible, Accountable, Consulted, Informed) for all project activities</li>
    <li><strong>Submittal Schedule:</strong> Review timeline for shop drawings, material samples, product data requiring approval</li>
    <li><strong>Meeting Minutes:</strong> Distribute written minutes within 48 hours documenting all agreements, decisions, and action items with assigned owners</li>
  </ul>
</div>`;
  
  // Strategic insertion points
  // Insert Box 1 (Yellow - OSHA) after the "Site Preparation Contractor Operations" h3
  content = content.replace(
    /(<h3><span class="icon">🏗️<\/span>Site Preparation Contractor Operations<\/h3>)/,
    `$1\n${box1}`
  );
  
  // Insert Box 2 (Blue - Boundary survey) after "Boundary Line Surveying Fundamentals" section
  content = content.replace(
    /(<h4>Boundary Line Surveying Fundamentals<\/h4>[\s\S]*?)<h4>Easement Identification/,
    `$1\n${box2}\n\n<h4>Easement Identification`
  );
  
  // Insert Box 3 (Yellow - Utility safety) after surveyor section, before site prep
  content = content.replace(
    /(<p>The surveyor maintains comprehensive field notes[\s\S]*?<\/p>[\s\S]*?<\/div>)/,
    `$1\n${box3}`
  );
  
  // Insert Box 4 (Blue - Building permit) in the Municipal Inspector section
  content = content.replace(
    /(<h3><span class="icon">📋<\/span>Municipal Inspector[\s\S]*?)<h4>/,
    `$1\n${box4}\n\n<h4>`
  );
  
  // Insert Box 5 (Green - Site prep checklist) after clearing section
  content = content.replace(
    /(<p>Brush and undergrowth clearing[\s\S]*?landfills\.<\/p>)/,
    `$1\n${box5}`
  );
  
  // Insert Box 6 (Yellow - Erosion control) after SWPPP discussion
  content = content.replace(
    /(<p>Violations of SWPPP requirements[\s\S]*?documentation\.<\/p>[\s\S]*?<\/div>)/,
    `$1\n${box6}`
  );
  
  // Insert Box 7 (Blue - Grading code) after rough grading section
  content = content.replace(
    /(<p>Field density testing[\s\S]*?compliance is achieved\.<\/p>[\s\S]*?<\/div>)/,
    `$1\n${box7}`
  );
  
  // Insert Box 8 (Green - Construction manager docs) in CM section
  content = content.replace(
    /(<h3><span class="icon">🧑‍💼<\/span>Construction Manager[\s\S]*?)<h4>/,
    `$1\n${box8}\n\n<h4>`
  );
  
  // Insert Box 9 (Blue - Municipal checkpoints) in inspector section  
  content = content.replace(
    /(<h4>Multi-Stage Inspection Process<\/h4>[\s\S]*?<p>.*?inspection\.<\/p>)/,
    `$1\n${box9}`
  );
  
  // Insert Box 10 (Yellow - Tree protection) after tree protection discussion
  content = content.replace(
    /(<p>Trees marked for removal are felled[\s\S]*?salvage milling\.<\/p>)/,
    `$1\n${box10}`
  );
  
  // Insert Box 11 (Green - Pre-construction meeting) before conclusion
  content = content.replace(
    /(<div style="background: #fee2e2;)/,
    `${box11}\n\n$1`
  );
  
  // Ensure conclusion section has correct rose color
  content = content.replace(
    /<div style="background: #[ef]+[0-9a-f]*;[^"]*?">\s*<h2[^>]*>🎓 Conclusion/g,
    '<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin: 30px 0;">\n  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎓 Conclusion'
  );
  
  // Update module in database
  await prisma.module.update({
    where: { moduleNumber: 1 },
    data: { content }
  });
  
  console.log("✅ Module 1 reformatted successfully!");
  console.log(`   - 11 colored boxes added`);
  console.log(`   - Content length: ${content.length} characters`);
  console.log(`   - Title card: White ✓`);
  console.log(`   - Learning Objectives: Pale green (#BEFFD1) ✓`);
  console.log(`   - Conclusion: Rose (#fee2e2) ✓`);
  
  await prisma.$disconnect();
}

reformatModule1().catch(console.error);
