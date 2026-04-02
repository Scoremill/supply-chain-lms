import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();
const prisma = new PrismaClient();

async function syncToSeed() {
  try {
    // Find Module 10 quiz questions from database
    const module = await prisma.module.findUnique({
      where: { moduleNumber: 10 },
      include: {
        quizzes: {
          orderBy: { id: 'asc' }
        }
      }
    });

    if (!module) {
      console.error('Module 10 not found!');
      return;
    }

    console.log(`Found Module 10 with ${module.quizzes.length} quiz questions`);

    // Read the seed.ts file
    const seedPath = 'scripts/seed.ts';
    let seedContent = fs.readFileSync(seedPath, 'utf-8');

    // Generate the quiz questions for Module 10
    const module10Questions = module.quizzes.map(q => {
      const escapedQuestion = q.questionText.replace(/"/g, '\\"');
      const escapedA = q.optionA.replace(/"/g, '\\"');
      const escapedB = q.optionB.replace(/"/g, '\\"');
      const escapedC = q.optionC.replace(/"/g, '\\"');
      const escapedD = q.optionD.replace(/"/g, '\\"');
      
      return `  { moduleNumber: 10, question: "${escapedQuestion}", optionA: "${escapedA}", optionB: "${escapedB}", optionC: "${escapedC}", optionD: "${escapedD}", correct: "${q.correctAnswer}" }`;
    }).join(',\n');

    // Find and replace Module 10 questions
    // Pattern: Find all module 10 questions from the first one to the closing of quizQuestions array
    const pattern = /\/\/ Module 10: Final Walkthrough & Handover[\s\S]*?{ moduleNumber: 10,[\s\S]*?(?=\n\];\n\nasync function main)/;
    
    const replacement = `// Module 10: Final Walkthrough & Handover (20 questions)
${module10Questions}
`;

    if (seedContent.match(pattern)) {
      seedContent = seedContent.replace(pattern, replacement);
      fs.writeFileSync(seedPath, seedContent, 'utf-8');
      console.log('✓ Successfully updated Module 10 quiz questions in seed.ts');
      console.log(`✓ Replaced ${module.quizzes.length} questions`);
    } else {
      console.log('❌ Could not find Module 10 quiz pattern in seed.ts');
    }

  } catch (error) {
    console.error('Error syncing to seed.ts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncToSeed();
