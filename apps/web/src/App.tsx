import { useEffect, useState } from 'react';

type ApiState = { status: 'loading' } | { status: 'ok'; message: string } | { status: 'error' };

// Placeholder that proves the web -> api wiring. Replace it with real screens
// as the API modules appear.
export function App() {
  const [api, setApi] = useState<ApiState>({ status: 'loading' });

  useEffect(() => {
    fetch('/api/')
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(String(res.status)))))
      .then((message) => setApi({ status: 'ok', message }))
      .catch(() => setApi({ status: 'error' }));
  }, []);

  return (
    <main>
      <h1>GymFlow</h1>
      <p>
        API:{' '}
        {api.status === 'loading' && 'connecting...'}
        {api.status === 'ok' && api.message}
        {api.status === 'error' && 'unreachable'}
      </p>
    </main>
  );
}
