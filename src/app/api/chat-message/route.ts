import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { determineResponseType } from '../bot/bot-response';
import { botResponses } from '../bot/answers';

export async function POST(req: Request) {
  try {
    const { content, chatId } = await req.json();

    if (!content || !chatId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const userMessage = await prisma.chatMessage.create({
      data: {
        content,
        sender: 'USER',
        chatId,
      },
    });

    const responseType = determineResponseType(content);

    const possibleResponses = botResponses[responseType];
    const botResponse =
      possibleResponses[Math.floor(Math.random() * possibleResponses.length)];

    const botMessage = await prisma.chatMessage.create({
      data: {
        content: botResponse,
        sender: 'BOT',
        chatId,
      },
    });

    await new Promise((resolve) =>
      setTimeout(() => resolve('Data loaded'), 2000)
    );

    return NextResponse.json({ userMessage, botMessage }, { status: 201 });
  } catch (error) {
    console.error('Error creating messages:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const chatId = req.nextUrl.searchParams.get('id');

  const chatMessages = await prisma.chatMessage.findMany({
    where: {
      chatId,
    },
  });

  return NextResponse.json(chatMessages);
}
