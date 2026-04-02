import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();
const prisma = new PrismaClient();

async function syncToSeed() {
  try {
    // Find Module 10
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

    // Generate the quiz questions array for seed.ts
    const quizQuestionsArray = module.quizzes.map(q => `    {
      questionText: \`${q.questionText.replace(/`/g, '\\`')}\`,
      optionA: \`${q.optionA.replace(/`/g, '\\`')}\`,
      optionB: \`${q.optionB.replace(/`/g, '\\`')}\`,
      optionC: \`${q.optionC.replace(/`/g, '\\`')}\`,
      optionD: \`${q.optionD.replace(/`/g, '\\`')}\`,
      correctAnswer: "${q.correctAnswer}"
    }`).join(',\n');

    // Find and replace the Module 10 quiz questions in seed.ts
    const module10QuizPattern = /\/\/ Module 10 quiz questions[\s\S]*?const module10Quizzes = \[[\s\S]*?\];/;
    
    const newModule10QuizSection = `// Module 10 quiz questions
  const module10Quizzes = [
${quizQuestionsArray}
  ];`;

    if (seedContent.match(module10QuizPattern)) {
      seedContent = seedContent.replace(module10QuizPattern, newModule10QuizSection);
      console.log('✓ Updated Module 10 quiz questions in seed.ts');
    } else {
      console.log('Could not find Module 10 quiz pattern in seed.ts');
    }

    // Write back to seed.ts
    fs.writeFileSync(seedPath, seedContent, 'utf-8');
    console.log('✓ seed.ts file updated successfully');

  } catch (error) {
    console.error('Error syncing to seed.ts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncToSeed();
