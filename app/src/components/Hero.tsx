import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import RevealLayer from './RevealLayer';
import networkBase from '../assets/network-base.svg';
import networkReveal from '../assets/network-reveal.svg';

const CALENDAR_URL = 'https://calendar.app.google/EJRJKYmPR8bZQxyt6';

const NAV_LINKS = [
  { label: 'About', href: '/' },
  { label: 'Services', href: '/services.html' },
  { label: 'Blog', href: '/blog.html' },
  { label: 'YouTube', href: '/youtube.html' },
];

export default function Hero() {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <a href="/" className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic">Jerric AI</span>
        </a>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block bg-teal-accent text-teal-deep text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white transition-colors"
        >
          Book a Call
        </a>

        <button
          className="md:hidden text-white p-2"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {mobileOpen && (
          <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/80 hover:bg-white/10 hover:text-white transition-colors px-4 py-2.5 rounded-lg text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-teal-accent text-teal-deep text-sm font-semibold px-4 py-2.5 rounded-lg text-center mt-1"
            >
              Book a Call
            </a>
          </div>
        )}
      </nav>

      <section className="relative w-full overflow-hidden h-screen bg-black" style={{ height: '100dvh' }}>
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url("${networkBase}")` }}
        />

        <RevealLayer image={networkReveal} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Turn Repetitive Tasks
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              into Automatic Systems
            </span>
          </h1>
        </div>

        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/80 leading-relaxed">
            I build systems so business owners can stop drowning in repetitive tasks and enjoy their time.
          </p>
        </div>

        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Automated email sorting, lead generation, and custom workflows that hand you back 30+ hours a week.
          </p>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-teal-accent hover:bg-secondary text-teal-deep text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-teal-accent/30 pointer-events-auto"
          >
            Book a Discovery Call
          </a>
        </div>
      </section>
    </div>
  );
}
