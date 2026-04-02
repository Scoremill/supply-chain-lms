
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateQuestion9() {
  console.log('🔄 Updating Module 5, Question 9...');
  
  try {
    // First, find the module
    const module = await prisma.module.findUnique({
      where: { moduleNumber: 5 }
    });

    if (!module) {
      console.error('❌ Module 5 not found');
      return;
    }

    // Find all questions for Module 5
    const questions = await prisma.quiz.findMany({
      where: { moduleId: module.id },
      orderBy: { id: 'asc' }
    });

    console.log(`📋 Found ${questions.length} questions for Module 5`);

    // The 9th question should be at index 8
    if (questions.length >= 9) {
      const question9 = questions[8]; // 0-indexed, so 9th question is at index 8
      
      console.log('\n📝 Current Question 9:');
      console.log(`   ID: ${question9.id}`);
      console.log(`   Question: ${question9.questionText}`);
      console.log(`   Correct Answer: ${question9.correctAnswer}`);

      // Update the question
      await prisma.quiz.update({
        where: { id: question9.id },
        data: {
          questionText: "For a 200-ampere residential electrical service, what is the typical size of the grounding electrode conductor using copper?",
          optionA: "1/0 AWG",
          optionB: "6 AWG",
          optionC: "2 AWG",
          optionD: "4 AWG",
          correctAnswer: "D"
        }
      });

      console.log('\n✅ Question 9 updated successfully!');
      console.log('   New Question: "For a 200-ampere residential electrical service, what is the typical size of the grounding electrode conductor using copper?"');
      console.log('   New Correct Answer: D (4 AWG)');

      // Verify the update
      const updated = await prisma.quiz.findUnique({
        where: { id: question9.id }
      });

      console.log('\n✅ Verification:');
      console.log(`   Question: ${updated?.questionText}`);
      console.log(`   Option D: ${updated?.optionD}`);
      console.log(`   Correct: ${updated?.correctAnswer}`);

    } else {
      console.error('❌ Module 5 does not have 9 questions');
    }

  } catch (error) {
    console.error('❌ Error updating question:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateQuestion9();
