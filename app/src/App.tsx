import { Analytics } from '@vercel/analytics/react';
import Hero from './components/Hero';

function App() {
  return (
    <>
      <Hero />
      <Analytics />
    </>
  );
}

export default App;
