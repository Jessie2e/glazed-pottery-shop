import { useEffect, useRef } from 'react';
import { ArrowUpRight, MapPin, ShoppingBag } from 'lucide-react';

const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=461+Railroad+Ave+Gypsum+CO';

export default function StudioSection() {
  const photoRef = useRef(null);
  const orbitOneRef = useRef(null);
  const orbitTwoRef = useRef(null);

  useEffect(() => {
    let frame;

    const updateMotion = () => {
      const target = photoRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      );

      const rotationOne = -55 + progress * 360;
      const rotationTwo = 125 - progress * 360;

      if (orbitOneRef.current) {
        orbitOneRef.current.style.transform = `rotate(${rotationOne}deg)`;
      }

      if (orbitTwoRef.current) {
        orbitTwoRef.current.style.transform = `rotate(${rotationTwo}deg)`;
      }

      const image = target.querySelector('img');
      if (image) {
        const y = (progress - 0.5) * 16;
        const scale = 1.04 + Math.abs(progress - 0.5) * 0.01;
        image.style.transform = `translateY(${y}px) scale(${scale})`;
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateMotion);
    };

    updateMotion();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section className="studio-section-photo" id="studio">
      <article className="studio-visit-card studio-visit-card--photo">
        <div
          className="studio-visit-photo studio-visit-photo--animated"
          ref={photoRef}
        >
          <img
            src="/assets/studio-shelves.webp"
            alt="Shelves of handmade pottery inside the Glazed Pottery Shop studio in Gypsum, Colorado"
          />

          <a
            className="studio-photo-entry"
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
          >
            <span>ENTER THE STUDIO</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="studio-visit-copy studio-visit-copy--orbit">
          <div className="studio-copy-decoration" aria-hidden="true">
            <span className="studio-copy-ring studio-copy-ring--one" />
            <span className="studio-copy-ring studio-copy-ring--two" />

            <span
              ref={orbitOneRef}
              className="studio-copy-orbit studio-copy-orbit--one"
            />

            <span
              ref={orbitTwoRef}
              className="studio-copy-orbit studio-copy-orbit--two"
            />

            <span className="studio-copy-spiral">
              <i />
              <i />
              <i />
              <i />
            </span>
          </div>

          <div className="studio-copy-content">
            <div className="soft-icon">
              <MapPin size={21} />
            </div>

            <p className="eyebrow">VISIT THE STUDIO</p>

            <h3>
              Shop local.
              <br />
              See where it’s made.
            </h3>

            <p className="studio-address">
              461 Railroad Ave
              <br />
              Gypsum, CO
            </p>

            <p>
              Stop by the studio to shop Glazed pottery locally and see the
              space behind the work.
            </p>

            <div className="studio-visit-actions">
              <a
                className="button button-dark"
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
              >
                GET DIRECTIONS <ArrowUpRight size={16} />
              </a>

              <a className="studio-shop-link" href="#shop">
                <ShoppingBag size={16} /> SHOP ONLINE
              </a>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
