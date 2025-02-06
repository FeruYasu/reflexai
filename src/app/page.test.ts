import { describe, it, expect, vi, Mock} from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page'; 
import { Simulation } from '@prisma/client';

global.fetch = vi.fn();

describe('Home Page', () => {
  const mockSimulations: Simulation[] = [
    {
      id: '1',
      persona: 'Test Simulation 1',
      title: 'Simulation Title 1',
      description:'Small description 1',
    },
    {
      id: '2',
      persona: 'Test Simulation 2',
      title: 'Simulation Title 2',
      description:'Small description 2',
    }
  ];

  beforeEach(() => {
    vi.resetAllMocks();

    (global.fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSimulations),
      ok: true
    });
  });

  it('renders page title', async () => {
    render(await Home());

    const titleElement = screen.getByRole('heading', {
      name: /simulations/i
    });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders simulations cards', async () => {
    render(await Home());

    expect(screen.getByText('Test Simulation 1')).toBeInTheDocument();
    expect(screen.getByText('Test Simulation 2')).toBeInTheDocument();
    expect(screen.getByText('Simulation Title 1')).toBeInTheDocument();
    expect(screen.getByText('Simulation Title 2')).toBeInTheDocument();
    expect(screen.getByText('Small description 1')).toBeInTheDocument();
    expect(screen.getByText('Small description 2')).toBeInTheDocument();
  });
});