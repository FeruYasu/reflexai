import { SimulationCard } from '@/components/simulation-card';
import { apiFetch } from '@/helpers/apiFetch';
import { Simulation } from '@prisma/client';

export default async function Home() {
  const simulations: Simulation[] = await apiFetch(
    '/simulations?userId=d9acd3e5-18de-4ee9-8358-f6bd5fc8fe9f'
  );

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
