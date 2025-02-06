import { prisma } from '@/lib/prisma';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const chatMessages = await prisma.chat.findMany({
    where: {
      user: {
        id: userId,
      },
    },
    include: {
      simulation: true,
    },
  });

  return NextResponse.json(chatMessages);
}
