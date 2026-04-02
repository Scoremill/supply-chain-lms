import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const newContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Module 9: Final Finishes & Pre-Occupancy Preparation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .module-container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            border-bottom: 4px solid #3498db;
            padding-bottom: 15px;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        h2 {
            color: #2980b9;
            margin-top: 40px;
            margin-bottom: 20px;
            font-size: 1.8em;
            border-left: 5px solid #3498db;
            padding-left: 15px;
        }
        h3 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.4em;
        }
        h4 {
            color: #555;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 1.1em;
        }
        .learning-objectives {
            background-color: #e8f4f8;
            border-left: 5px solid #3498db;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .learning-objectives h2 {
            margin-top: 0;
            border: none;
            padding-left: 0;
        }
        .learning-objectives ul {
            margin: 15px 0;
            padding-left: 25px;
        }
        .learning-objectives li {
            margin: 10px 0;
            font-weight: 500;
        }
        .overview-section {
            background-color: #fff8e1;
            border-left: 5px solid #ffa726;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .overview-section h2 {
            margin-top: 0;
            color: #f57c00;
            border: none;
            padding-left: 0;
        }
        p {
            margin: 15px 0;
            text-align: justify;
        }
        ul, ol {
            margin: 15px 0;
            padding-left: 30px;
        }
        li {
            margin: 8px 0;
        }
        .note {
            background-color: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .warning {
            background-color: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .critical {
            background-color: #ffebee;
            border-left: 4px solid #f44336;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .best-practice {
            background-color: #f1f8e9;
            border-left: 4px solid #8bc34a;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        strong {
            color: #2c3e50;
        }
        .section-icon {
            font-size: 1.5em;
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="module-container">
        <h1>Module 9: Final Finishes & Pre-Occupancy Preparation</h1>
        <p><strong>Advanced Construction Management and Quality Assurance Practice</strong></p>

        <div class="learning-objectives">
            <h2>Learning Objectives</h2>
            <ul>
                <li>Master appliance installation protocols including utility connection verification, manufacturer-specified clearance requirements, and comprehensive operational testing procedures in accordance with NFPA 70 (National Electrical Code) and manufacturer warranty stipulations.</li>
                <li>Understand architectural hardware installation standards including ANSI/BHMA grading systems, proper strike plate alignment tolerances, security hardware keying hierarchies, and Americans with Disabilities Act (ADA) compliance requirements for operating forces and mounting heights.</li>
                <li>Implement systematic final paint correction methodologies including color verification protocols, sheen consistency evaluation, professional spray techniques for seamless touch-up, and quality standards meeting Master Painters Institute (MPI) specifications.</li>
                <li>Execute comprehensive construction cleaning procedures distinguishing between rough cleaning, final cleaning, and detail cleaning phases, including proper chemical selection for various substrate materials and OSHA-compliant waste disposal protocols.</li>
                <li>Develop and manage detailed punch list systems utilizing industry-standard categorization methods (critical, major, minor), establishing completion tracking protocols, and implementing quality verification procedures ensuring full contract compliance prior to substantial completion certification.</li>
            </ul>
        </div>

        <div class="overview-section">
            <h2>Overview: The Critical Transition to Occupancy</h2>
            <p>The final finishes and pre-occupancy preparation phase represents the culmination of all prior construction activities and marks the transition from an active construction site to a completed, habitable structure ready for owner occupancy. This stage is characterized by meticulous attention to aesthetic perfection, functional verification, and comprehensive quality assurance. Industry research indicates that approximately 60-70% of homeowner satisfaction ratings are directly influenced by the quality of work performed during this final phase, as cosmetic imperfections and operational deficiencies are immediately visible and impact the perceived value of the entire project.</p>
            
            <p>This phase requires a fundamental shift in site management approach, transitioning from high-volume material installation to precision craftsmanship and detailed quality control. The construction environment must be carefully controlled to prevent damage to finished surfaces, requiring strict enforcement of protective protocols and coordination of final trade activities to minimize conflicts and surface marking. The work involves systematic completion of all remaining installation tasks, comprehensive testing of all building systems, methodical correction of identified deficiencies, and thorough preparation of all surfaces for owner occupancy.</p>
            
            <p>Success in this phase demands exceptional organizational skills, comprehensive understanding of finish quality standards, systematic approach to deficiency identification and correction, and effective communication with all trade partners to ensure timely completion of remaining work. The Construction Manager must balance the urgency of meeting substantial completion deadlines against the requirement for meticulous quality verification, as premature certification of incomplete or deficient work creates significant legal liability and damages professional reputation.</p>
            
            <p>The final finishes phase establishes the lasting impression that owners, occupants, and visitors will form regarding construction quality. Research in behavioral psychology demonstrates that initial impressions formed within the first 90 seconds of experiencing a space create lasting perceptual frameworks that influence all subsequent evaluations. Therefore, investment in superior finish quality and presentation yields disproportionate returns in owner satisfaction, referral generation, and professional reputation enhancement.</p>
        </div>

        <h2><span class="section-icon">🏠</span>Appliance Installation and Commissioning</h2>
        
        <h3>Major Appliance Delivery Coordination</h3>
        <p>The appliance installation process begins with careful coordination of delivery scheduling to ensure all prerequisite construction activities have been completed and utility rough-in work has passed required inspections. Appliances represent significant capital investments, typically accounting for 3-5% of total residential construction costs, with premium appliance packages in luxury construction approaching $50,000 to $100,000 or more. Protection of this investment requires systematic verification of site readiness and careful handling during delivery and installation.</p>
        
        <p>Delivery coordination involves confirming access clearances throughout the delivery path from the street to the final installation location. Standard appliance delivery requires minimum 36-inch clear width through all doorways and passages, though larger commercial-style refrigerators and professional-grade ranges may require 42-inch or wider clearances. The Construction Manager must verify these clearances and arrange for temporary removal of doors, trim, or other obstructions that might impede delivery. In multi-story structures, elevator dimensions and weight capacity must be verified to accommodate appliance delivery, with stair delivery requiring specialized equipment and additional labor.</p>
        
        <div class="note">
            <strong>Delivery Best Practice:</strong> Appliance Receiving and Inspection Protocols - Upon delivery, each appliance undergoes systematic inspection before the delivery crew departs, as manufacturer warranty provisions typically exclude damage claims filed after delivery acceptance. The inspection protocol includes verification that the delivered model matches the specification documentation, complete review of exterior surfaces for shipping damage, testing of doors and operational components, and confirmation that all required accessories and installation hardware are included.
        </div>

        <h3>Refrigerator Installation and Commissioning</h3>
        <p>Refrigerator installation represents one of the more complex appliance installations due to water supply connections required for ice makers and water dispensers, and in some cases, dedicated electrical circuits for high-capacity models. Built-in refrigerator installation requires precise dimensional coordination between cabinet opening dimensions and appliance specifications, with typical tolerance of only ±1/8 inch for professional fit and finish.</p>
        
        <p>Water supply connection typically utilizes 1/4-inch copper tubing or braided stainless steel supply lines connected to a dedicated shut-off valve. The connection point should be readily accessible for future service, typically located in the cabinet space adjacent to the refrigerator or in the basement directly below the installation location. Many jurisdictions now prohibit the use of self-piercing saddle valves due to reliability concerns, requiring proper tee fittings with compression stop valves. All water connections must be pressure-tested before the refrigerator is positioned to prevent water damage from concealed leaks.</p>
        
        <p>Electrical connection for refrigerators requires a dedicated 115-volt, 15-amp circuit terminating in a grounded receptacle. The receptacle should be located to allow the refrigerator to be positioned without cord stress while maintaining adequate clearance for ventilation. Built-in models often require the receptacle to be positioned in adjacent cabinet space or recessed into the wall behind the unit. After positioning, the refrigerator should be releveled using adjustable feet, with verification using a precision level, as improper leveling affects door operation and can cause water leakage from ice makers.</p>

        <h3>Range and Cooktop Installation Standards</h3>
        <p>Gas range installation requires certified connection to the gas supply system by a licensed professional, as improper gas fitting installation creates serious safety hazards including fire and explosion risks. The gas connection utilizes a flexible gas connector (typically 3/8-inch diameter, 48 inches or less in length) with appropriate pressure testing after installation. Many jurisdictions require the installation to be inspected and approved by the gas utility company or municipal inspection authority before energization.</p>
        
        <p>Cooktop installation into countertops requires precise cutout dimensions provided by the manufacturer's installation instructions, with tolerances typically ±1/16 inch. The cutout is reinforced around the perimeter to prevent countertop deflection, and sealed with high-temperature silicone to prevent moisture penetration and provide additional support. Electrical requirements for electric cooktops typically include 240-volt, 40-amp or 50-amp dedicated circuits, while gas cooktops require both gas supply and 115-volt electrical service for electronic ignition systems.</p>
        
        <div class="warning">
            <strong>Safety Critical:</strong> Anti-tip devices must be installed for all freestanding ranges per manufacturer specifications and building code requirements. These devices prevent the range from tipping forward when loaded, which can occur when heavy cookware is placed on the open oven door. Installation verification should be documented photographically, as anti-tip device installation is increasingly subject to inspection enforcement and liability considerations in the event of injury.
        </div>

        <h3>Dishwasher Installation and Testing</h3>
        <p>Dishwasher installation requires coordination of water supply, electrical power, and drain connections within the typical 24-inch width cabinet opening. The installation includes securing the unit to the underside of the countertop using mounting brackets, ensuring the unit is level (both side-to-side and front-to-back), and verifying adequate clearance for door operation.</p>
        
        <p>Water supply connection typically utilizes a 3/8-inch supply line connected to a dedicated shut-off valve, with the valve located in the adjacent sink base cabinet for accessibility. Hot water supply is standard, with the dishwasher manufacturer specifying minimum supply temperature (typically 120°F minimum) for effective operation. The supply line must include an air gap device or high-loop configuration to prevent backflow of waste water into the potable water supply, as required by plumbing codes.</p>
        
        <p>Drain connection routes through the adjacent sink base cabinet to connect to the sink drain system, utilizing either an air gap fitting mounted through the countertop or sink deck (required in some jurisdictions) or a high-loop configuration where the drain hose is elevated above the flood level of the sink before descending to the drain connection. The drain hose must be secured to prevent sagging, which can allow standing water and create drainage problems.</p>
        
        <p>Electrical connection for dishwashers requires a dedicated 115-volt, 15-amp circuit. Connection is made using appropriate wire connectors and must be performed by a licensed electrician. After completion of all connections, the dishwasher should be operated through a complete cycle to verify proper operation, check for leaks, and ensure adequate drainage.</p>

        <h3>Microwave and Hood Installation</h3>
        <p>Over-the-range microwave installation serves dual purposes of microwave cooking and range exhaust ventilation. Installation requires secure mounting to wall framing and support from below using a mounting plate attached to the bottom of the upper cabinet. The manufacturer provides specific mounting templates and hardware, with installation typically requiring two people due to unit weight (60-80 pounds typical) and awkward positioning.</p>
        
        <p>Ventilation configuration can be either exterior-vented (preferred) or recirculating. Exterior venting requires ductwork routed through exterior walls or roof, utilizing smooth-wall metal duct with minimal elbows to maintain adequate airflow. Recirculating configurations use charcoal filters to clean air before returning it to the kitchen, requiring periodic filter replacement but avoiding the complexity and expense of exterior ductwork. Electrical connection requires a dedicated 115-volt, 15-amp circuit, with the receptacle typically located in the upper cabinet space above the microwave installation location.</p>

        <h3>Washer and Dryer Installation</h3>
        <p>Washing machine installation requires water supply connections (hot and cold), drain connection, and electrical power (typically 115-volt, 15-amp circuit for standard washers). Supply connections utilize braided stainless steel hoses connecting to quarter-turn shut-off valves. The washing machine drain utilizes a standpipe configuration with the drain hose inserted approximately 8 inches into the standpipe, which connects to a 2-inch drain line with proper venting per plumbing code requirements.</p>
        
        <p>Dryer installation requirements vary significantly between electric and gas units. Electric dryers require 240-volt, 30-amp power supply typically utilizing a NEMA 14-50R receptacle (4-wire) configuration with separate neutral and ground conductors as required by current National Electrical Code. Gas dryers require both gas supply connection and 115-volt electrical service for the motor and controls.</p>
        
        <p>Exhaust ductwork for dryers is critical for safety and performance. Building codes and manufacturer specifications require rigid or semi-rigid metal duct (flexible plastic or foil duct is prohibited due to fire hazard and airflow restriction). The duct should be as short as possible with minimal elbows, with typical maximum length of 25 feet for straight runs, reduced by 2.5 feet for each 45-degree elbow and 5 feet for each 90-degree elbow. The exterior termination must include a dampered vent cap to prevent backdrafts while allowing proper exhaust flow.</p>

        <h2><span class="section-icon">🔧</span>Architectural Hardware Installation and Adjustment</h2>
        
        <h3>Door Hardware Selection and Standards</h3>
        <p>Architectural hardware encompasses all mechanical devices used to operate, secure, and provide functionality to doors, cabinets, and other building components. Hardware selection must consider durability, security, aesthetic compatibility, and accessibility compliance. The Builders Hardware Manufacturers Association (BHMA), in conjunction with the American National Standards Institute (ANSI), has developed comprehensive testing standards classifying hardware into three grades: Grade 1 (heavy-duty commercial application), Grade 2 (residential and light commercial application), and Grade 3 (residential light-duty application).</p>
        
        <p>Grade distinctions reflect substantial differences in durability and performance. For locksets, Grade 1 requires survival of 2,000,000 operational cycles, Grade 2 requires 800,000 cycles, and Grade 3 testing of 200,000 cycles. For residential construction, Grade 2 hardware provides excellent service life and represents the recommended specification for primary entry doors and frequently-used interior passages, while secondary closet and utility room doors may adequately utilize Grade 3 hardware.</p>
        
        <p>Hardware finish selection must consider durability and maintenance characteristics in addition to aesthetic preferences. Mechanical finishes (US26D - brushed chrome, US32D - stainless steel) provide superior durability compared to coated or painted finishes. Premium architectural hardware utilizes physical vapor deposition (PVD) coating technology providing exceptional durability and resistance to wear, corrosion, and tarnishing, though at substantially higher cost compared to standard finishes.</p>

        <h3>Lockset Installation Procedures</h3>
        <p>Interior door hardware installation begins with proper preparation of door and frame, including boring for the lockset and strike preparation in the frame. Standard residential locksets utilize 2-1/8 inch diameter bore for the lockset body, with a 1-inch diameter bore for the latch mechanism, positioned at standard height of 36 inches from finished floor to center of lockset (ADA compliant height range is 34-48 inches).</p>
        
        <p>The boring operation requires precise perpendicularity to ensure proper lockset alignment and operation. Professional installers utilize boring jigs that guide the hole saw and maintain perpendicular alignment throughout the boring operation. The latch bore intersects the main lockset bore, requiring careful completion of the boring sequence to prevent tear-out or misalignment.</p>
        
        <p>Strike plate installation requires accurate positioning on the door frame to align precisely with the latch or deadbolt. The strike is mortised into the frame to sit flush with the frame surface, with the strike box recessed into the framing to receive the latch. Proper strike installation is critical for security and smooth operation - a misaligned strike causes difficult latching, premature wear, and reduced security. Professional installation utilizes shims behind the strike as necessary to achieve perfect alignment despite variations in frame installation.</p>
        
        <div class="best-practice">
            <strong>Security Best Practice:</strong> Deadbolt installation follows similar boring procedures with the deadbolt positioned above the lockset, typically with 5-1/2 inch spacing between centers. Deadbolt installation in exterior doors should include reinforcement of both the door and frame. Door reinforcement plates strengthen the area around the deadbolt, while frame reinforcement (strike box and extended strike plate secured with 3-inch screws penetrating wall framing) prevents frame failure during forced entry attempts.
        </div>

        <h3>Door Adjustment and Operation Verification</h3>
        <p>Following hardware installation, comprehensive door adjustment ensures proper operation including smooth swing motion, correct alignment with frame, proper latch engagement without binding, and appropriate closing speed and force. Door adjustment begins with verification of hinge installation, ensuring all screws are fully tightened and hinges are properly mortised.</p>
        
        <p>Doors that bind or fail to close properly typically require adjustment of hinge positions. Common issues include hinge-bound conditions (where the door edge contacts the hinge-side frame during closing) addressed by deepening hinge mortises slightly, and latch-side binding addressed by shimming hinges to shift the door position. Professional installers maintain sets of cardboard shims in various thicknesses for precise adjustment.</p>
        
        <p>ADA compliance requirements specify maximum operating force for door operation of 5 pounds force for exterior doors and 5 pounds for interior doors (with exceptions for fire-rated doors), measured at the latch side of the door. Verification of compliance requires use of a push-pull gauge, with adjustment accomplished through door closer adjustment (if applicable), hinge lubrication, and correction of any binding conditions.</p>

        <h3>Keying Systems and Master Key Hierarchies</h3>
        <p>Keying specifications should be provided to the hardware supplier early in the construction process to ensure all locksets are keyed according to the specified system. Residential construction typically utilizes simple keyed-alike systems where all exterior door locks operate with the same key, or more sophisticated systems with separate key control for different entry points.</p>
        
        <p>Master key systems provide hierarchical key control appropriate for rental properties, multi-unit buildings, or facilities requiring different access levels. A master key opens all locks in the system, while individual keys operate only their assigned lock. Grand master key systems add an additional hierarchy level, appropriate for large facilities with multiple buildings or zones. Professional keying system design requires careful planning to prevent compromise, as improper system design can create security vulnerabilities.</p>

        <h3>Cabinet Hardware Installation</h3>
        <p>Cabinet door and drawer hardware installation requires careful attention to consistent positioning across all cabinets, as variations in handle or knob positioning are immediately apparent and reduce user satisfaction. The installation begins with creating a hardware template from thin plywood or hardboard, with holes positioned according to the hardware specifications. This template ensures consistent positioning across all similar cabinet doors and drawers.</p>
        
        <p>For drawer pulls requiring two mounting screws, careful measurement ensures the pull mounting aligns with the drawer center. Vertical position on drawer fronts typically places hardware at the vertical center, or in the case of tall drawers, approximately 2-1/2 to 4 inches from the top edge for optimal ergonomics. Cabinet door handles are typically positioned near the edge opposite the hinges, with vertical positioning approximately 2-1/2 inches from the top or bottom edge of the door.</p>
        
        <div class="note">
            <strong>Installation Tip:</strong> Installation procedure includes verifying backing presence by probing with a thin drill bit before drilling the hardware mounting holes. Cabinet doors and drawer fronts should have adequate thickness (typically 5/8-inch minimum) to provide secure mounting. Longer mounting screws may be required to achieve adequate thread engagement, particularly with decorative door and drawer fronts that incorporate substantial profiles. Thread-locking compound, applied sparingly to mounting screws, prevents loosening due to repeated operational forces. All hardware should be verified for smooth operation and proper alignment before installation completion, as repairing misaligned or damaged hardware after installation completion requires significantly more time.
        </div>

        <h3>Accessory Hardware Installation</h3>
        <p>Bathroom accessory hardware includes towel bars, toilet paper holders, robe hooks, and similar items. Professional installation requires secure mounting into wall framing or substantial backing, as accessories subjected to loading (particularly grab bars which may be used for support despite not being rated for that purpose) can pull free from drywall-only mounting. Many contractors install solid blocking between studs at standard accessory mounting heights during framing to ensure secure mounting.</p>
        
        <p>Towel bar installation typically positions bars at 48 inches above finished floor (ADA compliant height range is 48 inches maximum for side grab bars). The bar should span between mounting brackets with 24-inch spacing typical. Mounting into wall studs or substantial backing is essential, as the leverage created by the bar span magnifies forces on the mounting points. Hollow wall anchors or toggle bolts provide adequate support only for very light-duty applications and should not be relied upon for primary bathroom hardware.</p>
        
        <p>Toilet paper holder installation follows similar backing requirements with standard mounting height of 26 inches from finished floor to the centerline of the holder, positioned 8-12 inches in front of the toilet bowl. Spring-loaded roller holders require proper tension adjustment to provide smooth paper dispensing while preventing free-spinning that wastes paper.</p>

        <h2><span class="section-icon">🎨</span>Final Paint Touch-Up and Quality Assurance</h2>
        
        <h3>Paint Touch-Up Strategy and Materials Management</h3>
        <p>Final paint touch-up represents the last opportunity to correct surface imperfections, installation damage, and quality deficiencies before owner occupancy. Touch-up work differs fundamentally from production painting, requiring meticulous attention to color matching, sheen consistency, and seamless blending with existing finish. Touch-up success depends critically on using paint from the same production batch (same manufacturer batch number) as the original application, as color variation between batches, even when mixed to identical formulas, can be visually perceptible.</p>
        
        <p>The Construction Manager should require the painting contractor to retain touch-up quantities from each color batch, typically one quart per color per room minimum, labeled with the room location and color designation. These touch-up containers should be stored in climate-controlled conditions, as temperature cycling and prolonged storage can alter paint properties. Touch-up paint should be thoroughly stirred before use, as pigment and binder separation occurs during storage, and application of improperly mixed paint results in color variation.</p>
        
        <p>Touch-up areas require surface preparation equivalent to original painting, including removal of dirt, dust, or other contamination using mild detergent solution and light abrasion with fine-grit sandpaper (220-grit) to promote adhesion. Glossy surfaces require light sanding or use of liquid deglosser to provide mechanical bond, as new paint adheres poorly to high-gloss surfaces. All sanding dust must be completely removed using tack cloths or vacuum with HEPA filtration to prevent contamination of the final paint film.</p>

        <h3>Color Verification and Sheen Consistency</h3>
        <p>Paint color verification involves systematic comparison of touch-up areas against adjacent finished surfaces under multiple lighting conditions, as color perception varies substantially with light source characteristics. Evaluation should include natural daylight, incandescent lighting, and fluorescent or LED lighting where applicable, as metamerism (the phenomenon where colors appear identical under one light source but different under another) can create apparent color mismatches even when paint is from identical batches.</p>
        
        <p>Sheen consistency represents an even more challenging aspect of touch-up work, as variations in application technique, surface porosity, or paint film thickness can create noticeable sheen differences even when using identical paint. Matte or flat sheens are most forgiving of touch-up, as low light reflection minimizes visibility of subtle differences. Satin, semi-gloss, and gloss sheens require exceptional application skill to achieve invisible touch-up, often necessitating feathering techniques where touch-up areas are blended into surrounding surfaces with gradually reduced paint film thickness at edges.</p>
        
        <p>Professional touch-up technique for critical areas involves applying paint beyond the actual damaged area, gradually feathering the edges, and when necessary, repainting entire wall sections from corner to corner to eliminate visible touch-up boundaries. This approach is particularly important for high-sheen finishes in prominent areas with strong sidelighting that accentuates subtle surface variations. The additional labor investment prevents costly callbacks and ensures owner satisfaction.</p>

        <h3>Spray Technique for Seamless Touch-Up</h3>
        <p>Spray application using airless sprayers, HVLP (High Volume Low Pressure) systems, or aerosol cans provides superior touch-up results compared to brush or roller application, particularly for larger touch-up areas and high-sheen finishes. Spray application deposits uniform paint film thickness without brush marks or roller texture, creating virtually invisible repairs when properly executed. The technique requires masking adjacent surfaces to prevent overspray contamination and proper ventilation to control solvent vapors.</p>
        
        <p>HVLP systems provide excellent control for touch-up work, producing less overspray than conventional spray guns while maintaining good transfer efficiency. The technique requires practice to develop proper spray pattern overlap, appropriate gun distance (typically 6-8 inches), and consistent movement speed. Multiple thin coats produce superior results compared to single heavy coats, which can create runs and sags requiring additional correction.</p>

        <h3>Quality Standards and Inspection Protocols</h3>
        <p>Quality standards for paint finishing are defined by various industry organizations including the Master Painters Institute (MPI) and the Painting and Decorating Contractors of America (PDCA). These standards define acceptable variation in color uniformity, sheen consistency, surface smoothness, and coverage completeness. Professional specifications reference these standards to establish clear quality expectations and provide objective evaluation criteria.</p>
        
        <p>The final paint inspection should be conducted using portable halogen or LED work lights positioned to create raking light across wall surfaces, as this lighting reveals surface imperfections, texture variations, and sheen inconsistencies that may not be apparent under overhead lighting. Inspection should occur in each room from multiple viewing angles, as defects visible from one position may not be apparent from others.</p>

        <div class="warning">
            <strong>Final Verification:</strong> Paint Warranty Documentation and Homeowner Education - Paint manufacturers typically provide product warranties ranging from limited lifetime coverage for premium products to 10-15 year warranties for standard grades. These warranties generally cover failure of the paint film to perform as specified (peeling, blistering, fading) but exclude failures resulting from improper surface preparation, application, or substrate problems. The Construction Manager should provide homeowners with warranty documentation and basic maintenance instructions including appropriate cleaning methods, recommended touch-up procedures, and indication of normal vs. warrantable paint failures.
        </div>

        <h2><span class="section-icon">🧹</span>Construction Cleaning Protocols and Standards</h2>
        
        <h3>Cleaning Phase Distinction and Sequencing</h3>
        <p>Construction cleaning divides into three distinct phases, each with different objectives, techniques, and timing within the construction sequence. Rough cleaning occurs continuously throughout construction and focuses on removal of substantial debris and material waste to maintain safe working conditions and facilitate ongoing work. Final cleaning represents the first comprehensive cleaning of all surfaces after construction completion, removing accumulated dust, construction residue, and preparing surfaces for detail cleaning. Detail cleaning follows final cleaning and addresses remaining contamination, removes protective films and labels, and brings all surfaces to owner-occupancy standards.</p>
        
        <p>Rough cleaning is typically the responsibility of each trade contractor for their work area, with the general contractor providing centralized debris collection and disposal. This cleaning should occur at the completion of each construction phase before subsequent work begins, as cleaning between phases prevents accumulation of excessive debris and reduces the difficulty of final cleaning operations. Standard practice includes daily cleanup of tools and materials, sweeping of work areas, and regular removal of accumulated debris to designated collection points.</p>
        
        <p>Final cleaning begins only after all construction activities have been substantially completed, as cleaning before completion of all work results in immediate recontamination. This cleaning addresses all accessible surfaces including floors, walls, ceilings, windows, fixtures, and equipment. The work typically requires specialized cleaning professionals rather than construction personnel, as the techniques and standards differ substantially from construction cleanup activities.</p>

        <h3>Surface-Specific Cleaning Protocols</h3>
        <p>Different substrate materials require specific cleaning approaches using appropriate chemicals and techniques to achieve satisfactory results without surface damage. The Construction Manager must ensure cleaning personnel understand material characteristics and select appropriate cleaning methods, as improper chemical selection can cause permanent damage including etching, discoloration, or degradation of protective finishes.</p>
        
        <p>Hardwood flooring cleaning requires special attention to avoid water damage and finish degradation. Cleaning typically involves dry microfiber dust mopping to remove particulate contamination, followed by damp mopping using minimal water and pH-neutral wood floor cleaner. Excess water application causes finish clouding, wood swelling, and potential cupping or warping. New floor finishes (particularly water-based polyurethanes) require cure time before wet cleaning; manufacturer recommendations typically specify 2-4 weeks minimum cure time.</p>
        
        <p>Tile and stone surfaces tolerate more aggressive cleaning but require appropriate chemical selection based on material type. Natural stone (granite, marble, limestone, travertine) is vulnerable to acid damage requiring pH-neutral or slightly alkaline cleaners (pH 8-10). Acidic cleaners (including common products containing vinegar or citric acid) can etch calcium-based stones creating dull surface appearance. Glazed ceramic and porcelain tiles are more tolerant of various cleaners but grout requires special consideration as most grout types are also vulnerable to acidic attack.</p>
        
        <p>Glass and mirror cleaning to professional standards requires systematic technique and appropriate cleaning solutions. Professional cleaners generally avoid ammonia-based cleaners which can create streaking in certain conditions. The solution is applied using a sponge or microfiber cloth applicator, scrubbed to loosen and suspend dirt, and excess liquid removed with a rubber-bladed squeegee using overlapping horizontal or vertical strokes, with the blade wiped clean after each pass to prevent redeposition of dirt.</p>
        
        <p>Carpet cleaning in new construction focuses on removal of construction dust and debris rather than stain removal typically required in maintenance cleaning. The process typically begins with thorough vacuuming using commercial equipment with HEPA filtration to prevent dust redistribution. Following vacuum cleaning, low-moisture encapsulation cleaning provides effective soil removal without the excessive water application and extended drying time associated with traditional steam cleaning methods.</p>

        <h3>Sticker and Label Removal Procedures</h3>
        <p>Removal of manufacturer labels, UL listings, and other adhesive markings from appliances, fixtures, windows, and equipment represents a time-consuming but critical aspect of detail cleaning. Many adhesive products leave residue requiring specific removal techniques to avoid damage to finished surfaces. The safest removal approach utilizes heat application (hair dryer or heat gun on low setting) to soften adhesive, allowing mechanical removal with plastic scrapers that won't scratch surfaces.</p>
        
        <p>Residual adhesive often requires chemical removal using appropriate solvents. Commercial adhesive removers formulated for safe use on various surfaces are preferred over general solvents (acetone, mineral spirits) which may damage some finishes. The adhesive remover is applied to saturate the residue, allowed to penetrate for the manufacturer-specified dwell time, then wiped away along with the dissolved adhesive. Surfaces should be cleaned after adhesive removal to eliminate any remaining residue.</p>

        <h3>Window and Glass Cleaning to Professional Standards</h3>
        <p>Window cleaning to professional standards requires systematic approach ensuring complete cleaning of glass, frames, sills, and tracks while avoiding contamination of surrounding surfaces. Professional window cleaners typically use simple solutions of water with small amounts of dish soap or specialized window cleaning concentrates, avoiding ammonia-based cleaners that can create streaking in certain conditions. The solution is applied using a sponge or microfiber cloth applicator, scrubbed to loosen and suspend dirt, and excess liquid removed with a rubber-bladed squeegee using overlapping horizontal or vertical strokes, with the blade wiped clean after each pass to prevent redeposition of dirt.</p>
        
        <p>Exterior window cleaning requires attention to frames, sills, and removal of construction debris from tracks and weep holes. Window tracks should be vacuumed to remove accumulated dirt and construction debris, then cleaned with damp cloth. Weep holes (small openings in the bottom of window frames that allow water drainage) must be verified clear and unobstructed, as blocked weep holes cause water intrusion and potential structural damage.</p>
        
        <div class="critical">
            <strong>Safety Critical:</strong> Safety considerations for window cleaning include proper ladder setup and stabilization, fall protection when working at heights above 6 feet, and weather evaluation as wind and precipitation create hazardous conditions. Professional cleaning contractors carry liability insurance and workers compensation coverage protecting against injury and property damage claims, important considerations when selecting service providers.
        </div>

        <h3>HVAC System Cleaning and Filter Installation</h3>
        <p>HVAC system cleaning addresses construction dust accumulation in ductwork, air handlers, and on supply/return grilles. Construction dust presents particular challenges as it includes fine particulates from drywall sanding, sawdust, insulation fibers, and other contaminants that distribute throughout the duct system during construction. Thorough system cleaning typically requires professional duct cleaning using truck-mounted vacuum systems with sufficient capacity to create negative pressure throughout the duct system while agitating dust deposits.</p>
        
        <p>Air handler cleaning includes replacement of any construction filters used for protection during construction with the permanent operating filters specified for the system. Many HVAC contractors install low-cost filters during construction to protect equipment while allowing adequate airflow despite dust loading, then replace these with higher-efficiency filters appropriate for occupancy. The air handler interior surfaces should be vacuumed to remove dust accumulation, with particular attention to the evaporator coil which can accumulate substantial dust despite filter protection.</p>

        <h3>OSHA Compliance in Construction Cleaning</h3>
        <p>Construction cleaning activities are subject to OSHA regulations protecting worker health and safety, particularly regarding chemical exposure, slip and fall hazards, and ergonomic risks. The Construction Manager must ensure cleaning contractors develop and implement site-specific safety plans addressing these hazards including proper chemical labeling and Safety Data Sheet access, appropriate personal protective equipment, electrical safety for powered equipment, and proper work practices to minimize musculoskeletal injury risks.</p>
        
        <p>Hazard communication requirements mandate that all cleaning chemicals be properly labeled with hazard warnings and that Safety Data Sheets be readily available to personnel. Workers must receive training in safe chemical usage, appropriate personal protective equipment, and emergency procedures before beginning work in unfamiliar environments. Cleaning activities in enclosed spaces require adequate ventilation to control chemical vapors and prevent accumulation to hazardous concentrations.</p>
        
        <p>Slip and fall prevention during wet cleaning requires use of warning signs, barriers, or physical barriers to prevent access to wet floor areas until surfaces have dried. Work should be scheduled to minimize conflict with other ongoing activities and avoid creating hazards during peak traffic periods. Ground fault circuit interrupter (GFCI) protection is required for all electrical tools and equipment used in wet environments.</p>

        <h2><span class="section-icon">📋</span>Construction Manager Final Responsibilities</h2>
        
        <h3>Comprehensive Punch List Inspection Methodology</h3>
        <p>Punch list development represents the systematic identification of all incomplete or deficient work items requiring correction prior to achieving substantial completion and final payment. The inspection follows a methodical room-by-room and system-by-system approach examining all visible work for compliance with plans, specifications, and acceptable standards of workmanship. Professional punch list inspections in typical residential construction identify 100-300 individual items requiring attention, organized by trade responsibility and priority for completion.</p>
        
        <p>The punch list inspection utilizes standardized tools including digital cameras or tablets for documentation, electrical outlet testers, tape measures, and levels. Digital punch list management software offers significant advantages including photographic documentation, automatic distribution to responsible contractors, status tracking, and location tagging. These systems substantially improve communication efficiency, provide clear documentation of incomplete items, and facilitate tracking of correction progress compared to paper-based systems.</p>
        
        <p>Punch list items should be described with sufficient detail to allow contractors to identify the specific problem and required correction without requiring follow-up clarification. Generic descriptions like "fix door" are inadequate; better specification identifies location, nature of problem, and required correction: "Bedroom 2, entry door: lockset dragging on turn; adjust strike for smooth operation." The additional descriptive detail substantially improves correction efficiency and reduces required follow-up visits.</p>

        <h3>Punch List Categorization and Prioritization</h3>
        <p>Professional punch list management systems categorize items to distinguish between critical items preventing occupancy or creating safety hazards, major items significantly impacting function or appearance, and minor items representing small imperfections or cosmetic issues. This categorization focuses correction efforts on critical items and provides framework for negotiating disputes over correction responsibility or completion deadlines.</p>
        
        <ul>
            <li><strong>Critical items</strong> include safety hazards, building code violations, systems not functioning as designed, or conditions preventing occupancy. Examples include non-functioning HVAC systems, plumbing leaks, electrical safety violations, missing safety devices, or structural deficiencies. These items require immediate attention and typically must be corrected before issuance of certificate of occupancy.</li>
            
            <li><strong>Major items</strong> include significant functional deficiencies or appearance problems substantially impacting use or value. Examples include doors not operating properly, cabinet hardware misaligned, flooring damage, paint defects in prominent areas, or window operation problems. These items should be corrected before substantial completion and typically must be addressed before final payment release.</li>
            
            <li><strong>Minor items</strong> include small cosmetic imperfections, minor scratches or marks, caulk gaps, or similar deficiencies that don't substantially impact function or appearance. Examples include small paint touch-ups, minor caulk touch-up, or adjustment of minor hardware alignment issues. These items may be addressed after occupancy if necessary to meet move-in deadlines, though complete correction should occur before final payment release.</li>
        </ul>

        <h3>Substantial Completion Certification</h3>
        <p>Substantial completion represents the point at which the work has progressed sufficiently that the owner can occupy and use the building for its intended purpose, despite the existence of minor incomplete or deficient work items. This determination has significant legal and financial implications including triggering warranty periods, allowing owner occupancy, releasing substantial portions of remaining contract payments, and shifting responsibility for site security and utilities to the owner.</p>
        
        <p>The Construction Manager's certification of substantial completion represents professional judgment that the project has achieved the substantial completion criteria despite any remaining punch list items. This certification requires careful evaluation, as premature certification can create liability if the project is not actually suitable for occupancy, while delayed certification beyond actual achievement of substantial completion can create liability for unnecessary delays to the owner's occupancy schedule.</p>

        <div class="best-practice">
            <strong>Documentation Best Practice:</strong> The substantial completion documentation should include a comprehensive punch list of all remaining items, photographic documentation of completed work and remaining items, copies of all required inspection approvals and certificates, submittal of as-built drawings and equipment manuals, and written certification from the Construction Manager describing the work status and confirming substantial completion achievement. This documentation package provides legal protection and clear understanding of project status at the substantial completion milestone.
        </div>

        <h3>Certificate of Occupancy and Final Inspections</h3>
        <p>The Certificate of Occupancy represents official government approval that the building has been constructed in accordance with approved plans and applicable building codes, and is suitable for occupancy for its intended use. Issuance of the certificate typically requires successful completion of all required inspections including final building, electrical, plumbing, and mechanical inspections, plus verification that all conditions of approval have been satisfied.</p>
        
        <p>The final inspection process typically involves the building inspector conducting a comprehensive review of all work, verifying that required corrections from previous inspections have been completed, confirming that all required systems are installed and functioning, and checking for any obvious code violations or safety hazards. The Construction Manager should accompany the inspector during this inspection to immediately address any questions, demonstrate system operation if requested, and understand any deficiencies identified.</p>

        <h3>Owner Training and Documentation Delivery</h3>
        <p>The owner training process provides instruction in proper operation and maintenance of building systems and equipment, delivers all warranty documentation and equipment manuals, and ensures the owner understands maintenance requirements and schedules. This training represents the transition of responsibility from the construction team to the owner and establishes foundation for successful building operation.</p>
        
        <p>System operation training should address all major building systems including HVAC controls and thermostat operation, plumbing fixture operation and maintenance, electrical system configuration and circuit breaker identification, appliance operation, and any specialized equipment or systems. The training should be hands-on with the owner actually operating controls and equipment while receiving instruction, rather than passive presentation of information.</p>
        
        <p>Documentation delivery includes organized binders or digital files containing all equipment manuals, warranty certificates, as-built drawings, maintenance schedules and procedures, contact information for equipment service providers, and paint color documentation. This documentation should be organized logically (typically by system or room) with clear indexing to facilitate future reference.</p>

        <h3>Warranty Period Responsibilities and Closeout</h3>
        <p>The Construction Manager's responsibilities continue through the warranty period (typically one year for residential construction) including coordination of warranty service calls, verification that warranty work is completed properly, and resolution of disputes regarding warranty coverage. The Construction Manager should establish clear procedures for warranty request submission, response timeframes, and communication protocols to ensure professional handling of post-occupancy issues.</p>
        
        <p>Many Construction Managers schedule follow-up inspections at 30 days, 90 days, and near the end of the one-year warranty period to identify any developing problems and ensure all warranty items are addressed before warranty expiration. These proactive inspections demonstrate commitment to quality and identify potential problems before they create serious damage or expensive repairs.</p>
        
        <p>Final project closeout occurs at warranty expiration after verification that all warranty obligations have been satisfied. This closeout triggers final lien release, return of any retained contract payments, and conclusion of the Construction Manager's contractual obligations. Professional closeout processes include photographic documentation of final project condition, compilation of all final documentation, and formal acceptance from the owner acknowledging completion of all obligations.</p>

    </div>
</body>
</html>`;

const newDescription = 'Complete all final details including appliance installation, architectural hardware, paint touch-up, comprehensive cleaning, and systematic punch list management to achieve occupancy-ready condition.';

async function updateModule9() {
  try {
    console.log('Finding Module 9...');
    
    const module9 = await prisma.module.findFirst({
      where: { moduleNumber: 9 }
    });

    if (!module9) {
      console.error('Module 9 not found!');
      return;
    }

    console.log('Updating Module 9 content...');
    
    await prisma.module.update({
      where: { id: module9.id },
      data: {
        content: newContent,
        description: newDescription
      }
    });

    console.log('✅ Module 9 content updated successfully!');
    console.log(`Content length: ${newContent.length} characters`);
    
    // Verify the update
    const updated = await prisma.module.findFirst({
      where: { moduleNumber: 9 }
    });
    
    console.log('\nVerification:');
    console.log('Title:', updated?.title);
    console.log('Description:', updated?.description);
    console.log('Content preview:', updated?.content.substring(0, 200) + '...');
    
  } catch (error) {
    console.error('Error updating Module 9:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateModule9();
