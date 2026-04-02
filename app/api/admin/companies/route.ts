
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: {
            users: {
              // Exclude Super Admins from company user counts for accurate billing
              where: {
                role: {
                  in: ['STUDENT', 'COMPANY_ADMIN']
                }
              }
            }
          }
        },
        companyCodes: { orderBy: { createdAt: 'asc' } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { companyName, companyCode, adminName, adminEmail, adminPassword } = await request.json();

    if (!companyName || !companyCode) {
      return NextResponse.json({ error: 'Company name and code are required' }, { status: 400 });
    }

    if (!adminName || !adminEmail || !adminPassword) {
      return NextResponse.json({ error: 'Admin details are required' }, { status: 400 });
    }

    if (adminPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Check if company code already exists
    const existingCompany = await prisma.company.findUnique({
      where: { companyCode: companyCode.toUpperCase() }
    });

    if (existingCompany) {
      return NextResponse.json({ error: 'Company code already exists' }, { status: 400 });
    }

    // Check if admin email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Admin email already exists' }, { status: 400 });
    }

    // Create company and admin user in a transaction
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create company
      const company = await tx.company.create({
        data: {
          companyName,
          companyCode: companyCode.toUpperCase(),
          isPublic: false
        }
      });

      // Create initial enrollment code in CompanyCode table
      await (tx as any).companyCode.create({
        data: {
          companyId: company.id,
          code: companyCode.toUpperCase()
        }
      });

      // Create admin user
      const admin = await tx.user.create({
        data: {
          name: adminName,
          email: adminEmail,
          password: hashedPassword,
          role: 'COMPANY_ADMIN',
          companyId: company.id
        }
      });

      return { company, admin };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
