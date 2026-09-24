import { ArrowUpRight, MapPin, ShoppingBag } from 'lucide-react';

const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=461+Railroad+Ave+Gypsum+CO';

export default function StudioSection() {
  return (
    <section className="studio-local-section" id="studio">
      <div className="studio-local-card">

        <div className="studio-local-photo">
          <img
            src="/assets/studio-shelves.webp"
            alt="Shelves filled with handmade pottery inside the Glazed Pottery Shop studio in Gypsum, Colorado"
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

        <div className="studio-local-copy">
          <p className="eyebrow">THE STUDIO</p>

          <h2>
            Where the work
            <br />
            <em>comes to life.</em>
          </h2>

          <div className="studio-local-address">
            <MapPin size={18} />

            <div>
              <strong>461 Railroad Ave</strong>
              <span>Gypsum, Colorado</span>
            </div>
          </div>

          <p className="studio-local-description">
            Glazed is made right here in Mandy’s working studio — where making,
            glazing, packing, shipping and displaying finished work all happen
            under one roof.
          </p>

          <div className="studio-local-actions">
            <a
              className="button button-accent"
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
            >
              GET DIRECTIONS
              <ArrowUpRight size={16} />
            </a>

            <a className="studio-shop-link" href="#shop">
              <ShoppingBag size={15} />
              SHOP THE STUDIO
            </a>
          </div>

          <p className="studio-local-note">
            WORKING STUDIO · LOCAL SHOP · GYPSUM, COLORADO
          </p>
        </div>

      </div>
    </section>
  );
}