import { Button } from '@/components';
import { Message } from '@/components/message';
import { apiFetch } from '@/helpers/apiFetch';
import { ChatMessage } from '@prisma/client';
import Link from 'next/link';

export default async function History({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const messages: ChatMessage[] = await apiFetch(
    `/chat-message?id=${id}`
  );

  return (
    <div className="flex min-h-screen flex-col overflow-hidden p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Simulation: Brady</h1>
          <p className="text-xl">Support Training</p>
        </div>

        <Link href="/history">
          <Button className="h-12" variant="outline">
            Go Back
          </Button>
        </Link>
      </div>

      <div className="mt-4 flex max-h-[88vh] flex-1 flex-col items-center overflow-y-scroll rounded-lg bg-white py-4">
        <div className="flex w-full flex-1 flex-col">
          {messages?.map((message) => <Message chatMessage={message} />)}
        </div>
      </div>
    </div>
  );
}
