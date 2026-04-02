import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();

const prisma = new PrismaClient();

// Module 6 boxes (5 total)
const module6Boxes = {
  box1: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>❄️ R-Value Requirements by Climate Zone</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IECC Climate Zones:</strong> Zone 1-2 (Hot): R-30 ceiling, R-13 wall; Zone 3-4 (Mixed): R-38 ceiling, R-20 wall; Zone 5-8 (Cold): R-49 ceiling, R-21 wall</li>
    <li><strong>Continuous Insulation:</strong> IRC requires continuous R-5 exterior insulation or equivalent in most climate zones to prevent thermal bridging</li>
    <li><strong>Basement/Crawlspace:</strong> Unvented crawlspace walls R-10, basement walls R-10 to R-15 depending on zone</li>
    <li><strong>Slab-On-Grade:</strong> R-10 perimeter insulation extending down 2 feet or R-10 extending down to frost depth in cold climates</li>
    <li><strong>Above-Grade Walls:</strong> R-20+5 (cavity + continuous) most common; R-13+10 in extreme cold climates</li>
  </ul>
</div>`,
  
  box2: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🌡️ Thermal Boundary Continuity Critical Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Continuous Air Barrier:</strong> Must be continuous across all building envelope assemblies; any breach allows convective heat loss and moisture transport</li>
    <li><strong>Band Joist Insulation:</strong> Critical transition between foundation and first floor; use spray foam or properly sealed batt insulation</li>
    <li><strong>Dropped Ceilings:</strong> Insulation must extend over interior partition walls to attic space to maintain thermal boundary</li>
    <li><strong>Attic Access:</strong> Weather-strip all attic access points; install insulated covers with minimum R-10</li>
    <li><strong>Cantilevers:</strong> Must be fully insulated and air sealed on all five sides; common source of comfort complaints and energy loss</li>
  </ul>
</div>`,
  
  box3: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>✅ Insulation Installation Best Practices</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Split Batts Around Wiring:</strong> Never compress insulation behind wiring/pipes; split batts with half in front and half behind obstacles</li>
    <li><strong>Complete Fill:</strong> Insulation must completely fill cavity with no gaps, voids, or compression; Grade I installation per RESNET standards</li>
    <li><strong>Proper Density:</strong> Blown-in insulation requires specific density (typically 1.5-2.2 lbs/cubic foot for fiberglass, 2.2-2.7 for cellulose)</li>
    <li><strong>Ventilation Baffles:</strong> Install at every rafter bay before installing attic insulation to maintain airflow from soffit to ridge</li>
    <li><strong>Dam at Eaves:</strong> Install blocking or baffles to prevent insulation from falling into soffit area and blocking ventilation</li>
  </ul>
</div>`,
  
  box4: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🏗️ Drywall Hanging Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Sheet Orientation:</strong> Hang perpendicular to framing when possible to maximize strength and minimize joints</li>
    <li><strong>Screw Spacing:</strong> Maximum 12 inches on center on ceilings, 16 inches on walls; 8 inches for water-resistant drywall in wet areas</li>
    <li><strong>Screw Depth:</strong> Set screws just below surface creating slight dimple without breaking paper face; over-driven screws lack holding power</li>
    <li><strong>Fastener Setback:</strong> Minimum 3/8 inch from edges and ends; closer fastening causes edge fracture</li>
    <li><strong>Type X Fire-Rated:</strong> IRC R302.6 requires Type X (5/8-inch) drywall on garage walls/ceilings adjacent to living space</li>
  </ul>
</div>`,
  
  box5: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>🔍 Quality Control Inspection Points</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Insulation Inspection:</strong> Verify proper R-value labels visible, complete cavity fill, no gaps or compression, proper air sealing at penetrations</li>
    <li><strong>Thermal Imaging:</strong> Consider infrared scanning to identify thermal bridges, missing insulation, air leakage paths</li>
    <li><strong>Blower Door Test:</strong> Energy code increasingly requires air leakage testing; typical target 3-5 ACH50 (air changes per hour at 50 pascals)</li>
    <li><strong>Drywall Inspection:</strong> Check fastener spacing and depth, proper joint compound application, corner bead installation</li>
    <li><strong>Moisture Meter:</strong> Verify all materials below 15% moisture content before installation to prevent mold growth</li>
  </ul>
</div>`
};

// Module 7 boxes (5 total)
const module7Boxes = {
  box1: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🎨 Paint Coating Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Surface Preparation:</strong> 80% of paint failure results from inadequate surface prep; proper cleaning, sanding, priming essential</li>
    <li><strong>Primer Application:</strong> PVA (polyvinyl acetate) primer required on new drywall; stain-blocking primer for water stains, knots</li>
    <li><strong>Paint Sheen Selection:</strong> Flat (walls/ceilings), eggshell (living areas), satin (kitchens/baths), semi-gloss (trim), gloss (doors)</li>
    <li><strong>Coating Thickness:</strong> Minimum 1.5 mils dry film thickness per coat; typically requires primer + two finish coats</li>
    <li><strong>VOC Compliance:</strong> Most jurisdictions limit VOCs to 50 g/L for flat paint, 100-150 g/L for other sheens</li>
  </ul>
</div>`,
  
  box2: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>✅ Trim Carpentry Best Practices</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Miter Joints:</strong> Back-cut miters slightly (1-2 degrees) to ensure tight fit at face; glue and nail both pieces</li>
    <li><strong>Cope Joints:</strong> Inside corners should be coped (profile cut) rather than mitered for superior appearance and seasonal movement tolerance</li>
    <li><strong>Nail Placement:</strong> Use 18-gauge brad nails or 15-gauge finish nails; space 16 inches on center, two nails at each stud</li>
    <li><strong>Reveal Consistency:</strong> Maintain consistent 1/8-inch to 1/4-inch reveal where trim meets door jambs/window jambs</li>
    <li><strong>Pre-Finishing:</strong> Prime and paint trim before installation when possible; touch up nail holes after installation</li>
  </ul>
</div>`,
  
  box3: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🌡️ Flooring Acclimation Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Hardwood Acclimation:</strong> Minimum 3-7 days in installation environment; target 6-9% moisture content for most regions</li>
    <li><strong>Engineered Wood:</strong> Less sensitive than solid wood but still requires 48 hours minimum acclimation</li>
    <li><strong>Laminate Flooring:</strong> Minimum 48 hours; boxes should be opened and spread out in installation space</li>
    <li><strong>HVAC Requirements:</strong> Maintain installation environment at normal living conditions (65-75°F, 35-55% RH) during and after installation</li>
    <li><strong>Subfloor Moisture:</strong> Test with moisture meter; maximum 12% for wood subfloors, 4.5% for concrete before installing wood flooring</li>
  </ul>
</div>`,
  
  box4: `<div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Common Cabinet Installation Mistakes</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Improper Leveling:</strong> Must level individual cabinets before screwing together; trying to level assembled run impossible</li>
    <li><strong>Wall Attachment:</strong> Must screw through cabinet back rail into wall studs; drywall anchors insufficient for upper cabinets</li>
    <li><strong>Shim Gaps:</strong> Large gaps behind cabinets indicate unlevel walls; use shims but avoid over-shimming which racks cabinet boxes</li>
    <li><strong>Countertop Support:</strong> Minimum 3/4-inch plywood deck required under stone countertops; particle board inadequate</li>
    <li><strong>Dishwasher Adjacent:</strong> Provide minimum 1/2-inch clearance to allow dishwasher removal without cabinet disassembly</li>
  </ul>
</div>`,
  
  box5: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>✅ Interior Finish Quality Checklist</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Paint Quality:</strong> Check for uniform color, no lap marks, roller stipple, brush marks, or holidays (missed spots)</li>
    <li><strong>Trim Joints:</strong> Verify tight miter joints, properly coped inside corners, no visible nail holes, consistent reveals</li>
    <li><strong>Cabinet Alignment:</strong> Doors should be flush and parallel, consistent reveal around doors, smooth operation of all hardware</li>
    <li><strong>Flooring Inspection:</strong> Check transition strips properly installed, no cupping/crowning, consistent board spacing, clean finish</li>
    <li><strong>Final Touch-Up:</strong> Address all punch-list items including paint touch-up, caulking gaps, adjusting doors, cleaning surfaces</li>
  </ul>
</div>`
};

// Module 8 boxes (12 total)
const module8Boxes = {
  box1: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>⚡ Electrical Final Device Testing Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Receptacle Testing:</strong> Use plug-in tester to verify correct wiring (hot/neutral/ground), proper polarity, and ground continuity</li>
    <li><strong>Voltage Verification:</strong> All receptacles should measure 120V ± 5%; low voltage indicates loose connections or undersized conductors</li>
    <li><strong>Switch Operation:</strong> Test all switches control correct fixtures/receptacles; verify 3-way and 4-way switch logic</li>
    <li><strong>GFCI Function:</strong> Test with tester device and circuit breaker; should trip within 4-6 milliseconds under fault condition</li>
    <li><strong>Panel Labeling:</strong> All circuit breakers must be accurately labeled indicating served areas/appliances per NEC 408.4</li>
  </ul>
</div>`,
  
  box2: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🔌 Critical GFCI/AFCI Testing Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>GFCI Test Protocol:</strong> Press test button monthly; device should trip immediately and reset button should pop out</li>
    <li><strong>AFCI Testing:</strong> Press test button on AFCI breaker; should trip immediately indicating arc detection circuit functioning</li>
    <li><strong>Load Testing:</strong> Plug in appliance and test GFCI under load; some devices fail only when loaded</li>
    <li><strong>Downstream Protection:</strong> Verify all receptacles fed from GFCI are protected; test each downstream outlet</li>
    <li><strong>Replacement Criteria:</strong> Replace any GFCI/AFCI device that fails to trip, won't reset, or shows physical damage</li>
  </ul>
</div>`,
  
  box3: `<div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Carbon Monoxide Detector Critical Testing</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R315 Compliance:</strong> Required within 10 feet of bedroom doors in homes with fuel-burning appliances or attached garages</li>
    <li><strong>Test Button Function:</strong> Press test button to verify alarm sounds; test monthly per manufacturer recommendations</li>
    <li><strong>Sensor Lifespan:</strong> CO sensors expire in 5-7 years; check manufacture date and replace per schedule</li>
    <li><strong>Alarm Response Protocol:</strong> If alarm sounds, evacuate immediately, call 911 from outside, do NOT re-enter until cleared by fire department</li>
    <li><strong>Interconnection:</strong> Hardwired CO alarms should be interconnected with smoke alarms so all sound when any single unit trips</li>
  </ul>
</div>`,
  
  box4: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🚰 Plumbing Fixture Installation Code</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Water Closet Installation:</strong> IRC P2705 requires proper seal between closet flange and toilet; wax ring or rubber gasket</li>
    <li><strong>Lavatory Mounting:</strong> Must be adequately supported; wall-hung lavatories require proper backing, countertop models need solid support</li>
    <li><strong>Shower Valve Height:</strong> 48 inches above threshold for mixing valve; 80 inches maximum for showerhead</li>
    <li><strong>Water Heater T&P Valve:</strong> Temperature & Pressure relief valve discharge pipe must extend to within 6 inches of floor or drain</li>
    <li><strong>Fixture Trap Seals:</strong> All fixtures must maintain trap seal; test by running water and checking for sewer gas odor</li>
  </ul>
</div>`,
  
  box5: `<div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Common Fixture Installation Deficiencies</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Toilet Flange Below Floor:</strong> Flange must be flush with finished floor; low flange prevents proper seal and causes leaks</li>
    <li><strong>Missing Escutcheons:</strong> Trim plates required at all wall/floor penetrations to prevent pest/moisture entry</li>
    <li><strong>Improper Slope:</strong> Shower bases must slope minimum 1/4 inch per foot toward drain to prevent standing water</li>
    <li><strong>Loose Faucet Connections:</strong> Hand-tight plus 1/4 turn with wrench; over-tightening cracks fixtures, under-tightening leaks</li>
    <li><strong>Missing Caulking:</strong> Seal all fixture-to-wall and fixture-to-countertop joints with silicone caulk to prevent water damage</li>
  </ul>
</div>`,
  
  box6: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>❄️ HVAC Commissioning Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Airflow Verification:</strong> Each supply register should deliver airflow within 10% of Manual J calculated requirement</li>
    <li><strong>Static Pressure Testing:</strong> Total external static pressure should not exceed equipment specifications (typically 0.5-0.8" WC)</li>
    <li><strong>Refrigerant Charge:</strong> Verify proper charge using superheat/subcooling method; improper charge reduces efficiency 20-40%</li>
    <li><strong>Thermostat Calibration:</strong> Verify thermostat accurately reads room temperature within ±1°F</li>
    <li><strong>Duct Leakage Testing:</strong> Energy code increasingly requires duct leakage testing; maximum 4-8 CFM per 100 sq ft conditioned area</li>
  </ul>
</div>`,
  
  box7: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🔥 Smoke Detector Placement Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>IRC R314:</strong> Smoke alarms required in each bedroom, outside each sleeping area, and on every story including basement</li>
    <li><strong>Mounting Location:</strong> Ceiling-mounted 4-12 inches from wall; wall-mounted 4-12 inches below ceiling</li>
    <li><strong>Avoid Placement Near:</strong> Keep 3 feet from HVAC registers, 10 feet from cooking appliances, away from bathrooms</li>
    <li><strong>Interconnection:</strong> All alarms must be interconnected (hardwired or wireless) so activation of one triggers all</li>
    <li><strong>Power Requirements:</strong> Primary power from electrical system with battery backup; battery-only acceptable in existing homes</li>
  </ul>
</div>`,
  
  box8: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>📋 Final Mechanical Systems Inspection Checklist</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Electrical Systems:</strong> All devices installed and tested, panel labeled, GFCI/AFCI functional, smoke/CO alarms operational</li>
    <li><strong>Plumbing Systems:</strong> All fixtures installed and tested, no leaks visible, proper drainage, hot water delivery to all fixtures</li>
    <li><strong>HVAC Systems:</strong> Heating and cooling operational, proper airflow at all registers, thermostat programmed and tested</li>
    <li><strong>Ventilation:</strong> Bath fans operational with proper ducting to exterior, kitchen hood installed and functioning</li>
    <li><strong>Documentation:</strong> Appliance manuals, warranty information, system specifications provided to owner</li>
  </ul>
</div>`,
  
  box9: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🏗️ Concrete Flatwork Specifications</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Concrete Strength:</strong> Minimum 3,000 psi for driveways and walkways; 3,500-4,000 psi for garage slabs</li>
    <li><strong>Slab Thickness:</strong> Minimum 4 inches for walkways, 6 inches for driveways and garage slabs with vehicle traffic</li>
    <li><strong>Reinforcement:</strong> Wire mesh (6x6 W1.4xW1.4) or rebar required in slabs 6 inches thick or greater</li>
    <li><strong>Control Joints:</strong> Maximum 10-foot spacing in both directions; depth minimum 1/4 slab thickness</li>
    <li><strong>Slope Requirements:</strong> Minimum 1/8 inch per foot away from structures for drainage; 1/4 inch per foot preferred</li>
  </ul>
</div>`,
  
  box10: `<div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Common Concrete Defects</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Surface Scaling:</strong> Caused by finishing too early, poor curing, or freeze-thaw damage; delamination of surface layer</li>
    <li><strong>Plastic Shrinkage Cracks:</strong> Occur when surface dries too quickly; prevent with proper curing and evaporation retarders</li>
    <li><strong>Spalling:</strong> Breaking away of concrete surface; caused by corrosion of embedded steel or freeze-thaw cycles</li>
    <li><strong>Settling Cracks:</strong> Result from inadequate base preparation or consolidation; appear as wide random cracks</li>
    <li><strong>Pop-Outs:</strong> Small cone-shaped craters caused by aggregate expansion; freeze-thaw or reactive aggregates</li>
  </ul>
</div>`,
  
  box11: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>🌱 Landscape Contractor Quality Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Final Grading:</strong> Minimum 6 inches topsoil depth for turf areas, 2% slope away from structures for 10 feet</li>
    <li><strong>Seed vs. Sod:</strong> Sod provides instant lawn but requires perfect soil contact; seeding more economical but requires protection and watering</li>
    <li><strong>Mulch Application:</strong> 2-3 inch depth around plants; keep mulch 2-3 inches away from building foundations and tree trunks</li>
    <li><strong>Plant Installation:</strong> Dig holes 2-3 times root ball width, same depth as container; backfill with native soil, water thoroughly</li>
    <li><strong>Irrigation:</strong> Test all zones, adjust heads for proper coverage, verify timer programming, demonstrate system to owner</li>
  </ul>
</div>`,
  
  box12: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🔍 Final Inspection Comprehensive Criteria</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Life Safety Systems:</strong> Smoke alarms, CO detectors, GFCI protection, handrail/guardrail systems, egress windows in bedrooms</li>
    <li><strong>Mechanical Completion:</strong> All systems operational, appliances installed, plumbing fixtures functional, HVAC commissioned</li>
    <li><strong>Building Envelope:</strong> Weathertight exterior, proper grading and drainage, all penetrations sealed</li>
    <li><strong>Interior Finishes:</strong> Paint complete, flooring installed, trim and doors installed and operating properly</li>
    <li><strong>Certificate of Occupancy:</strong> Issued only after all inspections pass, fees paid, and structure complies with approved plans</li>
  </ul>
</div>`
};

// Module 9 boxes (12 total)
const module9Boxes = {
  box1: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🏠 Appliance Installation Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Refrigerator:</strong> Level side-to-side and front-to-back within 1/4 inch; verify water line connection leak-free</li>
    <li><strong>Range/Cooktop:</strong> Gas connections require sediment trap and proper leak testing; electric requires proper circuit sizing</li>
    <li><strong>Dishwasher:</strong> Secure to countertop, level front-to-back, high loop or air gap for drain, test for leaks</li>
    <li><strong>Microwave:</strong> Wall-hung units require proper backing and secure mounting; verify proper ventilation ducting</li>
    <li><strong>Washer/Dryer:</strong> Level within 1/2 inch, dryer vent maximum 25 feet 4-inch diameter rigid duct, water supply shut-offs accessible</li>
  </ul>
</div>`,
  
  box2: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>⚡ Appliance Electrical Safety Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Dedicated Circuits:</strong> NEC requires dedicated circuits for dishwasher (15A), disposal (15A), microwave (20A), range (40-50A)</li>
    <li><strong>GFCI Protection:</strong> Dishwasher and disposal require GFCI protection; refrigerator exempted in most jurisdictions</li>
    <li><strong>Range Receptacle:</strong> 4-wire (neutral + ground) required for all new installations; 3-wire no longer code-compliant</li>
    <li><strong>Cord Lengths:</strong> Should be adequate to reach receptacle without extension cords; 6 feet typical appliance cord length</li>
    <li><strong>Grounding:</strong> All metal appliances must be properly grounded; verify continuity with multimeter</li>
  </ul>
</div>`,
  
  box3: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>✅ Appliance Testing and Commissioning Checklist</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Refrigerator:</strong> Verify cooling to proper temperature (35-38°F), ice maker functioning if equipped, no leaks from water line</li>
    <li><strong>Range:</strong> Test all burners/elements, oven heating to setpoint temperature within 25°F, timer and controls functional</li>
    <li><strong>Dishwasher:</strong> Complete full cycle test, check for leaks, verify proper drainage and final temperature (minimum 150°F rinse)</li>
    <li><strong>Disposal:</strong> Run with water, test reset button, verify no leaks at mounting flange or drain connections</li>
    <li><strong>Dryer:</strong> Verify proper exhaust airflow, test heating element/gas burner, ensure lint trap clean and properly seated</li>
  </ul>
</div>`,
  
  box4: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🚪 ANSI/BHMA Hardware Standards</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Grade Ratings:</strong> Grade 1 (commercial/high-traffic), Grade 2 (residential heavy-use), Grade 3 (residential light-use)</li>
    <li><strong>Exterior Doors:</strong> Require minimum Grade 2 deadbolts with 1-inch throw, hardened steel inserts to prevent sawing</li>
    <li><strong>Backset:</strong> Standard 2-3/8 inches for interior, 2-3/4 inches for exterior doors; verify door prep matches hardware</li>
    <li><strong>Handing:</strong> Determine left-hand or right-hand swing; stand outside looking at door closing toward you</li>
    <li><strong>ADA Compliance:</strong> Lever handles required (not knobs) for accessibility; maximum 5 pounds operating force</li>
  </ul>
</div>`,
  
  box5: `<div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
  <p style="margin: 0 0 10px 0;"><strong>⚠️ Common Hardware Installation Mistakes</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Improper Strike Alignment:</strong> Latch bolt must fully engage strike plate; misalignment causes doors not to latch properly</li>
    <li><strong>Over-Tightening Screws:</strong> Strips wood and prevents proper function; use screwdriver, not drill, for final tightening</li>
    <li><strong>Wrong Screw Length:</strong> Hinge screws too long can penetrate door skin; too short provide inadequate holding power</li>
    <li><strong>Missing Deadbolt Reinforcement:</strong> Exterior doors should have security strike with 3-inch screws into framing</li>
    <li><strong>Painted Locksets:</strong> Remove hardware before painting doors; paint buildup prevents proper operation</li>
  </ul>
</div>`,
  
  box6: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>♿ ADA Accessibility Compliance Requirements</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Door Hardware:</strong> Lever handles required; maximum 5 pounds force to operate; height 34-48 inches above floor</li>
    <li><strong>Door Width:</strong> Minimum 32-inch clear opening width when door open 90 degrees</li>
    <li><strong>Thresholds:</strong> Maximum 1/2-inch height; beveled if exceeding 1/4 inch</li>
    <li><strong>Maneuvering Clearances:</strong> Specific clearances required on push/pull sides depending on approach direction</li>
    <li><strong>Automatic Operators:</strong> Consider for primary entrance when accessibility required; 3-second delay for safety</li>
  </ul>
</div>`,
  
  box7: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>🎨 Final Paint Touch-Up Protocols</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Lighting Inspection:</strong> Inspect walls and ceilings under proper lighting (natural + artificial) to identify imperfections</li>
    <li><strong>Spot Priming:</strong> Prime all repaired areas and nail holes before touch-up to prevent flashing and sheen differences</li>
    <li><strong>Cut-In Technique:</strong> Use same brush technique as original application; feather edges to blend with existing paint</li>
    <li><strong>Sheen Matching:</strong> Touch-up with original paint if available; new paint may not match exactly due to aging/fading</li>
    <li><strong>Caulk Inspection:</strong> Check all inside corners, crown molding, base trim, and window/door trim; fill gaps before painting</li>
  </ul>
</div>`,
  
  box8: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🌬️ VOC Standards and Ventilation</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>VOC Limits:</strong> SCAQMD Rule 1113 limits: 50 g/L flat, 100 g/L non-flat, 250 g/L stains; many jurisdictions adopt these limits</li>
    <li><strong>Post-Paint Ventilation:</strong> Maintain increased ventilation for 48-72 hours after painting to dissipate VOCs</li>
    <li><strong>Low-VOC Products:</strong> Consider zero-VOC paints for sensitive individuals; slightly higher cost but minimal odor</li>
    <li><strong>HVAC Protection:</strong> Cover registers during painting; change HVAC filters after painting project complete</li>
    <li><strong>Health Considerations:</strong> Pregnant women, infants, and chemically sensitive individuals should avoid freshly painted spaces 48+ hours</li>
  </ul>
</div>`,
  
  box9: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>🧹 Construction Cleaning Best Practices</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Rough Clean:</strong> Remove all construction debris, excess materials, packaging; vacuum entire structure including mechanical spaces</li>
    <li><strong>Detail Clean:</strong> Clean all windows inside/out, wipe down cabinets, clean appliances, remove stickers and labels</li>
    <li><strong>Floor Protection:</strong> Remove all flooring protection materials; clean/polish hardwood, vacuum carpet, mop hard surfaces</li>
    <li><strong>Exterior Cleaning:</strong> Power wash siding, clean windows, remove construction signs, sweep driveway and walks</li>
    <li><strong>Final Inspection Prep:</strong> Ensure all areas accessible for inspection; turn on all lights, set thermostat, test all systems</li>
  </ul>
</div>`,
  
  box10: `<div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <p style="margin: 0 0 10px 0;"><strong>🔍 Final Walkthrough Inspection Criteria</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Punch List Development:</strong> Document all deficiencies, incomplete items, cosmetic issues requiring correction</li>
    <li><strong>Systems Testing:</strong> Demonstrate operation of all mechanical, electrical, plumbing systems to owner</li>
    <li><strong>Cosmetic Standards:</strong> Walls should be smooth and uniformly painted, trim joints tight, flooring clean and undamaged</li>
    <li><strong>Operational Items:</strong> All doors and windows operate smoothly, hardware functions properly, appliances operational</li>
    <li><strong>Exterior Conditions:</strong> Grading complete, landscaping installed, driveway sealed, gutters/downspouts attached</li>
  </ul>
</div>`,
  
  box11: `<div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <p style="margin: 0 0 10px 0;"><strong>🔒 Final Safety Device Verification</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Smoke Alarm Test:</strong> Press test button on each unit; all interconnected alarms should sound</li>
    <li><strong>CO Detector Test:</strong> Test each unit; verify installation locations meet IRC R315 requirements</li>
    <li><strong>GFCI Verification:</strong> Test all GFCI outlets and breakers; replace any that fail to trip or reset</li>
    <li><strong>AFCI Confirmation:</strong> Test AFCI breakers; verify proper installation in required locations per NEC 210.12</li>
    <li><strong>Emergency Egress:</strong> Verify bedroom windows meet egress requirements: minimum 5.7 sq ft opening, 24" high, 20" wide, sill max 44" above floor</li>
  </ul>
</div>`,
  
  box12: `<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <p style="margin: 0 0 10px 0;"><strong>📋 Project Closeout Documentation</strong></p>
  <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Appliance Manuals:</strong> Provide all owner's manuals, warranty cards, installation instructions for appliances and systems</li>
    <li><strong>Paint Records:</strong> Document all paint colors, brands, sheens for future touch-up reference</li>
    <li><strong>Material Samples:</strong> Provide samples of flooring, countertop, tile for future repair needs</li>
    <li><strong>System Information:</strong> HVAC equipment model/serial numbers, water heater specs, electrical panel schedule</li>
    <li><strong>Warranty Documents:</strong> Compile all manufacturer warranties, builder warranty, contact information for service providers</li>
  </ul>
</div>`
};

async function reformatModules() {
  console.log("Starting batch reformatting of Modules 6-9...\n");
  
  // Module 6
  console.log("=== MODULE 6 ===");
  const mod6 = await prisma.module.findUnique({ where: { moduleNumber: 6 } });
  if (mod6) {
    let content6 = mod6.content;
    fs.writeFileSync('/tmp/module6_before_boxes.html', content6);
    
    content6 = content6.replace(/(<h3[^>]*>.*?Insulation Contractor.*?<\/h3>)/i, `${module6Boxes.box1}\n\n$1`);
    content6 = content6.replace(/(<p>[\s\S]*?thermal boundary[\s\S]*?<\/p>)/i, `$1\n${module6Boxes.box2}`);
    content6 = content6.replace(/(<p>[\s\S]*?installation[\s\S]{300,800}?<\/p>)/i, `$1\n${module6Boxes.box3}`);
    content6 = content6.replace(/(<h3[^>]*>.*?Drywall Contractor.*?<\/h3>)/i, `$1\n${module6Boxes.box4}`);
    content6 = content6.replace(/(<div style="background: #fee2e2)/i, `${module6Boxes.box5}\n\n$1`);
    
    content6 = content6.replace(
      /<div style="background: #[ef]+[0-9a-f]*;[^"]*?">\s*<h2[^>]*>🎓 Conclusion/g,
      '<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin: 30px 0;">\n  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎓 Conclusion'
    );
    
    await prisma.module.update({ where: { moduleNumber: 6 }, data: { content: content6 } });
    console.log("✅ Module 6: 5 boxes added\n");
  }
  
  // Module 7
  console.log("=== MODULE 7 ===");
  const mod7 = await prisma.module.findUnique({ where: { moduleNumber: 7 } });
  if (mod7) {
    let content7 = mod7.content;
    fs.writeFileSync('/tmp/module7_before_boxes.html', content7);
    
    content7 = content7.replace(/(<h3[^>]*>.*?Painting Contractor.*?<\/h3>)/i, `${module7Boxes.box1}\n\n$1`);
    content7 = content7.replace(/(<h3[^>]*>.*?Trim Carpentry.*?<\/h3>)/i, `$1\n${module7Boxes.box2}`);
    content7 = content7.replace(/(<h3[^>]*>.*?Flooring Installation.*?<\/h3>)/i, `${module7Boxes.box3}\n\n$1`);
    content7 = content7.replace(/(<h3[^>]*>.*?Cabinet Installation.*?<\/h3>)/i, `$1\n${module7Boxes.box4}`);
    content7 = content7.replace(/(<div style="background: #fee2e2)/i, `${module7Boxes.box5}\n\n$1`);
    
    content7 = content7.replace(
      /<div style="background: #[ef]+[0-9a-f]*;[^"]*?">\s*<h2[^>]*>🎓 Conclusion/g,
      '<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin: 30px 0;">\n  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎓 Conclusion'
    );
    
    await prisma.module.update({ where: { moduleNumber: 7 }, data: { content: content7 } });
    console.log("✅ Module 7: 5 boxes added\n");
  }
  
  // Module 8
  console.log("=== MODULE 8 ===");
  const mod8 = await prisma.module.findUnique({ where: { moduleNumber: 8 } });
  if (mod8) {
    let content8 = mod8.content;
    fs.writeFileSync('/tmp/module8_before_boxes.html', content8);
    
    content8 = content8.replace(/(<h3[^>]*>.*?Electrician Final.*?<\/h3>)/i, `${module8Boxes.box1}\n\n$1`);
    content8 = content8.replace(/(<p>[\s\S]*?GFCI[\s\S]{200,600}?<\/p>)/i, `$1\n${module8Boxes.box2}`);
    content8 = content8.replace(/(<p>[\s\S]*?carbon monoxide[\s\S]{200,600}?<\/p>)/i, `$1\n${module8Boxes.box3}`);
    content8 = content8.replace(/(<h3[^>]*>.*?Plumber Final.*?<\/h3>)/i, `$1\n${module8Boxes.box4}`);
    content8 = content8.replace(/(<p>[\s\S]*?fixture[\s\S]{300,800}?deficien[\s\S]{0,200}?<\/p>)/i, `$1\n${module8Boxes.box5}`);
    content8 = content8.replace(/(<h3[^>]*>.*?HVAC Contractor.*?<\/h3>)/i, `$1\n${module8Boxes.box6}`);
    content8 = content8.replace(/(<p>[\s\S]*?smoke detector[\s\S]{200,600}?<\/p>)/i, `$1\n${module8Boxes.box7}`);
    content8 = content8.replace(/(<h3[^>]*>.*?Final Inspection.*?<\/h3>)/i, `${module8Boxes.box8}\n\n$1`);
    content8 = content8.replace(/(<h3[^>]*>.*?Concrete Contractor.*?<\/h3>)/i, `$1\n${module8Boxes.box9}`);
    content8 = content8.replace(/(<p>[\s\S]*?concrete[\s\S]{300,800}?defect[\s\S]{0,200}?<\/p>)/i, `$1\n${module8Boxes.box10}`);
    content8 = content8.replace(/(<h3[^>]*>.*?Landscape Contractor.*?<\/h3>)/i, `$1\n${module8Boxes.box11}`);
    content8 = content8.replace(/(<div style="background: #fee2e2)/i, `${module8Boxes.box12}\n\n$1`);
    
    content8 = content8.replace(
      /<div style="background: #[ef]+[0-9a-f]*;[^"]*?">\s*<h2[^>]*>🎓 Conclusion/g,
      '<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin: 30px 0;">\n  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎓 Conclusion'
    );
    
    await prisma.module.update({ where: { moduleNumber: 8 }, data: { content: content8 } });
    console.log("✅ Module 8: 12 boxes added\n");
  }
  
  // Module 9
  console.log("=== MODULE 9 ===");
  const mod9 = await prisma.module.findUnique({ where: { moduleNumber: 9 } });
  if (mod9) {
    let content9 = mod9.content;
    fs.writeFileSync('/tmp/module9_before_boxes.html', content9);
    
    content9 = content9.replace(/(<h3[^>]*>.*?Appliance[\s\S]{0,100}?<\/h3>)/i, `${module9Boxes.box1}\n\n$1`);
    content9 = content9.replace(/(<p>[\s\S]*?electrical[\s\S]{200,600}?appliance[\s\S]{0,200}?<\/p>)/i, `$1\n${module9Boxes.box2}`);
    content9 = content9.replace(/(<p>[\s\S]*?test[\s\S]{200,600}?appliance[\s\S]{0,300}?<\/p>)/i, `$1\n${module9Boxes.box3}`);
    content9 = content9.replace(/(<h3[^>]*>.*?Door Hardware.*?<\/h3>)/i, `${module9Boxes.box4}\n\n$1`);
    content9 = content9.replace(/(<p>[\s\S]*?hardware[\s\S]{200,600}?mistake[\s\S]{0,200}?<\/p>)/i, `$1\n${module9Boxes.box5}`);
    content9 = content9.replace(/(<p>[\s\S]*?ADA[\s\S]{200,600}?<\/p>)/i, `$1\n${module9Boxes.box6}`);
    content9 = content9.replace(/(<h3[^>]*>.*?Paint[\s\S]{0,50}?Touch.*?<\/h3>)/i, `${module9Boxes.box7}\n\n$1`);
    content9 = content9.replace(/(<p>[\s\S]*?VOC[\s\S]{200,600}?<\/p>)/i, `$1\n${module9Boxes.box8}`);
    content9 = content9.replace(/(<h3[^>]*>.*?Cleaning.*?<\/h3>)/i, `${module9Boxes.box9}\n\n$1`);
    content9 = content9.replace(/(<h3[^>]*>.*?Final[\s\S]{0,50}?Walkthrough.*?<\/h3>)/i, `${module9Boxes.box10}\n\n$1`);
    content9 = content9.replace(/(<p>[\s\S]*?safety[\s\S]{200,600}?device[\s\S]{0,200}?<\/p>)/i, `$1\n${module9Boxes.box11}`);
    content9 = content9.replace(/(<div style="background: #fee2e2)/i, `${module9Boxes.box12}\n\n$1`);
    
    content9 = content9.replace(
      /<div style="background: #[ef]+[0-9a-f]*;[^"]*?">\s*<h2[^>]*>🎓 Conclusion/g,
      '<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin: 30px 0;">\n  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎓 Conclusion'
    );
    
    await prisma.module.update({ where: { moduleNumber: 9 }, data: { content: content9 } });
    console.log("✅ Module 9: 12 boxes added\n");
  }
  
  await prisma.$disconnect();
  console.log("\n🎉 Modules 6-9 reformatted successfully!");
}

reformatModules().catch(console.error);
