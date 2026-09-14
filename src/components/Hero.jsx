import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = Math.min(window.scrollY, window.innerHeight * 1.1);
      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(0, ${y * 0.13}px, 0) scale(${1.045 + y * 0.000025})`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${y * 0.055}px, 0)`;
        contentRef.current.style.opacity = String(Math.max(0.34, 1 - y / 1100));
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-image" aria-hidden="true">
        <img ref={imageRef} src="/assets/studio-hands.jpeg" alt="" />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-content" ref={contentRef}>
        <p className="hero-kicker">GLAZED POTTERY SHOP · COLORADO</p>
        <h1>Innovative pottery<br />for the home.</h1>
        <p className="hero-lede">
          Wheel-thrown by ceramic artist Mandy Krolak. Functional forms, glazes mixed from scratch,
          and one-of-a-kind surfaces made to bring something special to everyday routines.
        </p>
        <div className="hero-actions">
          <a className="button button-light" href="#shop">SHOP CERAMICS <ArrowUpRight size={17} /></a>
          <a className="hero-text-link" href="#experiences">CLASSES + STUDIO <ArrowDown size={16} /></a>
        </div>
      </div>

      <div className="hero-corner-note">
        <span>WHEEL-THROWN</span><span>GLAZES FROM SCRATCH</span><span>RAKU + HIGH FIRE</span>
      </div>
    </section>
  );
}
