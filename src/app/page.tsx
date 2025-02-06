import { SimulationCard } from '@/components/simulation-card';
import { Simulation } from '@prisma/client';

export async function getSimulations() {
  const response = await fetch(
    'http://localhost:3000/api/simulations?userId=d9acd3e5-18de-4ee9-8358-f6bd5fc8fe9f'
  );

  const simulations = await response.json();
  return simulations;
}

export default async function Home() {
  const simulations: Simulation[] = await getSimulations();

  return (
    <div className="flex min-h-screen flex-col p-6">
      <h1 className="mb-8 text-4xl font-semibold">Simulations</h1>

      <div className="flex flex-wrap gap-4">
        {simulations.map((simulation) => (
          <SimulationCard key={simulation.id} simulation={simulation} />
        ))}
      </div>
    </div>
  );
}
