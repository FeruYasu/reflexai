import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const firstName = req.nextUrl.searchParams.get('name');

  if (!firstName) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      firstName: firstName,
    },
  });

  return NextResponse.json(user);
}
