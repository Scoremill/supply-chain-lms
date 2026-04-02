import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const youtubeUrls: Record<number, string> = {
  1: 'https://www.youtube.com/embed/oqejEXSJeZU',
  2: 'https://www.youtube.com/embed/p7RYAwxAPZ8',
  3: 'https://www.youtube.com/embed/P9ibTyaNSXo',
  4: 'https://www.youtube.com/embed/Cnq_KfhxpdE',
  5: 'https://www.youtube.com/embed/m4qm7Fy-VaU',
  6: 'https://www.youtube.com/embed/Yy7r01b7rMQ',
  7: 'https://www.youtube.com/embed/ULpUIMGMnOk',
  8: 'https://www.youtube.com/embed/9yi23vFL-1c',
  9: 'https://www.youtube.com/embed/mdT5_Vb2IK8',
  10: 'https://www.youtube.com/embed/6rETxwyLs0s',
};

async function main() {
  for (const [moduleNumber, url] of Object.entries(youtubeUrls)) {
    const result = await prisma.module.updateMany({
      where: { moduleNumber: parseInt(moduleNumber) },
      data: { youtubeUrl: url },
    });
    console.log(`Module ${moduleNumber}: updated ${result.count} record(s) → ${url}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
