import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function verifyAllModules() {
  console.log("=".repeat(70));
  console.log("MODULE FORMATTING VERIFICATION");
  console.log("=".repeat(70));
  console.log();
  
  const results = [];
  
  for (let modNum = 1; modNum <= 10; modNum++) {
    const module = await prisma.module.findUnique({
      where: { moduleNumber: modNum }
    });
    
    if (!module) {
      console.log(`❌ Module ${modNum}: NOT FOUND`);
      continue;
    }
    
    const checks = {
      hasTitle: false,
      hasLearningObjectives: false,
      hasColoredBoxes: false,
      hasConclusion: false,
      coloredBoxCount: 0
    };
    
    // Check for white title card
    checks.hasTitle = /background:\s*white;.*?font-size:\s*2\.5em/s.test(module.content);
    
    // Check for pale green learning objectives
    checks.hasLearningObjectives = /#BEFFD1|background:\s*#BEFFD1/i.test(module.content);
    
    // Check for rose conclusion
    checks.hasConclusion = /#fee2e2/i.test(module.content) && /Conclusion/i.test(module.content);
    
    // Count colored boxes
    const blueBoxes = (module.content.match(/#f0f9ff/gi) || []).length;
    const orangeBoxes = (module.content.match(/#fff7ed/gi) || []).length;
    const yellowBoxes = (module.content.match(/#fef3c7/gi) || []).length;
    const redBoxes = (module.content.match(/#fef2f2/gi) || []).length;
    const greenBoxes = (module.content.match(/#f0fdf4/gi) || []).length;
    
    checks.coloredBoxCount = blueBoxes + orangeBoxes + yellowBoxes + redBoxes + greenBoxes;
    checks.hasColoredBoxes = checks.coloredBoxCount > 0;
    
    const allPass = checks.hasTitle && checks.hasLearningObjectives && checks.hasColoredBoxes && checks.hasConclusion;
    
    console.log(`${allPass ? '✅' : '⚠️ '} MODULE ${modNum}: ${module.title}`);
    console.log(`   Title Card: ${checks.hasTitle ? '✓' : '✗'}`);
    console.log(`   Learning Objectives: ${checks.hasLearningObjectives ? '✓' : '✗'}`);
    console.log(`   Colored Boxes: ${checks.coloredBoxCount} (🔵${blueBoxes} 🟠${orangeBoxes} 🟡${yellowBoxes} 🔴${redBoxes} 🟢${greenBoxes})`);
    console.log(`   Conclusion: ${checks.hasConclusion ? '✓' : '✗'}`);
    console.log(`   Content Length: ${module.content.length.toLocaleString()} characters`);
    console.log();
    
    results.push({
      moduleNum: modNum,
      title: module.title,
      allPass,
      ...checks
    });
  }
  
  console.log("=".repeat(70));
  console.log("SUMMARY");
  console.log("=".repeat(70));
  
  const totalBoxes = results.reduce((sum, r) => sum + r.coloredBoxCount, 0);
  const allModulesPass = results.every(r => r.allPass);
  
  console.log(`Total Modules: ${results.length}`);
  console.log(`All Checks Pass: ${allModulesPass ? '✅ YES' : '⚠️  SOME ISSUES'}`);
  console.log(`Total Colored Boxes: ${totalBoxes}`);
  console.log();
  
  if (allModulesPass) {
    console.log("🎉 All modules properly formatted!");
    console.log("   - White title cards ✓");
    console.log("   - Pale green learning objectives ✓");
    console.log(`   - ${totalBoxes} colored content boxes ✓`);
    console.log("   - Rose conclusion sections ✓");
  } else {
    console.log("⚠️  Some modules need attention:");
    results.filter(r => !r.allPass).forEach(r => {
      console.log(`   - Module ${r.moduleNum}: ${r.title}`);
    });
  }
  
  await prisma.$disconnect();
}

verifyAllModules().catch(console.error);
