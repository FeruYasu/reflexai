import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chat from './page';
import { vi } from 'vitest';

describe('Chat Component', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation((url, options) => {
      if (!options) {
        return Promise.resolve({
          json: () => Promise.resolve([{ id: '1', content: 'Hello', sender: 'USER' }]),
        });
      }
      if (options.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            userMessage: { id: '2', content: 'Hi there', sender: 'USER', date: new Date()}, 
            botMessage: { id: '3', content: 'Bot Reply', sender: 'BOT', date: new Date()} 
          }),
        });
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders chat component correctly', async () => {
  render(<Chat />);
    expect(await screen.findByText('You are now connected with Brady.')).toBeInTheDocument();
  });

  test('fetches and displays messages', async () => {
    render(<Chat />);
    expect(await screen.findByText('Hello')).toBeInTheDocument();
  });

  test('sends message and displays bot response', async () => {
    render(<Chat />);

    const input = screen.getByPlaceholderText('Send a message...');
    fireEvent.change(input, { target: { value: 'Hi there' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => expect(screen.getByText('Hi there')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Bot Reply')).toBeInTheDocument());
  });
});