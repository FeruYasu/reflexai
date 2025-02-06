'use client';
import { Button } from '@/components';
import TypingDots from '@/components/loading';
import { Message } from '@/components/message';
import { apiFetch } from '@/helpers/apiFetch';
import { Chat, ChatMessage, Simulation } from '@prisma/client';
import { SendHorizonal } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [simulation, setSimulation] = useState<Simulation | null>(null);

  const [value, setValue] = useState('');
  const [messageLoading, setMessageLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams<{ id: string }>()

  async function getChatMessages() {
    const chatMessages = await apiFetch<ChatMessage[]>(
      `/chat-message?id=${id}`
    );

    setMessages(chatMessages);
  }

   async function getSimulation() {
    const chat = await apiFetch<Chat & { simulation: Simulation}>(
      `/chat?chatId=${id}`
    );
  
    setSimulation(chat.simulation);
  }

  useEffect(() => {
    getChatMessages();
    getSimulation()
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    const tempValue = value;
    setValue('');
    const originalMessages = messages;

    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          content: tempValue,
          chatId: id,
          sender: 'USER',
          id: 'any',
          timestamp: new Date(),
        },
      ];
    });

    setMessageLoading(true);

    const response = await fetch(`http://localhost:3000/api/chat-message`, {
      method: 'POST',
      body: JSON.stringify({
        content: tempValue,
        chatId: id,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const { botMessage, userMessage } = await response.json();

    setMessages([...originalMessages, userMessage, botMessage]);
    setMessageLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Simulation: {simulation?.persona}</h1>
          <p className="text-xl">{simulation?.title}</p>
        </div>

        <Link href="/history">
          <Button className="h-12" variant="cancel">
            Finish Simulation
          </Button>
        </Link>
      </div>

      <div className="mt-4 flex max-h-[80vh] flex-1 flex-col items-center overflow-y-scroll rounded-lg bg-white pb-4">
        <div className="flex w-full flex-1 flex-col">
          <p className="mt-2 text-center">You are now connected with {simulation?.persona}.</p>
          <p className="text-center">
            Begin the conversation by initiating Opening Protocol.
          </p>

          {messages?.map((message) => <Message chatMessage={message} key={message.id} />)}

          {messageLoading && (
            <div className="ml-4 mt-4">
              <TypingDots />
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      <div className="item-center bottom-0 mb-2 mt-4 flex w-full gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-2 shadow-sm">
        <input
          type="text"
          placeholder="Send a message..."
          className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <Button className="px-2" onClick={() => handleSendMessage()} id="send-button">
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
}

