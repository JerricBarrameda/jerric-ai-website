import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Hero from './components/Hero';

function App() {
  return (
    <>
      <Hero />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
