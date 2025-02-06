'use client';

import { Simulation } from '@prisma/client';
import { Button } from '..';
import { useRouter } from 'next/navigation';

type SimulationCardProps = {
  simulation: Simulation;
};


export function SimulationCard({ simulation }: SimulationCardProps) {
  const router = useRouter()

  async function createChat(simulationId: string) {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        simulationId: simulationId,
        userId: 'd9acd3e5-18de-4ee9-8358-f6bd5fc8fe9f',
      }),
    });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    const chat = await response.json();
  
    router.push(`/chat/${chat.id}`);
  }
  
  return (
    <div className="flex w-96 flex-col rounded bg-white p-4">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">{simulation.persona}</h2>
        <p className="text-lg font-semibold">{simulation.title}</p>
      </div>

      <p>{simulation.description}</p>
      <p className="mt-4 text-center"> Ready to take on the challenge?</p>
      <Button
        className="m-auto mt-2 px-8"
        onClick={() => createChat(simulation.id)}
      >
        Start Simulation
      </Button>
    </div>
  );
}
