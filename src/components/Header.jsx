import { Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const SPIRAL_PATH = 'M 40.0 107.0 L 41.0 112.0 L 20.0 167.0 L 15.0 195.0 L 13.0 246.0 L 23.0 300.0 L 43.0 345.0 L 70.0 383.0 L 106.0 420.0 L 138.0 442.0 L 184.0 461.0 L 238.0 475.0 L 284.0 477.0 L 310.0 472.0 L 347.0 460.0 L 396.0 432.0 L 436.0 394.0 L 464.0 354.0 L 478.0 325.0 L 493.0 277.0 L 496.0 240.0 L 492.0 197.0 L 481.0 161.0 L 452.0 107.0 L 417.0 68.0 L 391.0 49.0 L 359.0 33.0 L 326.0 21.0 L 280.0 13.0 L 252.0 14.0 L 210.0 23.0 L 174.0 38.0 L 142.0 60.0 L 112.0 90.0 L 88.0 128.0 L 76.0 156.0 L 68.0 196.0 L 66.0 232.0 L 73.0 270.0 L 89.0 310.0 L 110.0 342.0 L 133.0 366.0 L 161.0 386.0 L 198.0 404.0 L 246.0 415.0 L 270.0 415.0 L 306.0 408.0 L 348.0 390.0 L 375.0 370.0 L 398.0 347.0 L 413.0 325.0 L 430.0 279.0 L 435.0 255.0 L 435.0 216.0 L 426.0 181.0 L 411.0 150.0 L 377.0 109.0 L 347.0 89.0 L 324.0 80.0 L 297.0 74.0 L 267.0 73.0 L 235.0 78.0 L 211.0 87.0 L 186.0 102.0 L 163.0 122.0 L 145.0 145.0 L 136.0 162.0 L 129.0 181.0 L 124.0 210.0 L 128.0 255.0 L 141.0 288.0 L 154.0 309.0 L 187.0 338.0 L 231.0 357.0 L 279.0 357.0 L 298.0 351.0 L 326.0 335.0 L 356.0 306.0 L 374.0 268.0 L 378.0 244.0 L 377.0 221.0 L 366.0 188.0 L 337.0 154.0 L 311.0 138.0 L 280.0 131.0 L 248.0 135.0 L 212.0 156.0 L 193.0 178.0 L 183.0 212.0 L 183.0 244.0 L 194.0 270.0 L 217.0 291.0 L 249.0 301.0 L 273.0 300.0 L 291.0 293.0 L 309.0 276.0 L 317.0 256.0 L 318.0 234.0 L 313.0 230.0 L 260.0 230.0';

function ScrollSpiralGlint() {
  const trackRef = useRef(null);
  const sparkleRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return undefined;

    let frame = null;

    const paint = () => {
      frame = null;
      const track = trackRef.current;
      const sparkle = sparkleRef.current;
      if (!track || !sparkle) return;

      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);

      // Let the logo exist on its own first, then reveal the glint once the
      // visitor has begun scrolling.
      const fadeStart = 50;
      const fadeEnd = 250;
      const sparkleOpacity = Math.min(
        Math.max((window.scrollY - fadeStart) / (fadeEnd - fadeStart), 0),
        1,
      );
      sparkle.style.opacity = sparkleOpacity;

      const length = track.getTotalLength();

      // This path was traced from the actual transparent logomark, so the sparkle
      // rides the center of the teal stroke rather than approximating the spiral.
      // The sparkle is white-only: if it ever crosses linen, it visually disappears
      // instead of turning into a teal dot.
      const point = track.getPointAtLength(length * Math.min(progress * 0.96, 0.96));
      sparkle.setAttribute('transform', `translate(${point.x} ${point.y})`);
    };

    const queuePaint = () => {
      if (frame === null) frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener('scroll', queuePaint, { passive: true });
    window.addEventListener('resize', queuePaint);

    return () => {
      window.removeEventListener('scroll', queuePaint);
      window.removeEventListener('resize', queuePaint);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg
      className="brand-spiral-glint"
      viewBox="0 0 510 492"
      aria-hidden="true"
      focusable="false"
    >
      <path ref={trackRef} className="spiral-glint-track" d={SPIRAL_PATH} />

      <g ref={sparkleRef} className="spiral-sparkle">
        <path
          className="spiral-sparkle-star"
          d="M 0 -18 L 3.4 -4.2 L 17 0 L 3.4 4.2 L 0 18 L -3.4 4.2 L -17 0 L -3.4 -4.2 Z"
        />
        <circle className="spiral-sparkle-pin" cx="0" cy="0" r="2.3" />
      </g>
    </svg>
  );
}

export default function Header({ cartCount, onCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    ['Shop', '#shop'],
    ['Classes + Studio', '#experiences'],
    ['Market Schedule', '#markets'],
    ['Artist Bio', '#story'],
  ];

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Glazed Pottery Shop home">
          <span className="brand-logo-lockup">
            <img src="/assets/logo-horizontal-transparent.png" alt="Glazed Pottery Shop" />
            <ScrollSpiralGlint />
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>

        <div className="header-actions">
          <a className="header-book-link desktop-only" href="#experiences">BOOK A CLASS</a>
          <button className="cart-button" onClick={onCartOpen} aria-label="Open cart">
            <ShoppingBag size={18} />
            <span>CART</span>
            <b>{cartCount}</b>
          </button>
          <button
            className="menu-button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
          ))}
          <a className="button button-accent" href="#shop" onClick={() => setMobileOpen(false)}>SHOP THE STUDIO</a>
        </nav>
      )}
    </>
  );
}
