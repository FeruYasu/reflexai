import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const simulations = await prisma.simulation.findMany({
    where: {
      user: {
        some: {
          id: userId,
        },
      },
    },
  });

  return NextResponse.json(simulations);
}
