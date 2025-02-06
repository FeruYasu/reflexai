import { Button } from '@/components';
import { timestampToHour } from '@/helpers';
import { Chat, Simulation } from '@prisma/client';
import { format } from 'date-fns';

import { CalendarClock } from 'lucide-react';
import Link from 'next/link';

type ChatHistory = Chat & {
  simulation: Simulation;
};

async function getChats() {
  try {
    const response = await fetch(
      'http://localhost:3000/api/chats?userId=d9acd3e5-18de-4ee9-8358-f6bd5fc8fe9f'
    );

    const chats = await response.json();
    return chats;
  } catch (error) {
    return [];
  }
}

export default async function History() {
  const chats: ChatHistory[] = await getChats();

  const hasChats = chats.length > 0;

  return (
    <div className="flex min-h-screen flex-col p-6">
      <h1 className="mb-8 text-4xl font-semibold">History</h1>

      {hasChats ? (
        <div className="flex flex-wrap gap-4">
          {chats?.map((chat) => (
            <div
              key={chat.id}
              className="flex w-full flex-col rounded bg-white p-4 lg:w-fit"
            >
              <h2 className="text-2xl font-semibold">
                {chat.simulation.persona}
              </h2>
              <p>{chat.simulation.title}</p>

              <div className="mt-2 flex gap-2 text-zinc-700">
                <CalendarClock />
                <p className="font-semibold">
                  {format(chat.createdAt, 'MM/dd/yy')}{' '}
                  {timestampToHour(chat.createdAt)}
                </p>
              </div>

              <Link href={`/history/${chat.id}`} className="mx-auto mt-4">
                <Button>Chat History</Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No Chats yet</p>
      )}
    </div>
  );
}
