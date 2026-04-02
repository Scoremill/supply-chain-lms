
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const moduleNumber = parseInt(id);

    // Try to find by module number first (for admin dashboard)
    let module;
    if (!isNaN(moduleNumber)) {
      module = await prisma.module.findFirst({
        where: { moduleNumber }
      });
    }
    
    // If not found by number, try by ID
    if (!module) {
      module = await prisma.module.findUnique({
        where: { id }
      });
    }

    if (!module) {
      return NextResponse.json({ error: 'Module not found' }, { status: 404 });
    }

    return NextResponse.json(module);
  } catch (error) {
    console.error('Error fetching module:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, content, youtubeUrl } = await request.json();
    const { id } = params;

    if (!title || !description || !content) {
      return NextResponse.json({ error: 'Title, description, and content are required' }, { status: 400 });
    }

    const module = await prisma.module.update({
      where: { id },
      data: {
        title,
        description,
        content,
        youtubeUrl: youtubeUrl || null
      }
    });

    return NextResponse.json(module);
  } catch (error) {
    console.error('Error updating module:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
