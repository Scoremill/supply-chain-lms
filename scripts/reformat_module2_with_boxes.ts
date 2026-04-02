import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

const prisma = new PrismaClient();

async function reformatModule2() {
  console.log("Starting Module 2 reformatting with colored boxes...\n");
  
  const module = await prisma.module.findUnique({
    where: { moduleNumber: 2 }
  });
  
  if (!module) {
    console.log("Module 2 not found!");
    return;
  }
  
  fs.writeFileSync('/tmp/module2_before_boxes.html', module.content);
  console.log("✓ Backed up current content\n");
  
  let content = module.content;
  
  // Box 1: Blue - Foundation depth code requirements (frost line)
  const box1 = `
<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>❄️ Foundation Depth Code Requirements (Frost Line)</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R403.1.4:</strong> Footings must extend below frost depth or be protected from frost by insulation or other approved means</li>
    <li><strong>Regional Frost Depths:</strong> Vary from 12 inches in southern states to 60+ inches in northern climates; verify local building department requirements</li>
    <li><strong>Unheated Structures:</strong> Garages, porches, and decks require deeper footings than heated structures due to increased frost penetration</li>
    <li><strong>Frost-Protected Shallow Foundations (FPSF):</strong> Alternative method using insulation to reduce required footing depth per IRC R403.3</li>
    <li><strong>Verification:</strong> Building inspector will verify footing depth before allowing concrete placement</li>
  </ul>
</div>`;
  
  // Box 2: Orange - Common excavation deficiencies
  const box2 = `
<div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Common Excavation Deficiencies</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Over-Excavation:</strong> Digging below design grade requires backfill with engineered fill or lean concrete; never use loose soil</li>
    <li><strong>Soft Bottom Conditions:</strong> Failing to identify and remediate soft, wet, or organic soils before pouring footings leads to settlement</li>
    <li><strong>Standing Water:</strong> Water accumulation in excavation must be removed before inspection and concrete placement; use sump pumps or drainage trenches</li>
    <li><strong>Cave-Ins:</strong> Inadequate sloping or shoring of trench walls creates life-safety hazards and may disturb bearing soil</li>
    <li><strong>Dimension Errors:</strong> Foundation not square or dimensions don't match plans; verify diagonals are equal before proceeding</li>
  </ul>
</div>`;
  
  // Box 3: Yellow - Safety requirements for trenching/excavation
  const box3 = `
<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ OSHA Excavation Safety Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>OSHA 1926 Subpart P:</strong> Governs all excavation and trenching operations on construction sites</li>
    <li><strong>Protective Systems Required:</strong> Trenches 5 feet or deeper must have shoring, shielding (trench box), or sloping to prevent cave-ins</li>
    <li><strong>Competent Person:</strong> OSHA requires a competent person to inspect excavations daily and after rain or other hazard-increasing events</li>
    <li><strong>Access Requirements:</strong> Ladder, ramp, or steps required within 25 feet of any worker in trench 4 feet or deeper</li>
    <li><strong>Spoil Pile Setback:</strong> Excavated material must be placed minimum 2 feet from trench edge to prevent loading and collapse</li>
    <li><strong>Atmospheric Testing:</strong> Test for oxygen deficiency and toxic gases in excavations deeper than 4 feet</li>
  </ul>
</div>`;
  
  // Box 4: Blue - Concrete mix design specifications
  const box4 = `
<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🏗️ Concrete Mix Design Specifications</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Minimum Compressive Strength:</strong> IRC R402.2 requires 2,500 psi for footings, 3,000 psi for foundation walls and slabs</li>
    <li><strong>Water-Cement Ratio:</strong> Maximum 0.50 for moderate sulfate exposure, 0.45 for severe sulfate soils</li>
    <li><strong>Slump Specification:</strong> Typically 4-6 inches for foundation work; excessive slump (over 7 inches) reduces strength</li>
    <li><strong>Air Entrainment:</strong> Required 5-7% air content for freeze-thaw durability in cold climates per ASTM C260</li>
    <li><strong>Admixtures:</strong> Use only approved admixtures (water reducers, accelerators, retarders); no calcium chloride in reinforced concrete</li>
  </ul>
</div>`;
  
  // Box 5: Green - Foundation inspection checklist
  const box5 = `
<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>📋 Foundation Inspection Checklist</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Footing Inspection Items:</strong> Verify depth below frost line, width and thickness per plan, excavation bottom is firm and level, reinforcement placement and cover</li>
    <li><strong>Foundation Wall Inspection:</strong> Check wall thickness, reinforcement size and spacing, anchor bolt placement (max 6 feet on center), top of wall elevation</li>
    <li><strong>Waterproofing Verification:</strong> Dampproofing or waterproofing applied per code, drain tile installed and connected to daylight or sump</li>
    <li><strong>Under-Slab Items:</strong> Vapor barrier minimum 6-mil polyethylene, 4-inch minimum gravel base, all plumbing/electrical sleeves in place</li>
    <li><strong>Required Documents:</strong> Concrete delivery tickets showing mix design, inspection report signed by building inspector</li>
  </ul>
</div>`;
  
  // Box 6: Blue - Reinforcement placement standards
  const box6 = `
<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🔩 Reinforcement Placement Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Footing Reinforcement:</strong> IRC R403.1.3 requires two continuous #4 bars in footings supporting concrete foundation walls</li>
    <li><strong>Concrete Cover:</strong> Minimum 3 inches for reinforcement cast against earth, 1.5 inches for formed surfaces</li>
    <li><strong>Bar Supports:</strong> Use plastic chairs or steel bar supports to maintain proper spacing from bottom of footing; never place bars directly on soil</li>
    <li><strong>Splice Requirements:</strong> Lap splices minimum 40 bar diameters for #6 bars and smaller; stagger splices to avoid weak planes</li>
    <li><strong>Wall Reinforcement:</strong> Vertical bars minimum #4 at 48 inches on center; horizontal bars at top and bottom of wall openings</li>
  </ul>
</div>`;
  
  // Box 7: Yellow - Waterproofing system requirements
  const box7 = `
<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>💧 Critical Waterproofing System Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R406.1:</strong> Foundation walls enclosing habitable or usable spaces below grade must be waterproofed from footing to grade</li>
    <li><strong>Dampproofing vs. Waterproofing:</strong> Dampproofing (asphalt coating) sufficient for well-drained sites; waterproofing (membrane system) required for high water tables</li>
    <li><strong>Drainage System:</strong> Perforated drain tile (minimum 4-inch diameter) required around perimeter, placed on 2-inch gravel bed with open joints facing downward</li>
    <li><strong>Discharge Requirements:</strong> Footing drains must discharge to daylight, storm sewer, or approved sump pump system; never connect to sanitary sewer</li>
    <li><strong>Filter Fabric:</strong> Wrap drain tile with geotextile filter fabric to prevent silt intrusion and maintain long-term drainage capacity</li>
  </ul>
</div>`;
  
  // Box 8: Green - Under-slab plumbing verification
  const box8 = `
<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>🔧 Under-Slab Plumbing Verification Protocols</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Rough-In Inspection Required:</strong> Building inspector must approve all under-slab plumbing before concrete placement; cannot be corrected after pour</li>
    <li><strong>Pressure Testing:</strong> All water supply lines must be pressure tested to 150 psi for minimum 15 minutes with no pressure loss</li>
    <li><strong>DWV Testing:</strong> Drain, waste, and vent piping tested with air (5 psi for 15 minutes) or water (10-foot head for 15 minutes)</li>
    <li><strong>Pipe Protection:</strong> Verify all pipes have proper bedding (sand or gravel) and are not in contact with sharp stones</li>
    <li><strong>Stub-Out Locations:</strong> Double-check all fixture rough-in dimensions match plumbing plans; measure from reference walls</li>
  </ul>
</div>`;
  
  // Box 9: Blue - Foundation wall code compliance
  const box9 = `
<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>📐 Foundation Wall Code Compliance</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R404.1:</strong> Concrete foundation walls must be minimum 6 inches thick for single-story buildings, 8 inches for two-story</li>
    <li><strong>Wall Height Limitations:</strong> Maximum 8-foot unsupported wall height for 8-inch concrete walls; taller walls require engineering design</li>
    <li><strong>Lateral Support:</strong> Foundation walls must have lateral support at top (floor system) or be designed as cantilever retaining walls</li>
    <li><strong>Anchor Bolts:</strong> Minimum ½-inch diameter, embedded 7 inches into concrete, maximum 6 feet on center, maximum 12 inches from plate ends</li>
    <li><strong>Pier and Beam:</strong> Alternative foundation system using concrete piers and wooden beams; must meet IRC R403.1 and R404.5 requirements</li>
  </ul>
</div>`;
  
  // Insert colored boxes at strategic locations
  
  // Insert Box 1 (Blue - Frost depth) after footing discussion starts
  content = content.replace(
    /(<h3[^>]*>.*?Footing Construction.*?<\/h3>)/i,
    `$1\n${box1}`
  );
  
  // Insert Box 2 (Orange - Deficiencies) after excavation section
  content = content.replace(
    /(<h3[^>]*>.*?Hole Excavation.*?<\/h3>[\s\S]{500,1500}?<p>[\s\S]*?excavation[\s\S]*?<\/p>)/i,
    `$1\n${box2}`
  );
  
  // Insert Box 3 (Yellow - OSHA trenching) after utility trenching discussion
  content = content.replace(
    /(<h3[^>]*>.*?Utility Trenching.*?<\/h3>[\s\S]{300,1000}?<p>[\s\S]*?<\/p>)/i,
    `$1\n${box3}`
  );
  
  // Insert Box 4 (Blue - Concrete mix) in the concrete trade section
  content = content.replace(
    /(<h3[^>]*>.*?Overview of the Concrete Trade.*?<\/h3>)/i,
    `$1\n${box4}`
  );
  
  // Insert Box 5 (Green - Inspection checklist) before Foundation Wall Construction
  content = content.replace(
    /(<h3[^>]*>.*?Foundation Wall Construction.*?<\/h3>)/i,
    `${box5}\n\n$1`
  );
  
  // Insert Box 6 (Blue - Reinforcement) in footing construction section
  content = content.replace(
    /(<h3[^>]*>.*?Footing Construction.*?<\/h3>[\s\S]{800,2000}?<p>[\s\S]*?reinforcement[\s\S]*?<\/p>)/i,
    `$1\n${box6}`
  );
  
  // Insert Box 7 (Yellow - Waterproofing) in waterproofing section
  content = content.replace(
    /(<h3[^>]*>.*?Waterproofing and Drainage Systems.*?<\/h3>)/i,
    `$1\n${box7}`
  );
  
  // Insert Box 8 (Green - Under-slab plumbing) before slab section
  content = content.replace(
    /(<h3[^>]*>.*?Slab Pouring.*?<\/h3>)/i,
    `${box8}\n\n$1`
  );
  
  // Insert Box 9 (Blue - Foundation wall code) in foundation wall section
  content = content.replace(
    /(<h3[^>]*>.*?Foundation Wall Construction.*?<\/h3>[\s\S]{500,1500}?<p>[\s\S]*?<\/p>)/i,
    `$1\n${box9}`
  );
  
  // Ensure conclusion section has correct rose color
  content = content.replace(
    /<div style="background: #[ef]+[0-9a-f]*;[^"]*?">\s*<h2[^>]*>🎓 Conclusion/g,
    '<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin: 30px 0;">\n  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎓 Conclusion'
  );
  
  await prisma.module.update({
    where: { moduleNumber: 2 },
    data: { content }
  });
  
  console.log("✅ Module 2 reformatted successfully!");
  console.log(`   - 9 colored boxes added`);
  console.log(`   - Content length: ${content.length} characters`);
  console.log(`   - Title card: White ✓`);
  console.log(`   - Learning Objectives: Pale green (#BEFFD1) ✓`);
  console.log(`   - Conclusion: Rose (#fee2e2) ✓`);
  
  await prisma.$disconnect();
}

reformatModule2().catch(console.error);
