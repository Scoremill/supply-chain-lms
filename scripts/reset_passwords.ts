import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function resetPasswords() {
  try {
    // Reset drujac5@hotmail.com
    const hash1 = await bcrypt.hash('bahcourse1356', 10);
    await prisma.user.update({
      where: { email: 'drujac5@hotmail.com' },
      data: { password: hash1 }
    });
    console.log('✓ Reset password for drujac5@hotmail.com');

    // Reset audiobluecrew@gmail.com
    const hash2 = await bcrypt.hash('bahcourse1355', 10);
    await prisma.user.update({
      where: { email: 'audiobluecrew@gmail.com' },
      data: { password: hash2 }
    });
    console.log('✓ Reset password for audiobluecrew@gmail.com');

    console.log('\nPasswords reset successfully!');
  } catch (error) {
    console.error('Error resetting passwords:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPasswords();
