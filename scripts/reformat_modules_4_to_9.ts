import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

const prisma = new PrismaClient();

// Module 4 boxes (9 total)
const module4Boxes = {
  box1: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Roof Safety Equipment Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>OSHA 1926.501(b)(13):</strong> Fall protection required on residential roofs with slopes greater than 4:12 when working 6 feet or more above lower level</li>
    <li><strong>Roof Bracket Systems:</strong> Install at 8-foot vertical intervals maximum, capable of supporting 500 pounds perpendicular load</li>
    <li><strong>Personal Fall Arrest:</strong> Full-body harness with 6-foot shock-absorbing lanyard attached to proper anchor point</li>
    <li><strong>Ladder Safety:</strong> Extend minimum 3 feet above eave line, secure at top and bottom, maintain 3-point contact while climbing</li>
    <li><strong>Weather Restrictions:</strong> Suspend roofing operations during high winds (over 40 mph), rain, snow, or ice conditions</li>
  </ul>
</div>`,
  
  box2: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>📐 Shingle Installation Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R905.2.7:</strong> Asphalt shingles must be applied per manufacturer specifications and in accordance with code requirements</li>
    <li><strong>Exposure Distance:</strong> Standard 3-tab shingles: 5 inches; architectural shingles: verify manufacturer specs (typically 5-5.625 inches)</li>
    <li><strong>Nailing Pattern:</strong> Four nails per shingle for slopes 4:12 to 20:12, six nails for slopes over 20:12</li>
    <li><strong>Nail Placement:</strong> Located 5/8-inch above slots for 3-tab, per manufacturer for architectural; proper depth critical for wind resistance</li>
    <li><strong>Wind Rating:</strong> Minimum Class D wind resistance (90 mph) required; Class F (110 mph) or Class H (150 mph) for high-wind zones</li>
  </ul>
</div>`,
  
  box3: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>💧 Weather Barrier Installation Critical Points</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R703.2:</strong> Weather-resistant barrier required over exterior sheathing on all walls</li>
    <li><strong>Proper Sequencing:</strong> Apply from bottom to top with minimum 2-inch horizontal overlaps, 6-inch vertical overlaps</li>
    <li><strong>Window Integration:</strong> Integrate flashing with WRB in proper shingling sequence (bottom, sides, top) to direct water outward</li>
    <li><strong>Material Standards:</strong> Minimum Grade D building paper or equivalent housewrap meeting ASTM D226 or ASTM E2556</li>
    <li><strong>Air Sealing:</strong> While WRB provides bulk water protection, separate air barrier system or taped housewrap seams required for energy code compliance</li>
  </ul>
</div>`,
  
  box4: `<div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Common Flashing Mistakes</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Improper Step Flashing:</strong> Installing continuous flashing instead of individual step flashing pieces at roof-wall intersections causes leaks</li>
    <li><strong>Missing Kickout Flashing:</strong> Critical where roof edge meets sidewall; directs water away from wall and into gutter</li>
    <li><strong>Reverse Lapping:</strong> Installing flashing pieces in wrong sequence; each piece must lap over the one below like shingles</li>
    <li><strong>Insufficient Embedment:</strong> Wall flashing leg must extend minimum 4 inches up wall surface and be integrated with WRB</li>
    <li><strong>Chimney Counter-Flashing:</strong> Must be embedded in mortar joints, not surface-mounted with caulk, and lap over base flashing minimum 3 inches</li>
  </ul>
</div>`,
  
  box5: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🌀 Ventilation Code Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R806.2:</strong> Minimum 1:150 ratio of net free ventilation area to ceiling area (1:300 with proper balance of intake/exhaust)</li>
    <li><strong>Balanced Ventilation:</strong> Intake vents (soffit) should equal or exceed exhaust vents (ridge, gable, or roof vents)</li>
    <li><strong>Ventilation Baffles:</strong> Required at every rafter bay to maintain minimum 2-inch air channel between insulation and roof deck</li>
    <li><strong>Ridge Vent Requirements:</strong> Must be installed with proper external baffles to prevent weather infiltration while allowing airflow</li>
    <li><strong>Powered Ventilation:</strong> Power attic ventilators may create negative pressure, potentially pulling conditioned air from living space through ceiling penetrations</li>
  </ul>
</div>`,
  
  box6: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🏗️ Building Science Moisture Management</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Bulk Water Control:</strong> Primary defense using proper flashing, WRB, and drainage plane to shed water away from building</li>
    <li><strong>Capillary Action:</strong> Prevent wicking of water through porous materials using capillary breaks (gaps, coatings, membranes)</li>
    <li><strong>Air-Transported Moisture:</strong> Control through continuous air barrier and proper air sealing at all penetrations and transitions</li>
    <li><strong>Vapor Diffusion:</strong> Manage with vapor retarders placed on warm side of insulation in heating climates; avoid vapor barriers on both sides</li>
    <li><strong>Drying Potential:</strong> Wall assemblies must be able to dry to at least one side; avoid impermeable materials on both interior and exterior</li>
  </ul>
</div>`,
  
  box7: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>✅ Exterior Envelope Inspection Checklist</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Roof Covering:</strong> Verify proper shingle installation, flashing at all penetrations and valleys, drip edge at eaves and rakes</li>
    <li><strong>Weather Barrier:</strong> Confirm continuous WRB with proper overlaps, integration with window/door flashing systems</li>
    <li><strong>Cladding Installation:</strong> Check proper fastening, correct exposure and overlap, proper clearances from grade and horizontal surfaces</li>
    <li><strong>Window Installation:</strong> Verify proper flashing integration, sill pan installation, air sealing at rough opening perimeter</li>
    <li><strong>Penetrations:</strong> All roof and wall penetrations (vents, pipes, lights) must have proper flashing and air sealing</li>
  </ul>
</div>`,
  
  box8: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🏠 Cladding Installation Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Vinyl Siding:</strong> ASTM D3679; install with 1/32" gaps at joints for thermal expansion; nail in center of slots, not tight to allow movement</li>
    <li><strong>Fiber Cement:</strong> Follow manufacturer specifications for fastening (typically 1-1/4" from edges, 12" O.C.); requires proper clearances from grade and roofs</li>
    <li><strong>Wood Siding:</strong> Minimum 6-inch clearance from grade, 2-inch clearance from roof surfaces; back-prime all pieces before installation</li>
    <li><strong>Brick Veneer:</strong> IRC R703.7 requires 1-inch air space, wall ties every 2.67 square feet, weep holes every 33 inches at bottom course</li>
    <li><strong>Stucco (EIFS):</strong> Three-coat system over proper substrate with control joints every 144 square feet; proper drainage plane critical</li>
  </ul>
</div>`,
  
  box9: `<div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Air Sealing Critical Deficiencies</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Penetrations Unsealed:</strong> Plumbing, electrical, and HVAC penetrations through top plates, rim joists, and exterior walls allow significant air leakage</li>
    <li><strong>Band Joist Gap:</strong> Junction between foundation and first floor framing; requires spray foam, rigid foam, or sealed batt insulation</li>
    <li><strong>Window/Door Rough Openings:</strong> Gaps between framing and window/door units must be sealed with low-expansion foam or non-expanding sealant</li>
    <li><strong>Attic Access:</strong> Scuttle holes and pull-down stairs require weather-stripping and insulated covers with minimum R-10</li>
    <li><strong>Recessed Lights:</strong> Use only IC-rated (insulation contact) and airtight (AT) rated fixtures; seal to ceiling with gasket or caulk</li>
  </ul>
</div>`
};

// Module 5 boxes (12 total)
const module5Boxes = {
  box1: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>⚡ NEC Electrical Code Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Service Size:</strong> NEC 220.82 requires minimum 100-amp service for single-family dwellings; 200-amp increasingly standard</li>
    <li><strong>Circuit Breaker Panel:</strong> Minimum 30 spaces/30 circuits; locate in accessible location with 30-inch working clearance</li>
    <li><strong>GFCI Protection:</strong> Required in bathrooms, kitchens (within 6 ft of sink), garages, basements, outdoors, and crawl spaces</li>
    <li><strong>AFCI Protection:</strong> NEC 210.12 requires AFCI protection for most habitable room circuits including bedrooms, living rooms, dining rooms</li>
    <li><strong>Dedicated Circuits:</strong> Required for kitchen appliances (dishwasher, disposal), laundry, bathroom receptacles, furnace/AC</li>
  </ul>
</div>`,
  
  box2: `<div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Combustion Air Requirements - Critical Safety</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC M1703:</strong> Fuel-burning appliances require adequate combustion air to prevent CO production from incomplete combustion</li>
    <li><strong>Standard Method:</strong> 50 cubic feet per 1,000 BTU/hour of total appliance input from outdoor sources or ventilated spaces</li>
    <li><strong>Indoor Combustion Air:</strong> If using indoor air, space must have 50 cubic feet per 1,000 BTU (tight construction requires outdoor air)</li>
    <li><strong>Sealed Combustion:</strong> Direct-vent appliances with sealed combustion chambers draw air from outdoors through dedicated pipe; superior safety</li>
    <li><strong>High-Efficiency Equipment:</strong> 90%+ AFUE furnaces have sealed combustion; older equipment may rely on dilution air from living space</li>
  </ul>
</div>`,
  
  box3: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🔌 GFCI/AFCI Protection Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>GFCI Function:</strong> Detects ground faults (current leakage) and trips circuit in 4-6 milliseconds, preventing electrocution</li>
    <li><strong>AFCI Function:</strong> Detects arc faults (damaged wiring, loose connections) that can cause electrical fires</li>
    <li><strong>Combination AFCI/GFCI:</strong> Newer breakers provide both protections in single device; required in many locations per NEC 2020</li>
    <li><strong>Testing Requirements:</strong> Test GFCI monthly using test button; replace if fails to trip or doesn't reset</li>
    <li><strong>Nuisance Tripping:</strong> Frequent tripping indicates actual fault condition (moisture, damaged wiring); never disable protective device</li>
  </ul>
</div>`,
  
  box4: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🚰 Plumbing Vent Sizing Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC P3113:</strong> Every trap must be protected by a vent; prevents siphoning of trap seals which allows sewer gas entry</li>
    <li><strong>Vent Sizing:</strong> Minimum 1.25-inch for single fixture; 1.5-inch typical; 2-inch for water closets; size increases with fixture units and developed length</li>
    <li><strong>Vent Termination:</strong> Must extend through roof minimum 12 inches in most climates; 3-10 feet from vertical surface</li>
    <li><strong>Common Venting:</strong> Two fixtures on opposite sides of wall can share vent if within distance limits (varies by fixture type)</li>
    <li><strong>Air Admittance Valves (AAVs):</strong> Mechanical vents allowed in some jurisdictions as alternative to conventional venting where roof penetration impractical</li>
  </ul>
</div>`,
  
  box5: `<div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <p style="margin: 0 0 10px 0;"><strong>🔥 Gas Piping Safety Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC G2415:</strong> Gas piping must be installed by qualified personnel using approved materials (black iron, CSST, or copper where allowed)</li>
    <li><strong>CSST Protection:</strong> Corrugated Stainless Steel Tubing requires bonding to electrical grounding system per manufacturer instructions</li>
    <li><strong>Pipe Sizing:</strong> Calculate based on gas demand, pipe length, and pressure drop; undersized piping causes appliance malfunction</li>
    <li><strong>Leak Testing:</strong> All gas piping must be pressure tested to 15 psi for 15 minutes minimum before covering or energizing</li>
    <li><strong>Sediment Trap:</strong> Drip leg required immediately upstream of each gas appliance to collect debris and moisture</li>
  </ul>
</div>`,
  
  box6: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>❄️ HVAC Load Calculation Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Manual J Calculation:</strong> ACCA (Air Conditioning Contractors of America) standard for heating/cooling load calculations; required by energy code</li>
    <li><strong>Factors Considered:</strong> Building envelope characteristics, window area/orientation, insulation levels, infiltration rate, local climate data</li>
    <li><strong>Equipment Sizing:</strong> Must be within 15% of calculated load; oversized equipment causes short cycling, poor humidity control, increased energy use</li>
    <li><strong>Duct Design:</strong> Manual D calculation required for proper duct sizing; ensures adequate airflow to each room</li>
    <li><strong>Room-by-Room:</strong> Detailed calculation for each room determines individual heating/cooling needs and required supply airflow</li>
  </ul>
</div>`,
  
  box7: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>⚡ Arc-Fault Protection Critical Areas</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Series Arc Faults:</strong> Most dangerous; occur in single conductor due to damaged insulation or loose connection</li>
    <li><strong>Parallel Arc Faults:</strong> Occur between conductors; easier to detect than series arcs</li>
    <li><strong>Branch/Feeder AFCI:</strong> Protects entire circuit from panel to all devices and outlets on that circuit</li>
    <li><strong>Combination AFCI:</strong> Detects both series and parallel arcs; required by NEC 2020 for most habitable space circuits</li>
    <li><strong>Exemptions:</strong> Bathroom, garage, and outdoor circuits typically protected by GFCI only; check local code amendments</li>
  </ul>
</div>`,
  
  box8: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>📋 MEP Coordination Best Practices</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Pre-Rough Meeting:</strong> Coordinate all three trades before rough-in begins to resolve conflicts and verify clearances</li>
    <li><strong>Joist Drilling:</strong> Maximum hole size 1/3 joist depth; locate in center third of span; no holes within 2 inches of top/bottom edge</li>
    <li><strong>Notching Restrictions:</strong> Maximum notch depth 1/6 of joist depth; only in end third of span; never notch middle third</li>
    <li><strong>Stud Drilling:</strong> Maximum hole diameter 60% of stud width; minimum 5/8" wood remaining to each edge; nail plates required for holes within 1.25"</li>
    <li><strong>Inspection Sequence:</strong> Typically framing → plumbing → mechanical → electrical; each must pass before next trade proceeds</li>
  </ul>
</div>`,
  
  box9: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🚰 Water Supply Sizing Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC P2903:</strong> Pipe sizing based on fixture units, developed length, and available pressure</li>
    <li><strong>Trunk and Branch:</strong> Main trunk lines 3/4-inch minimum; branch lines 1/2-inch for most fixtures</li>
    <li><strong>Pressure Requirements:</strong> Minimum 40 psi at highest fixture; 60-80 psi optimal; pressure reducer required if over 80 psi</li>
    <li><strong>Water Hammer:</strong> Sudden valve closure causes pressure spike; install water hammer arrestors at washing machine, dishwasher</li>
    <li><strong>Velocity Limits:</strong> Maximum 8 ft/sec in cold water piping, 5 ft/sec in hot water to prevent erosion and noise</li>
  </ul>
</div>`,
  
  box10: `<div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Common Electrical Rough-In Mistakes</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Stapling Too Close:</strong> NEC requires cable secured within 12 inches of boxes, but staple damage from over-tightening causes failures</li>
    <li><strong>Insufficient Conductor Length:</strong> NEC 300.14 requires minimum 6 inches of free conductor at each outlet box for connections</li>
    <li><strong>Improper Wire Nuts:</strong> Must be sized for wire gauge and number of conductors; loose connections cause arcing and fires</li>
    <li><strong>Switch Loop Errors:</strong> Neutral required at all switch locations per NEC 404.2 for smart switches and energy code compliance</li>
    <li><strong>Missing Nail Plates:</strong> Steel plates required where wiring within 1.25 inches of stud/joist face to prevent nail/screw penetration</li>
  </ul>
</div>`,
  
  box11: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🏠 IRC Plumbing Fixture Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Water Closet:</strong> Minimum 15 inches centerline to sidewall, 30 inches centerline to centerline, 21 inches clearance in front</li>
    <li><strong>Lavatory:</strong> Minimum 4 inches clearance to sidewall, proper P-trap and vent within code distances</li>
    <li><strong>Bathtub/Shower:</strong> Valve height 48 inches above tub rim or shower base; showerhead maximum 80 inches above base</li>
    <li><strong>Kitchen Sink:</strong> Proper trap and vent; dishwasher air gap or high loop required to prevent backflow</li>
    <li><strong>Fixture Accessibility:</strong> ADA compliance may be required; verify requirements for adjustable-height fixtures and clearances</li>
  </ul>
</div>`,
  
  box12: `<div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Carbon Monoxide Detector Placement</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R315:</strong> CO alarms required in dwellings with fuel-burning appliances or attached garages</li>
    <li><strong>Location Requirements:</strong> Minimum one detector per sleeping area level; within 10 feet of bedroom doors</li>
    <li><strong>Mounting Height:</strong> Wall-mounted units 5 feet above floor; combination smoke/CO units on ceiling acceptable</li>
    <li><strong>Hardwired Requirement:</strong> Many jurisdictions require hardwired with battery backup; interconnected with smoke alarms</li>
    <li><strong>Replacement Schedule:</strong> Replace every 5-7 years per manufacturer recommendations; test monthly using test button</li>
  </ul>
</div>`
};

// Continue with remaining modules...
async function reformatModules() {
  console.log("Starting batch reformatting of Modules 4-9...\n");
  
  // Module 4
  console.log("=== MODULE 4 ===");
  const mod4 = await prisma.module.findUnique({ where: { moduleNumber: 4 } });
  if (mod4) {
    let content4 = mod4.content;
    fs.writeFileSync('/tmp/module4_before_boxes.html', content4);
    
    // Insert boxes for Module 4
    content4 = content4.replace(/(<h3[^>]*>.*?Roof Deck Preparation.*?<\/h3>)/i, `${module4Boxes.box1}\n\n$1`);
    content4 = content4.replace(/(<h3[^>]*>.*?Asphalt Shingle Installation.*?<\/h3>)/i, `$1\n${module4Boxes.box2}`);
    content4 = content4.replace(/(<h3[^>]*>.*?Building Science Principles.*?<\/h3>)/i, `${module4Boxes.box3}\n\n$1`);
    content4 = content4.replace(/(<h3[^>]*>.*?Flashing Systems.*?<\/h3>)/i, `$1\n${module4Boxes.box4}`);
    content4 = content4.replace(/(<h3[^>]*>.*?Roof Ventilation Requirements.*?<\/h3>)/i, `$1\n${module4Boxes.box5}`);
    content4 = content4.replace(/(<h3[^>]*>.*?Moisture Transport.*?<\/h3>[\s\S]{500,1500}?<p>[\s\S]*?<\/p>)/i, `$1\n${module4Boxes.box6}`);
    content4 = content4.replace(/(<div style="background: #fee2e2)/i, `${module4Boxes.box7}\n\n$1`);
    content4 = content4.replace(/(<h3[^>]*>.*?Cladding Installation.*?<\/h3>)/i, `$1\n${module4Boxes.box8}`);
    content4 = content4.replace(/(<h3[^>]*>.*?Air Sealing.*?<\/h3>[\s\S]{500,1500}?<p>[\s\S]*?<\/p>)/i, `$1\n${module4Boxes.box9}`);
    
    content4 = content4.replace(
      /<div style="background: #[ef]+[0-9a-f]*;[^"]*?">\s*<h2[^>]*>🎓 Conclusion/g,
      '<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin: 30px 0;">\n  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎓 Conclusion'
    );
    
    await prisma.module.update({ where: { moduleNumber: 4 }, data: { content: content4 } });
    console.log("✅ Module 4: 9 boxes added\n");
  }
  
  // Module 5
  console.log("=== MODULE 5 ===");
  const mod5 = await prisma.module.findUnique({ where: { moduleNumber: 5 } });
  if (mod5) {
    let content5 = mod5.content;
    fs.writeFileSync('/tmp/module5_before_boxes.html', content5);
    
    // Insert boxes for Module 5
    content5 = content5.replace(/(<h3[^>]*>.*?Load Calculation.*?<\/h3>)/i, `${module5Boxes.box1}\n\n$1`);
    content5 = content5.replace(/(<h3[^>]*>.*?Combustion Air.*?<\/h3>)/i, `$1\n${module5Boxes.box2}`);
    content5 = content5.replace(/(<h3[^>]*>.*?Electrical[\s\S]{0,100}?<\/h3>[\s\S]{500,1500}?<p>[\s\S]*?GFCI[\s\S]*?<\/p>)/i, `$1\n${module5Boxes.box3}`);
    content5 = content5.replace(/(<h3[^>]*>.*?Drain.*?Vent.*?<\/h3>)/i, `$1\n${module5Boxes.box4}`);
    content5 = content5.replace(/(<h3[^>]*>.*?Gas.*?<\/h3>[\s\S]{0,200}?)/i, `$1\n${module5Boxes.box5}`);
    content5 = content5.replace(/(<h3[^>]*>.*?Equipment Installation.*?<\/h3>)/i, `$1\n${module5Boxes.box6}`);
    content5 = content5.replace(/(<h3[^>]*>.*?Branch Circuit.*?<\/h3>[\s\S]{500,1500}?<p>[\s\S]*?<\/p>)/i, `$1\n${module5Boxes.box7}`);
    content5 = content5.replace(/(<div style="background: #fee2e2)/i, `${module5Boxes.box8}\n\n$1`);
    content5 = content5.replace(/(<h3[^>]*>.*?Water Service.*?<\/h3>)/i, `$1\n${module5Boxes.box9}`);
    content5 = content5.replace(/(<h3[^>]*>.*?Rough.*?Inspection.*?<\/h3>[\s\S]{500,1500}?<p>[\s\S]*?<\/p>)/i, `$1\n${module5Boxes.box10}`);
    content5 = content5.replace(/(<h3[^>]*>.*?Fixture.*?Requirements.*?<\/h3>[\s\S]{0,200}?)/i, `$1\n${module5Boxes.box11}`);
    content5 = content5.replace(/(<h3[^>]*>.*?Exhaust Ventilation.*?<\/h3>[\s\S]{500,1500}?<p>[\s\S]*?<\/p>)/i, `$1\n${module5Boxes.box12}`);
    
    content5 = content5.replace(
      /<div style="background: #[ef]+[0-9a-f]*;[^"]*?">\s*<h2[^>]*>🎓 Conclusion/g,
      '<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin: 30px 0;">\n  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎓 Conclusion'
    );
    
    await prisma.module.update({ where: { moduleNumber: 5 }, data: { content: content5 } });
    console.log("✅ Module 5: 12 boxes added\n");
  }
  
  await prisma.$disconnect();
  console.log("\n🎉 Modules 4-5 reformatted successfully!");
}

reformatModules().catch(console.error);
