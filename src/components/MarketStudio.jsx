import { useEffect, useRef } from "react";
import { ArrowUpRight, MapPin, ShoppingBag, Sparkles } from "lucide-react";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=461+Railroad+Ave+Gypsum+CO";

export default function MarketStudio() {
  const artRef = useRef(null);
  const orbitOneRef = useRef(null);
  const orbitTwoRef = useRef(null);

  useEffect(() => {
    let frame;

    const updateOrbits = () => {
      if (!artRef.current) return;

      const rect = artRef.current.getBoundingClientRect();
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
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateOrbits);
    };

    updateOrbits();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="market-studio-section" id="markets">
      <div className="market-studio-heading">
        <div>
          <p className="eyebrow">SHOP LOCAL</p>
          <h2>
            Find Glazed
            <br />
            <em>in the wild.</em>
          </h2>
        </div>
        <p>
          Catch Mandy at upcoming markets, visit the studio in Gypsum, or join
          the list so you never miss a shop update, class or special event.
        </p>
      </div>

      <div className="market-studio-grid">
        {/* LEFT SIDE — REPLACED WITH PHOTO ONLY */}
        <article className="market-photo-card">
          <img
            src="/assets/studio-shelves.webp"
            alt="Inside the Glazed Pottery Shop studio in Gypsum, Colorado"
          />

          <a
            className="market-photo-entry"
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
          >
            ENTER STUDIO <ArrowUpRight size={16} />
          </a>
        </article>

        {/* RIGHT SIDE — UNTOUCHED */}
        <article className="studio-visit-card">
          <div
            className="studio-visit-art"
            ref={artRef}
            aria-hidden="true"
          >
            <span
              ref={orbitOneRef}
              className="studio-orbit studio-orbit-one"
            />

            <span
              ref={orbitTwoRef}
              className="studio-orbit studio-orbit-two"
            />
            <img src="/assets/logomark.png" alt="" />
          </div>

          <div className="studio-visit-copy">
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
        </article>
      </div>

      <div className="market-friend-note">
        <Sparkles size={18} />
        <span>
          Markets move. Classes fill. Pots disappear.{" "}
          <a href="#friends">Let’s be friends →</a>
        </span>
      </div>
    </section>
  );
}