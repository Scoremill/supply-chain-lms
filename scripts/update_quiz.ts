import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.quiz.updateMany({
    where: {
      questionText: "What type of lumber is used for the temporary construction driveway?"
    },
    data: {
      questionText: "What type of materials is used for the temporary construction driveway?"
    }
  });
  
  console.log(`✅ Updated ${result.count} quiz question(s)`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
