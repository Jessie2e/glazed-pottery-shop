import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const collections = [
  {
    id: 'mugs',
    label: 'Mugs & Cups',
    kicker: 'MORNING RITUALS',
    title: 'Mugs & Cups',
    description:
      'Handmade mugs and cups for coffee, tea and the everyday rituals worth slowing down for.',
    featuredName: 'Ocean Landscape Mug',
    image:
      'https://i.etsystatic.com/13059066/r/il/62b3ea/3945919636/il_fullxfull.3945919636_m8z1.jpg',
    imagePosition: '50% 52%',
    theme: 'terracotta',
  },
  {
    id: 'serving',
    label: 'Kitchen + Serving',
    kicker: 'MADE FOR GATHERING',
    title: 'Kitchen + Serving',
    description:
      'Chip + dip platters, berry bowls, plates and functional pieces made to earn their place at the table.',
    featuredName: 'Matte Black Chip + Dip',
    image: '/assets/chip-dip-black.jpeg',
    imagePosition: '50% 72%',
    theme: 'charcoal',
  },
  {
    id: 'sink',
    label: 'Sink + Bath',
    kicker: 'BEAUTIFUL + USEFUL',
    title: 'Sink + Bath',
    description:
      'Thoughtful pieces for the spaces you use every day — from self-draining sponge holders to soap dishes and more.',
    featuredName: 'Self-Draining Sponge Holder',
    image: '/assets/sponge-holder.jpeg',
    imagePosition: '56% 58%',
    theme: 'teal',
  },
  {
    id: 'raku',
    label: 'Raku + Air Plants',
    kicker: 'ONE OF A KIND',
    title: 'Raku + Air Plants',
    description:
      'Expressive Raku-fired pieces shaped by flame, smoke and surprise — each one with a finish all its own.',
    featuredName: 'Rainbow Raku Air Plant Hanger',
    image:
      'https://i.etsystatic.com/13059066/r/il/e990ad/3455463727/il_fullxfull.3455463727_o0di.jpg',
    imagePosition: '50% 50%',
    theme: 'ochre',
  },
];

const ETSY_URL = 'https://www.etsy.com/shop/GlazedPotteryShop';

export default function ShopSection() {
  const [activeId, setActiveId] = useState(collections[0].id);
  const active = collections.find((collection) => collection.id === activeId) || collections[0];

  return (
    <section className={`collection-shop collection-shop--${active.theme}`} id="shop">
      <div className="collection-shop__intro">
        <p className="eyebrow">SHOP OUR CERAMICS</p>

        <div className="collection-shop__tabs" role="tablist" aria-label="Shop collections">
          {collections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              role="tab"
              aria-selected={active.id === collection.id}
              className={active.id === collection.id ? 'is-active' : ''}
              onClick={() => setActiveId(collection.id)}
            >
              {collection.label}
            </button>
          ))}
        </div>
      </div>

      <div className="collection-shop__feature" aria-live="polite">
        <span className="collection-shop__shape collection-shop__shape--left" aria-hidden="true" />
        <span className="collection-shop__shape collection-shop__shape--right" aria-hidden="true" />
        <span className="collection-shop__line" aria-hidden="true" />

        <div className="collection-shop__copy" key={`${active.id}-copy`}>
          <p className="collection-shop__kicker">{active.kicker}</p>
          <h2>{active.title}</h2>
          <p>{active.description}</p>

          <a
            className="collection-shop__button"
            href={ETSY_URL}
            target="_blank"
            rel="noreferrer"
          >
            SHOP ALL POTTERY <ArrowRight size={16} />
          </a>
        </div>

        <div className="collection-shop__art" key={`${active.id}-image`}>
          <div className="collection-shop__image-wrap">
            <img
              src={active.image}
              alt={active.featuredName}
              style={{ objectPosition: active.imagePosition }}
            />
          </div>
          <p className="collection-shop__featured-name">
            FEATURED · {active.featuredName}
          </p>
        </div>
      </div>

    </section>
  );
}
