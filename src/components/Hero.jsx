import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const y = Math.min(window.scrollY, window.innerHeight * 1.1);
      if (videoRef.current) {
        videoRef.current.style.transform = `translate3d(0, ${y * 0.13}px, 0) scale(${1.045 + y * 0.000025})`;
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

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncVideoMotion = () => {
      if (!videoRef.current) return;
      if (reducedMotion.matches) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    };

    syncVideoMotion();
    reducedMotion.addEventListener?.('change', syncVideoMotion);

    return () => {
      window.removeEventListener('scroll', onScroll);
      reducedMotion.removeEventListener?.('change', syncVideoMotion);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-image" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/hero-poster.jpg"
        >
          <source src="/assets/hero-process.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-content" ref={contentRef}>
        <p className="hero-kicker">GLAZED POTTERY SHOP · COLORADO</p>
        <h1>Innovative pottery<br />for the home.</h1>
        <p className="hero-lede">
  Functional pottery by ceramic artist Mandy Krolak, made in Gypsum, Colorado
  for everyday rituals, gathering, and home.
</p>
        <div className="hero-actions">
          <a className="button button-light" href="#shop">SHOP CERAMICS <ArrowUpRight size={17} /></a>
          <a className="hero-text-link" href="#experiences">CLASSES + STUDIO <ArrowDown size={16} /></a>
        </div>
      </div>

      <div className="hero-corner-note">
      </div>
    </section>
  );
}
