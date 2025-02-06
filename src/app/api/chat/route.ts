import { prisma } from '@/lib/prisma';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { simulationId, userId } = await req.json();

    if (!simulationId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newChat = await prisma.chat.create({
      data: {
        simulationId: simulationId,
        userId: userId,
      },
    });

    return NextResponse.json(newChat, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get('chatId');

  if (!chatId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const chatMessages = await prisma.chat.findUnique({
    where: {
       id: chatId,
    },
    include: {
      simulation: true,
    },
  });

  return NextResponse.json(chatMessages);
}
