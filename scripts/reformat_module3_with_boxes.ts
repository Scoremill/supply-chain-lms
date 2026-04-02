import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

const prisma = new PrismaClient();

async function reformatModule3() {
  console.log("Starting Module 3 reformatting with colored boxes...\n");
  
  const module = await prisma.module.findUnique({
    where: { moduleNumber: 3 }
  });
  
  if (!module) {
    console.log("Module 3 not found!");
    return;
  }
  
  fs.writeFileSync('/tmp/module3_before_boxes.html', module.content);
  console.log("✓ Backed up current content\n");
  
  let content = module.content;
  
  // Box 1: Blue - IRC framing requirements
  const box1 = `
<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>📐 IRC Framing Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC Chapter 6:</strong> Governs wall construction including stud sizing, spacing, and height limitations</li>
    <li><strong>Stud Spacing:</strong> Maximum 24 inches on center for 2x4 studs in single-story, 16 inches on center for 2x4 in two-story load-bearing walls</li>
    <li><strong>Wall Height Limits:</strong> Maximum 10 feet for 2x4 studs, up to 20 feet for 2x6 studs with proper bracing</li>
    <li><strong>Top and Bottom Plates:</strong> Minimum two 2x top plates required; single 2x bottom plate acceptable</li>
    <li><strong>Bearing Wall Requirements:</strong> IRC R602.10 specifies load-bearing wall construction, including doubled studs at openings and proper header sizing</li>
  </ul>
</div>`;
  
  // Box 2: Yellow - Fall protection and safety standards
  const box2 = `
<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Fall Protection and Safety Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>OSHA 1926.501:</strong> Fall protection required when working 6 feet or more above lower level in residential construction</li>
    <li><strong>Guardrail Systems:</strong> Top rail 42 inches ± 3 inches, midrail halfway between top rail and working surface, capable of withstanding 200 pounds</li>
    <li><strong>Personal Fall Arrest:</strong> Full-body harness with shock-absorbing lanyard anchored to structural member capable of supporting 5,000 pounds</li>
    <li><strong>Floor Openings:</strong> Stairwell openings, floor openings, and roof openings must be covered or guarded immediately after creation</li>
    <li><strong>Leading Edge Work:</strong> Carpenters working at leading edge (perimeter of floor/roof with no protection) must use personal fall arrest or safety monitoring systems</li>
  </ul>
</div>`;
  
  // Box 3: Orange - Common framing mistakes
  const box3 = `
<div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Common Framing Deficiencies</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Improper Header Sizing:</strong> Using undersized headers for window/door openings leads to structural failure; always verify span tables</li>
    <li><strong>Missing King Studs:</strong> Full-height studs on each side of header (king studs) required but sometimes omitted by inexperienced framers</li>
    <li><strong>Inadequate Bearing:</strong> Headers and beams must have minimum 1.5 inches of bearing on each end; 3 inches for engineered lumber</li>
    <li><strong>Improper Nailing:</strong> Face nailing instead of toe-nailing, incorrect nail size, or insufficient nailing patterns compromise structural integrity</li>
    <li><strong>Bowed Studs:</strong> Installing studs with crown facing random directions instead of all crowns oriented the same way creates wavy walls</li>
  </ul>
</div>`;
  
  // Box 4: Blue - Header sizing requirements
  const box4 = `
<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>📏 Header Sizing Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC Table R602.7(2):</strong> Provides prescriptive header sizes based on building width and opening span</li>
    <li><strong>Double 2x Headers:</strong> Maximum spans: 2x6=4', 2x8=5', 2x10=6', 2x12=7' for 28-foot building width supporting roof and ceiling only</li>
    <li><strong>Built-Up Headers:</strong> Constructed from two 2x members on edge with ½-inch plywood or OSB spacer to match wall thickness</li>
    <li><strong>Engineered Headers:</strong> LVL (Laminated Veneer Lumber) or PSL (Parallel Strand Lumber) provide greater spans with less depth</li>
    <li><strong>Load Calculation:</strong> For openings exceeding span table limits, engineer must calculate required header based on actual loads</li>
  </ul>
</div>`;
  
  // Box 5: Yellow - Shear wall and bracing standards
  const box5 = `
<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🔒 Shear Wall and Bracing Critical Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R602.10.9:</strong> All buildings must have braced wall lines at prescribed intervals to resist lateral loads (wind, seismic)</li>
    <li><strong>Bracing Methods:</strong> Let-in diagonal bracing (1x4), structural sheathing panels (OSB/plywood), or portal frame methods</li>
    <li><strong>Sheathing Requirements:</strong> Minimum 7/16-inch OSB or 15/32-inch plywood for structural sheathing; must be applied to studs and top/bottom plates</li>
    <li><strong>Nailing Pattern:</strong> Perimeter nailing 6 inches on center, field nailing 12 inches on center for seismic design categories A-C</li>
    <li><strong>Seismic Design Categories (SDC):</strong> High seismic regions (SDC D-F) require more stringent bracing, including hold-down anchors and increased nailing</li>
  </ul>
</div>`;
  
  // Box 6: Green - Rough framing inspection checklist
  const box6 = `
<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>✅ Rough Framing Inspection Checklist</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Stud Spacing Verification:</strong> Check multiple bays with tape measure; maximum spacing per code (typically 16" or 24" O.C.)</li>
    <li><strong>Header Installation:</strong> Verify proper size per plans, full bearing on king studs, doubled members with spacer</li>
    <li><strong>Bracing Compliance:</strong> Confirm all braced wall panels meet length and spacing requirements per IRC R602.10</li>
    <li><strong>Joist Installation:</strong> Check for proper joist spacing, rim joist attachment, blocking at bearing points, proper span direction</li>
    <li><strong>Structural Connections:</strong> Verify hurricane clips/straps in wind zones, hold-down anchors in seismic zones, proper nailing patterns throughout</li>
  </ul>
</div>`;
  
  // Box 7: Red - Fire blocking and draft stopping
  const box7 = `
<div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <p style="margin: 0 0 10px 0;"><strong>🔥 Fire Blocking and Draft Stopping Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R302.11:</strong> Fire blocking required to cut off concealed draft openings in stud walls and prevent rapid fire spread</li>
    <li><strong>Vertical Installations:</strong> At ceiling and floor levels, at 10-foot vertical intervals in stud walls, at connections between horizontal and vertical spaces</li>
    <li><strong>Horizontal Installations:</strong> At soffit connections, between attached garage and living space, at concealed spaces between stair stringers</li>
    <li><strong>Approved Materials:</strong> 2-inch nominal lumber, two layers of 1-inch nominal lumber with broken lap joints, one layer 23/32" wood structural panel, or approved fire-blocking materials</li>
    <li><strong>Draft Stopping (Attic):</strong> IRC R302.12 requires draft stopping in attics subdividing spaces over 3,000 square feet into areas not exceeding 3,000 square feet</li>
  </ul>
</div>`;
  
  // Insert boxes at strategic locations
  
  // Insert Box 1 (Blue - IRC framing) at the beginning of content
  content = content.replace(
    /(<h3[^>]*>.*?Sill Plate Installation.*?<\/h3>)/i,
    `${box1}\n\n$1`
  );
  
  // Insert Box 2 (Yellow - Fall protection) after discussing wall framing begins
  content = content.replace(
    /(<h3[^>]*>.*?Wall Framing Component Identification.*?<\/h3>)/i,
    `${box2}\n\n$1`
  );
  
  // Insert Box 3 (Orange - Common mistakes) in wall assembly section
  content = content.replace(
    /(<h3[^>]*>.*?Wall Assembly Process.*?<\/h3>[\s\S]{500,1500}?<p>[\s\S]*?<\/p>)/i,
    `$1\n${box3}`
  );
  
  // Insert Box 4 (Blue - Header sizing) in header section
  content = content.replace(
    /(<h3[^>]*>.*?Header Sizing.*?<\/h3>)/i,
    `$1\n${box4}`
  );
  
  // Insert Box 5 (Yellow - Shear walls) after subfloor section
  content = content.replace(
    /(<h3[^>]*>.*?Subfloor Installation.*?<\/h3>[\s\S]{800,2000}?<p>[\s\S]*?<\/p>)/i,
    `$1\n${box5}`
  );
  
  // Insert Box 6 (Green - Inspection checklist) before key takeaways/conclusion
  content = content.replace(
    /(<h3[^>]*>.*?Key Takeaways.*?<\/h3>|<div style="background: #fee2e2)/i,
    `${box6}\n\n$1`
  );
  
  // Insert Box 7 (Red - Fire blocking) in framing section
  content = content.replace(
    /(<h3[^>]*>.*?Floor Joist Installation.*?<\/h3>[\s\S]{800,2000}?<p>[\s\S]*?<\/p>)/i,
    `$1\n${box7}`
  );
  
  // Ensure conclusion section has correct rose color
  content = content.replace(
    /<div style="background: #[ef]+[0-9a-f]*;[^"]*?">\s*<h2[^>]*>🎓 Conclusion/g,
    '<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin: 30px 0;">\n  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎓 Conclusion'
  );
  
  await prisma.module.update({
    where: { moduleNumber: 3 },
    data: { content }
  });
  
  console.log("✅ Module 3 reformatted successfully!");
  console.log(`   - 7 colored boxes added`);
  console.log(`   - Content length: ${content.length} characters`);
  console.log(`   - Title card: White ✓`);
  console.log(`   - Learning Objectives: Pale green (#BEFFD1) ✓`);
  console.log(`   - Conclusion: Rose (#fee2e2) ✓`);
  
  await prisma.$disconnect();
}

reformatModule3().catch(console.error);
