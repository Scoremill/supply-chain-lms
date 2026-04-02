import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const KEEP_EMAILS = [
  'eric.holt@du.edu',
  'drujac5@hotmail.com',
  'audiobluecrew@gmail.com',
  'john@doe.com'
];

async function cleanupUsers() {
  try {
    // First, list all current users
    const allUsers = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }
    });
    
    console.log('\n=== CURRENT USERS ===');
    allUsers.forEach(u => console.log(`- ${u.email} (${u.name}, ${u.role})`));
    console.log(`Total: ${allUsers.length} users\n`);

    // Find users to delete (case-insensitive comparison)
    const usersToDelete = allUsers.filter(
      u => !KEEP_EMAILS.some(email => email.toLowerCase() === u.email.toLowerCase())
    );

    console.log('=== USERS TO DELETE ===');
    usersToDelete.forEach(u => console.log(`- ${u.email} (${u.name})`));
    console.log(`Total to delete: ${usersToDelete.length}\n`);

    if (usersToDelete.length === 0) {
      console.log('No users to delete. Database is already clean.');
      return;
    }

    // Delete related records first, then delete users
    for (const user of usersToDelete) {
      console.log(`Deleting data for: ${user.email}`);
      
      // Delete user progress
      await prisma.userProgress.deleteMany({
        where: { userId: user.id }
      });
      
      // Delete sessions
      await prisma.session.deleteMany({
        where: { userId: user.id }
      });
      
      // Delete accounts
      await prisma.account.deleteMany({
        where: { userId: user.id }
      });
      
      // Delete the user
      await prisma.user.delete({
        where: { id: user.id }
      });
      
      console.log(`  ✓ Deleted ${user.email}`);
    }

    // Verify remaining users
    const remainingUsers = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }
    });

    console.log('\n=== REMAINING USERS ===');
    remainingUsers.forEach(u => console.log(`- ${u.email} (${u.name}, ${u.role})`));
    console.log(`Total: ${remainingUsers.length} users`);

  } catch (error) {
    console.error('Error cleaning up users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanupUsers();
