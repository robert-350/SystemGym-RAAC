import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { App } from './App';

describe('App', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('shows the message returned by the API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('Hello World!')));

    render(<App />);

    expect(await screen.findByText(/Hello World!/)).toBeInTheDocument();
  });

  it('shows an error when the API is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')));

    render(<App />);

    expect(await screen.findByText(/unreachable/)).toBeInTheDocument();
  });
});
