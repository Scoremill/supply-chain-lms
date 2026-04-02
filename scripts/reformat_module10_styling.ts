
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const newContent = `
<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.6;">

<div style="background: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <h1 style="margin: 0 0 20px 0; font-size: 2.5em; font-weight: 700; color: black;">Module 10: Final Walkthrough & Project Handover</h1>
  <p style="font-size: 1.2em; margin: 0; color: #333;">Advanced Construction Management and Civil Engineering Practice</p>
</div>

<div style="background: #BEFFD1; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; font-size: 1.8em; color: black; font-weight: bold;">🎯 Learning Objectives</h2>
  <ul style="margin: 0; padding-left: 20px; font-size: 1.05em; line-height: 1.8; color: black;">
    <li>Master the systematic methodology for conducting comprehensive pre-final inspections, identifying deficiencies across all building systems, and implementing corrective action protocols that ensure code compliance and owner satisfaction.</li>
    <li>Navigate the final building inspection process with thorough understanding of inspector evaluation criteria, code verification procedures, and the regulatory requirements governing Certificate of Occupancy issuance.</li>
    <li>Execute professional homeowner orientation sessions incorporating systematic equipment operation demonstrations, maintenance protocol instruction, and comprehensive documentation transfer procedures.</li>
    <li>Implement rigorous project closeout procedures including lien release procurement, warranty compilation and transfer, as-built documentation preparation, and financial reconciliation.</li>
    <li>Coordinate effective project handover processes that protect all parties' interests through proper documentation, clear communication of post-occupancy responsibilities, and establishment of warranty service protocols.</li>
  </ul>
</div>

<div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 30px; border-left: 5px solid #667eea;">
  <h2 style="color: #667eea; margin-top: 0;">📋 Overview: The Critical Transition from Construction to Occupancy</h2>
  <p>The final walkthrough and project handover phase represents the formal transition point where construction activities cease and building occupancy commences. This phase is universally recognized within the construction industry as a critical period requiring meticulous attention to detail, comprehensive quality verification, and thorough documentation. <strong>Industry research indicates that approximately 60% of all post-construction disputes and warranty claims originate from inadequate closeout procedures, incomplete documentation transfer, or insufficient owner orientation.</strong></p>
  
  <p>This phase involves the systematic verification that all construction work has been completed in accordance with approved plans and specifications, all building code requirements have been satisfied, all contractual obligations have been fulfilled, and all necessary documentation has been compiled and transferred to the building owner. The work requires precise coordination among the construction manager, trade contractors, building inspectors, design professionals, and the property owner to ensure a smooth transition that protects all parties' interests.</p>
  
  <p>The closeout period establishes the foundation for the building's operational phase, requiring thorough documentation of all systems, clear instruction on proper operation and maintenance procedures, and formal transfer of all warranties and guarantees. Success in this phase demands comprehensive understanding of building systems, code compliance verification procedures, contractual closeout requirements, warranty administration, and professional communication protocols.</p>
</div>

<div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 30px;">
  <h2 style="color: #f5576c; margin-top: 0;">🏗 Construction Manager Pre-Final Inspection Protocols</h2>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Systematic Pre-Final Inspection Methodology</h3>
  <p>The Construction Manager's pre-final inspection represents the last internal quality control checkpoint before requesting the municipal final building inspection. This inspection must be conducted with extreme thoroughness, as any deficiencies identified by the building inspector result in re-inspection fees, schedule delays, and potential damage to professional reputation. <strong>The pre-final inspection typically occurs 7 to 14 days before the anticipated final inspection date</strong>, allowing adequate time for deficiency correction without jeopardizing the overall project schedule.</p>
  
  <p>The CM employs a comprehensive checklist-based inspection methodology that systematically evaluates every space, system, and component within the structure. This checklist is typically organized by building system (structural, electrical, mechanical, plumbing) and by space (room-by-room progression), ensuring no areas are inadvertently overlooked. Modern construction management practice increasingly utilizes tablet-based inspection software that allows digital photograph attachment to each checklist item, creating a comprehensive visual record of conditions at the time of inspection.</p>
  
  <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
    <p style="margin: 0;"><strong>🔍 Inspection Focus Areas:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li>Thorough exterior evaluation of roofing, siding, windows, doors, lighting, grading, and landscaping</li>
      <li>Proper flashing installation at all roof penetrations and transitions</li>
      <li>Adequate caulking at window and door perimeters</li>
      <li>Proper termination of all exterior utilities</li>
      <li>Installation of required address numbers meeting minimum size and visibility requirements</li>
      <li>Verification that all exterior electrical receptacles are GFCI-protected with weatherproof covers</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Interior Systems Verification and Code Compliance</h3>
  <p>Interior inspection proceeds systematically through each room, evaluating all finishes, fixtures, and systems for completeness and code compliance. The CM verifies that all interior doors are properly hung, latched, and equipped with required hardware including passage locksets, privacy locksets in bathrooms and bedrooms, and proper strike plates ensuring secure closure. <strong>Door swing clearances are verified against code minimums, typically requiring doors to swing a full 90 degrees without obstruction and maintaining minimum clear opening widths of 32 inches for egress doors.</strong></p>
  
  <p>Wall and ceiling finishes are examined for proper installation, adequate fastening, appropriate texture application, and complete paint coverage. Common deficiencies include visible fastener heads (nail or screw pops), inadequate joint compound application at seams and corners, uneven texture application, inconsistent paint coverage particularly at color transitions, and damage from subsequent trades such as scratches from door installation or fixture mounting.</p>
  
  <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
    <p style="margin: 0;"><strong>⚠️ Flooring Installation Standards:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li><strong>Hardwood:</strong> Proper acclimation, appropriate fastening schedules, uniform finish application, proper transition strips</li>
      <li><strong>Tile:</strong> Consistent grout joint width (1/16" to 3/8"), complete grout fill, proper caulk at transitions, no lippage</li>
      <li><strong>Carpet:</strong> Proper stretching, secure tack strips, seams away from high-traffic areas, professional trim</li>
      <li><strong>LVP:</strong> Proper acclimation, secure installation, tight seam alignment, proper transition pieces</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Electrical System Completion Verification</h3>
  <p>Electrical system inspection encompasses verification of all rough and finish electrical work, confirming that installations comply with National Electrical Code requirements and approved electrical plans. The CM systematically tests every electrical device in the structure, including all receptacles, switches, light fixtures, appliances, and specialty systems such as doorbells, garage door openers, and security systems.</p>
  
  <p><strong>Receptacle testing employs a three-light tester or more sophisticated circuit analyzer</strong> to verify proper wiring configuration, adequate grounding, and correct polarity. GFCI protection is verified at all required locations including bathrooms, kitchens, garages, unfinished basements, crawl spaces, and all exterior receptacles. Each GFCI device is tested using the integral test button to confirm proper operation.</p>
  
  <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
    <p style="margin: 0;"><strong>🔌 Critical Safety Systems:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li><strong>AFCI Protection:</strong> Required for most habitable room circuits, verified through breaker labeling</li>
      <li><strong>Smoke Detectors:</strong> Required in each sleeping room, outside sleeping areas, and on each story</li>
      <li><strong>CO Detectors:</strong> Required near sleeping areas and on each level with fuel-burning appliances</li>
      <li><strong>Interconnection:</strong> All detectors must be interconnected with hardwiring and battery backup</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Mechanical System Function Verification</h3>
  <p>Mechanical system inspection verifies proper installation and operation of all heating, ventilation, and air conditioning (HVAC) equipment, ventilation systems, and combustion appliance venting. The CM operates heating and cooling systems through multiple cycles, verifying that equipment starts properly, runs continuously without unusual noises or vibrations, achieves designed temperature differentials, and cycles off properly upon reaching thermostat setpoint.</p>
  
  <p>Airflow from all supply registers is evaluated qualitatively by hand, ensuring adequate velocity and volume indicating proper duct sizing and minimal leakage. Return air pathways are verified as unobstructed and properly sized to prevent system air starvation.</p>
  
  <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
    <p style="margin: 0;"><strong>⚠️ Combustion Appliance Safety:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li>Proper combustion air supply sized to fuel consumption rates</li>
      <li>Appropriate venting material selection (Type B or stainless steel)</li>
      <li>Proper vent termination with required clearances</li>
      <li>Draft testing for adequate exhaust pressure (-0.02 to -0.04 inches WC)</li>
      <li>CO testing to confirm absence of spillage</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Plumbing System Testing and Verification</h3>
  <p>Plumbing system verification encompasses complete testing of all water supply, drainage, and gas piping systems. The CM operates every plumbing fixture verifying proper operation, adequate flow rates, proper drainage without gurgling or slow clearing, and absence of leaks at supply connections, drain connections, and fixture bodies.</p>
  
  <p><strong>Water pressure testing using a simple pressure gauge</strong> attached to a hose bibb or laundry connection verifies that static pressure falls within the acceptable range of 40 to 80 psi, with pressure exceeding 80 psi requiring installation of a pressure-reducing valve to protect fixtures and prevent premature failure. Flow testing of multiple simultaneous fixtures identifies inadequate supply line sizing manifesting as pressure drop during concurrent use.</p>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Safety Systems and Code-Required Elements</h3>
  <p>The CM verifies installation and operation of all life safety systems including smoke detectors, carbon monoxide detectors, fire extinguishers in required locations, emergency escape and rescue openings (egress windows) in sleeping rooms, proper handrail and guardrail installation meeting height and strength requirements, and tempered glass in all required locations near doors, bathtubs, showers, and stairs.</p>
  
  <p>Egress window testing verifies compliance with minimum opening dimensions (typically 5.7 square feet opening area with minimum 20-inch width and 24-inch height), maximum sill height above floor (typically 44 inches), and proper operation without requiring tools, keys, or special knowledge. Wells serving below-grade egress windows must provide minimum dimensions (typically 36 inches perpendicular to wall) and incorporate permanent ladder or steps when well depth exceeds 44 inches.</p>
</div>

<div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 30px;">
  <h2 style="color: #f5576c; margin-top: 0;">🔍 Municipal Final Building Inspection Process</h2>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Inspector Evaluation Methodology and Scope</h3>
  <p>The municipal final building inspection represents the regulatory authority's comprehensive verification that construction work complies with all adopted building codes, approved construction documents, and issued permits. The building inspector conducting this evaluation operates under legal authority granted by local ordinances, evaluating construction work against minimum safety standards established to protect public health, safety, and welfare.</p>
  
  <p>Inspector evaluation methodology typically follows a systematic progression examining each major building system (foundation, framing, electrical, mechanical, plumbing) and verifying critical code compliance points within each system. <strong>The inspector focuses evaluation on items affecting safety, health, and code compliance</strong> rather than aesthetic quality or workmanship standards exceeding code minimums.</p>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Code Compliance Verification Standards</h3>
  <p>Code compliance verification encompasses multiple code documents typically including the International Residential Code (IRC) or International Building Code (IBC), National Electrical Code (NEC), International Mechanical Code (IMC), International Plumbing Code (IPC), International Energy Conservation Code (IECC), and locally-adopted amendments or more stringent requirements.</p>
  
  <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
    <p style="margin: 0;"><strong>📋 Critical Code Verification Points:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li><strong>Structural:</strong> Proper beam and header sizing, adequate fastening schedules, lateral bracing</li>
      <li><strong>Egress:</strong> Minimum door widths, proper swing directions, emergency escape windows</li>
      <li><strong>Stairs:</strong> Proper riser/tread dimensions, handrail/guardrail height and strength</li>
      <li><strong>Electrical:</strong> GFCI/AFCI protection, proper grounding, smoke detector interconnection</li>
      <li><strong>Mechanical:</strong> Proper venting, combustion air supply, energy code compliance</li>
      <li><strong>Plumbing:</strong> Proper venting, trap installation, backflow prevention</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Common Final Inspection Deficiencies and Corrections</h3>
  <p>Despite rigorous pre-final inspections, certain deficiencies commonly emerge during final building inspections due to inspector interpretation variations, code provision ambiguity, or items inadvertently overlooked during internal review. Understanding these common deficiency patterns allows proactive correction before formal inspection, minimizing schedule delays and re-inspection fees.</p>
  
  <div style="background: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
    <p style="margin: 0;"><strong>🔧 Frequently Cited Deficiencies:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li>Missing or improperly installed smoke/CO detectors</li>
      <li>Incomplete GFCI/AFCI protection coverage</li>
      <li>Handrail/guardrail non-compliance (height, graspability, strength)</li>
      <li>Tempered glass not installed in required locations</li>
      <li>Egress window operation or dimension deficiencies</li>
      <li>Missing address numbers or improper size/visibility</li>
      <li>Incomplete weatherproofing at penetrations</li>
      <li>Energy code documentation not provided</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Conditional Approvals and Temporary Occupancy</h3>
  <p>Building departments occasionally issue conditional approvals or Temporary Certificates of Occupancy (TCO) allowing occupancy while minor outstanding items are completed during a defined period, <strong>typically 30 to 90 days</strong>. TCO issuance requires that all life-safety systems are complete and operational, all major building systems are substantially complete, and only minor cosmetic or non-critical work remains incomplete.</p>
  
  <p>Items acceptable for TCO deferral typically include minor exterior work weather-dependent (final grading, landscaping, driveway paving), punch list corrections not affecting safety or habitability, final cleanup and debris removal, and non-critical finish details. Items generally not acceptable for TCO deferral include life safety system deficiencies, major mechanical system problems, plumbing system leaks or malfunction, electrical system hazards, and structural deficiencies.</p>
</div>

<div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 30px;">
  <h2 style="color: #f5576c; margin-top: 0;">📋 Certificate of Occupancy: Legal Authorization for Occupancy</h2>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Regulatory Authority and Legal Significance</h3>
  <p>The Certificate of Occupancy (CO) represents the building department's official certification that construction work has been completed in substantial compliance with approved plans and adopted building codes, and that the structure is suitable for its intended occupancy classification. <strong>The CO carries significant legal implications</strong> as most jurisdictions prohibit building occupancy before CO issuance, with violations potentially resulting in fines, utility service disconnection, insurance coverage invalidation, and legal liability in the event of injury or property damage.</p>
  
  <p>The CO also serves critical functions in real estate transactions, with lenders typically requiring CO verification before closing and issuing mortgage proceeds, title companies requiring CO confirmation before issuing title insurance policies, and local governments requiring CO documentation before establishing utility services and tax assessments. Missing or invalid CO documentation can complicate or prevent property sale, refinancing, or occupancy permit transfers.</p>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Obtaining Certificate of Occupancy Documentation</h3>
  <p>CO issuance procedures vary among jurisdictions but typically require the construction manager or property owner to submit a formal CO application following successful final inspection, pay required CO issuance fees (typically $50 to $200 depending on jurisdiction and project size), provide required documentation including approved energy code compliance forms and signed affidavits, and allow the building department processing time (typically 3 to 10 business days) for certificate preparation and issuance.</p>
  
  <p>The issued CO document typically includes:</p>
  <ul>
    <li>Property address and legal description</li>
    <li>Permit numbers associated with construction</li>
    <li>Occupancy classification (residential single-family, multi-family, commercial, etc.)</li>
    <li>Allowable occupant load for non-residential buildings</li>
    <li>Special conditions or restrictions on occupancy</li>
    <li>Inspection date and inspector identification</li>
    <li>Building official signature and seal</li>
  </ul>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Special Occupancy Conditions and Restrictions</h3>
  <p>COs may include special conditions or restrictions limiting occupancy scope or duration. Temporary COs, discussed previously, limit occupancy duration while minor work is completed. Partial COs allow occupancy of completed building portions while work continues in other areas, common in phased construction or when shell space will be finished later by tenants.</p>
  
  <p>Conditional COs may impose restrictions such as occupant limits pending completion of additional parking or egress facilities, prohibited uses until specific systems are upgraded or added, or special maintenance or monitoring requirements for experimental building systems or materials requiring performance validation.</p>
</div>

<div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 30px;">
  <h2 style="color: #f5576c; margin-top: 0;">🏠 Homeowner Orientation and System Instruction</h2>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Systematic Orientation Session Structure</h3>
  <p>The homeowner orientation represents the construction manager's formal education session where building systems, equipment operation, maintenance requirements, and warranty provisions are explained to the property owner. <strong>Industry research indicates that comprehensive owner orientation significantly reduces warranty calls, improves owner satisfaction, and minimizes disputes during the warranty period.</strong></p>
  
  <p>Effective orientation sessions typically require <strong>2 to 4 hours</strong> depending on building complexity, with the CM systematically progressing through the structure room by room demonstrating equipment operation and explaining maintenance procedures. The orientation is ideally scheduled shortly before or immediately following occupancy when owner attention is fully engaged and immediate system operation is necessary.</p>
  
  <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
    <p style="margin: 0;"><strong>✅ Best Practices for Orientation:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li>Provide written orientation checklist for owner to follow along</li>
      <li>Encourage questions and provide clear, non-technical explanations</li>
      <li>Demonstrate operation of all systems and equipment</li>
      <li>Provide emergency contact information and procedures</li>
      <li>Review warranty coverage and exclusions thoroughly</li>
      <li>Document attendance with signed acknowledgment</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Life Safety Systems and Emergency Procedures</h3>
  <p>Orientation begins with life safety systems due to their critical importance. The CM demonstrates smoke detector and carbon monoxide detector operation, testing devices using integral test buttons and explaining the importance of monthly testing, battery replacement procedures (for battery-backup units), and 10-year replacement cycles for hardwired units with sealed batteries.</p>
  
  <p><strong>Fire extinguisher operation is explained using the PASS acronym</strong> (Pull pin, Aim at base, Squeeze handle, Sweep side to side), with emphasis on appropriate use situations (small, contained fires) versus situations requiring immediate evacuation. The CM shows fire extinguisher locations, explains pressure gauge interpretation (green zone indicates proper charge), and discusses recommended replacement or recharge cycles.</p>
  
  <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
    <p style="margin: 0;"><strong>🚨 Critical Safety Information:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li>Emergency shutoff locations: electrical panel, gas meter, water main</li>
      <li>Egress window operation and emergency use procedures</li>
      <li>Carbon monoxide alarm response (immediate evacuation, call emergency services)</li>
      <li>Natural gas leak response (no electrical switches, immediate evacuation)</li>
      <li>Water leak response (shut main valve, contain water, contact emergency plumber)</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">HVAC System Operation and Maintenance</h3>
  <p>HVAC system instruction includes thermostat operation and programming, with step-by-step demonstration of heating and cooling mode selection, temperature adjustment, fan operation modes (auto versus continuous), and programmable thermostat schedule programming for energy efficiency. The CM explains appropriate temperature setpoints balancing comfort and efficiency (typically 68-72°F heating, 72-78°F cooling).</p>
  
  <p>Filter maintenance receives particular emphasis due to its critical importance for system efficiency and longevity. The CM demonstrates filter location access, proper filter orientation (noting airflow direction arrows), appropriate filter MERV ratings (typically MERV 8-11 for residential systems), and replacement schedules (monthly inspection with replacement every 1-3 months depending on conditions).</p>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Plumbing System Operation and Maintenance</h3>
  <p>Plumbing system instruction covers fixture operation, water heater settings and maintenance, and preventive maintenance procedures. The CM demonstrates proper toilet operation emphasizing water-conserving flush technology, shows shut-off valve locations at each fixture enabling emergency water isolation, and explains proper garbage disposal operation including running cold water during use and avoiding problematic materials (grease, fibrous vegetables, coffee grounds).</p>
  
  <p><strong>Water heater instruction includes temperature setting verification</strong> (typically 120°F balancing safety and efficiency), temperature-pressure relief (TPR) valve operation and annual testing requirements, drain valve location and sediment flushing procedures (annually), and anode rod inspection and replacement (every 3-5 years) for traditional tank-type heaters. For tankless water heaters, the CM explains descaling requirements and recommended service intervals based on water hardness.</p>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Electrical System Components and Safety</h3>
  <p>Electrical system instruction focuses on electrical panel operation, circuit breaker identification and resetting, GFCI/AFCI device testing and resetting, and appropriate electrical safety practices. The CM reviews the panel circuit directory verifying accurate labeling, demonstrates proper breaker resetting procedures following trips (turn fully off before turning back on), and explains the difference between tripping indicating overload or fault versus frequent tripping suggesting electrical problems requiring professional evaluation.</p>
  
  <p>GFCI device operation is demonstrated by pressing the "Test" button causing power interruption, then pressing "Reset" to restore power. The CM emphasizes monthly testing importance and explains that GFCI protection extends to all downstream devices on protected circuits. AFCI device testing occurs at the circuit breaker using the integral test button, with similar monthly testing recommendations.</p>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Appliance Operation and Care</h3>
  <p>Appliance instruction covers all installed equipment including range/oven operation, refrigerator temperature setting and ice maker operation, dishwasher loading and detergent recommendations, microwave operation and safety features, washer and dryer operation including appropriate cycles and settings, and any specialty appliances such as wine refrigerators, warming drawers, or built-in coffee systems.</p>
  
  <p>The CM provides manufacturer literature for all appliances, ensuring owners have access to detailed operating instructions, maintenance schedules, and warranty information. Particular attention is given to appliances with specific maintenance requirements such as refrigerator coil cleaning (every 6 months), range hood filter cleaning (monthly), and dryer lint trap cleaning (after every load) and vent cleaning (annually).</p>
</div>

<div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 30px;">
  <h2 style="color: #f5576c; margin-top: 0;">📄 Project Closeout Documentation and Financial Reconciliation</h2>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Comprehensive Lien Release Procurement</h3>
  <p>Lien release procurement represents a critical closeout activity protecting property owners from contractor or supplier claims after project completion and payment. <strong>Mechanics' liens or construction liens</strong> allow contractors and material suppliers who improve real property to file claims against that property if payment is not received, potentially preventing property sale or refinancing and requiring expensive legal action for resolution.</p>
  
  <p>The construction manager implements systematic lien release procedures requiring signed lien waivers from all contractors and major material suppliers before final payment release. Two types of lien waivers are typically used:</p>
  
  <ul>
    <li><strong>Conditional Lien Waiver:</strong> Releases lien rights upon receipt of payment (check clearance)</li>
    <li><strong>Unconditional Lien Waiver:</strong> Immediately releases lien rights (used when payment has cleared)</li>
  </ul>
  
  <p>Best practice requires conditional waivers submitted with final payment applications, converting to unconditional waivers after payment verification. The CM maintains a comprehensive lien waiver log tracking all required releases and their receipt status, refusing final payment disbursement until all required waivers are received.</p>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">As-Built Documentation Preparation and Delivery</h3>
  <p>As-built documentation, also called record drawings, documents the building as actually constructed rather than as originally designed. This documentation proves invaluable for future renovation, addition, repair, or maintenance work by providing accurate information on structural member locations, mechanical and electrical system routing, and equipment specifications.</p>
  
  <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
    <p style="margin: 0;"><strong>📐 As-Built Documentation Components:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li>Marked-up construction drawings showing field changes</li>
      <li>Underground utility location documentation</li>
      <li>Concealed structural member locations and sizes</li>
      <li>Final grading and drainage plans</li>
      <li>Equipment specifications and installation details</li>
      <li>Material supplier and product information</li>
      <li>Paint colors and finish specifications</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Warranty Documentation Compilation and Transfer</h3>
  <p>Warranty documentation compilation involves collecting all manufacturer warranties, workmanship warranties, and extended warranty documents, organizing these into a comprehensive warranty book or binder, and transferring this to the property owner with clear explanation of coverage scope and procedures for making claims.</p>
  
  <p><strong>Typical warranty coverage includes:</strong></p>
  <ul>
    <li><strong>Manufacturer Warranties:</strong> Appliances (1-year parts/labor, extended coverage available), HVAC equipment (5-10 years parts, 1 year labor), water heater (6-12 years tank), roofing materials (20-50 years prorated)</li>
    <li><strong>Contractor Workmanship Warranties:</strong> Typically 1-2 years covering defects in materials or workmanship</li>
    <li><strong>Structural Warranties:</strong> 10 years covering major structural defects in some jurisdictions</li>
    <li><strong>Special System Warranties:</strong> Foundation waterproofing (10+ years), termite treatment (various terms)</li>
  </ul>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Operations and Maintenance Manual Compilation</h3>
  <p>The Operations and Maintenance (O&M) manual provides comprehensive information on all building systems, equipment operation procedures, routine maintenance requirements, and troubleshooting guidance. While O&M manuals are standard requirements for commercial construction, residential projects increasingly provide similar documentation improving owner understanding and building performance.</p>
  
  <p>O&M manual contents typically include equipment cut sheets and specifications, operation instructions, maintenance schedules and procedures, warranty information, service contractor contact information, emergency procedures, and system diagrams showing component locations.</p>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Financial Closeout and Final Payment Processing</h3>
  <p>Financial closeout encompasses comprehensive review of all project costs, verification that all contractor and supplier invoices have been received and paid, reconciliation of actual costs against budgets or contract amounts, preparation of final change order summaries, and processing of final payment to contractors or final draw from construction lenders.</p>
  
  <p>The construction manager prepares detailed cost reports showing budgeted costs, actual costs, and variances for all major cost categories. For cost-plus contracts, this documentation supports final accounting to owners. For lump-sum contracts, it provides final change order accounting and justification. <strong>Final payment typically occurs 30 to 60 days after substantial completion</strong> allowing time for lien waiver collection and resolution of any punch list items.</p>
</div>

<div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 30px;">
  <h2 style="color: #f5576c; margin-top: 0;">🔑 Project Handover and Post-Occupancy Responsibilities</h2>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Formal Handover Procedures and Key Transfer</h3>
  <p>The formal project handover represents the ceremonial and legal transfer of project responsibility from the construction manager to the property owner. This event typically coincides with final payment processing and owner occupancy commencement. The handover includes physical key transfer for all locks and access devices, transfer of all documentation including warranties, manuals, permits, and as-built drawings, execution of final acceptance documents or completion certificates, and formal release of construction manager's project obligations except for warranty service.</p>
  
  <p>Key management requires careful coordination ensuring all keys are properly tagged and organized, master key systems are properly documented with appropriate security measures, access codes for electronic locks, garage door openers, and security systems are provided, and spare keys are identified and delivered. Some construction managers implement formal key tracking systems requiring signed receipts documenting key transfer and establishing accountability.</p>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Punch List Management and Completion Verification</h3>
  <p>Punch list management continues post-occupancy as the construction manager coordinates completion of remaining minor items identified during final walkthrough or subsequent owner move-in. Effective punch list management requires systematic tracking of all open items, assignment of each item to responsible contractors, scheduling of correction work minimizing owner disruption, verification of completed work quality, and formal owner sign-off confirming satisfactory completion.</p>
  
  <p>Digital punch list management tools increasingly replace paper systems, providing photograph attachment capability, automated contractor notification, real-time status tracking, and historical documentation of all punch list items from identification through completion. These systems improve accountability, reduce administrative burden, and provide clear documentation protecting all parties.</p>
  
  <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
    <p style="margin: 0;"><strong>📋 Punch List Best Practices:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li>Prioritize items by criticality (safety, functionality, cosmetic)</li>
      <li>Establish reasonable completion deadlines</li>
      <li>Schedule work to minimize owner disruption</li>
      <li>Verify quality before signing off</li>
      <li>Maintain clear documentation of all items</li>
      <li>Communicate progress regularly to all parties</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Warranty Service Procedures and Response Protocols</h3>
  <p>Warranty service procedures establish protocols for owners to report defects, for the construction manager to evaluate claims and assign corrective work, and for contractors to respond to warranty calls. <strong>Clear warranty procedures minimize disputes and ensure prompt defect correction maintaining owner satisfaction.</strong></p>
  
  <p>Effective warranty service systems typically include multiple communication channels (phone, email, online portal) for owners to submit warranty requests, defined response time commitments for different claim types, protocols distinguishing emergency versus routine warranty items, and systematic documentation of all warranty claims and resolutions.</p>
  
  <p>Emergency warranty items (flooding, sewage backup, heating system failure in winter, electrical hazards) typically require same-day response with contractor representative available 24/7 through emergency contact numbers. Non-emergency warranty items are addressed through scheduled service appointments where individual trades visit to evaluate and correct reported deficiencies.</p>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Owner Maintenance Education and Responsibility Transfer</h3>
  <p>Successful long-term building performance depends critically on proper owner maintenance following construction completion. The CM provides comprehensive guidance on owner maintenance responsibilities distinguishing between tasks owners can competently perform versus those requiring professional service. <strong>Written maintenance schedules organized chronologically</strong> (monthly, quarterly, seasonal, annual tasks) help owners maintain systematic upkeep preventing deterioration from neglect.</p>
  
  <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
    <p style="margin: 0;"><strong>🗓 Maintenance Schedule Overview:</strong></p>
    <ul style="margin: 10px 0 0 0; padding-left: 20px;">
      <li><strong>Monthly:</strong> HVAC filter check, GFCI/AFCI testing, disposal cleaning, leak inspection</li>
      <li><strong>Quarterly:</strong> Refrigerator coil cleaning, hood filter cleaning, detector testing, caulk inspection</li>
      <li><strong>Seasonal:</strong> HVAC service, gutter cleaning, roof inspection, winterization</li>
      <li><strong>Annual:</strong> Professional HVAC service, water heater maintenance, humidifier service, septic pumping</li>
    </ul>
  </div>
  
  <h3 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Long-Term Support and Professional Development</h3>
  <p>Professional construction managers recognize that project relationships extend beyond formal completion dates, with long-term support and accessibility contributing to client satisfaction and generating referrals and repeat business. The CM maintains contact information currency, promptly responding to post-warranty questions or concerns, providing referrals to qualified service contractors, and offering guidance on renovation or addition projects.</p>
  
  <p>Many successful builders implement systematic follow-up programs including <strong>six-month post-occupancy contact</strong> verifying satisfaction, <strong>one-year anniversary contact</strong> timing warranty expiration, and <strong>periodic newsletters</strong> providing maintenance tips and seasonal reminders. These contacts maintain relationships that generate referrals and create opportunities for future projects.</p>
</div>

<div style="background: #fee2e2; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
  <h2 style="margin: 0 0 20px 0; color: black; font-weight: bold;">🎓 Conclusion: Professional Excellence Through Thorough Closeout</h2>
  <p style="font-size: 1.05em; line-height: 1.8; margin: 0; color: black;">The final walkthrough and project handover phase represents the culminating demonstration of construction management professionalism, technical competence, and client service commitment. Success during this critical period requires meticulous attention to detail ensuring all work is truly complete and code-compliant, comprehensive education empowering owners to successfully operate and maintain their investment, thorough documentation protecting all parties' interests and providing resources for long-term building stewardship, and genuine commitment to post-occupancy support extending beyond contractual obligations.</p>
  
  <p style="font-size: 1.05em; line-height: 1.8; margin: 20px 0 0 0; color: black;"><strong>Projects completed with rigorous closeout procedures realize numerous benefits including enhanced owner satisfaction, reduced warranty claims resulting from proper owner education and maintenance, minimized legal exposure through comprehensive documentation and lien releases, and improved professional reputation generating referrals and repeat business.</strong></p>
  
  <p style="font-size: 1.05em; line-height: 1.8; margin: 20px 0 0 0; color: black;">The fundamental principle guiding all closeout activities is that project success is measured not merely by achieving Certificate of Occupancy issuance but by delivering a complete, fully functional building to a thoroughly educated owner who possesses all necessary information and documentation for successful long-term building operation. This comprehensive approach distinguishes exceptional construction professionals from those who consider their obligations satisfied upon final inspection approval and payment receipt.</p>
</div>

</div>
`;

async function updateModule10() {
  try {
    const module10 = await prisma.module.findFirst({
      where: { moduleNumber: 10 }
    });

    if (!module10) {
      console.error('Module 10 not found');
      return;
    }

    console.log('Updating Module 10 with new styling...');
    console.log('Current content length:', module10.content.length);
    console.log('New content length:', newContent.length);

    await prisma.module.update({
      where: { id: module10.id },
      data: {
        content: newContent
      }
    });

    console.log('✅ Module 10 updated successfully with new styling!');
    console.log('\nStyling changes applied:');
    console.log('- Title section: White card with bold black text');
    console.log('- Learning Objectives: Pale green (#BEFFD1) background');
    console.log('- Main content: White cards (preserved)');
    console.log('- Conclusion: Rose-50 background (matching Key Takeaways)');
    
  } catch (error) {
    console.error('Error updating Module 10:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateModule10();
