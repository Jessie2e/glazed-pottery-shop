import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export const collections = [
  {
    id: 'drinkware',
    label: 'Drinkware',
    kicker: 'MORNING RITUALS',
    title: 'Drinkware',
    description:
      'Handmade mugs and cups for coffee, tea and the everyday rituals worth slowing down for.',
    featuredName: 'Ocean Landscape Mug',
    image:
      'https://i.etsystatic.com/13059066/r/il/62b3ea/3945919636/il_fullxfull.3945919636_m8z1.jpg',
    imagePosition: '50% 52%',
    theme: 'terracotta',
    productCategories: ['Mugs'],
  },
  {
    id: 'dining-entertaining',
    label: 'Dining & Entertaining',
    kicker: 'MADE FOR GATHERING',
    title: 'Dining & Entertaining',
    description:
      'Chip + dip platters, berry bowls, plates and functional pieces made to earn their place at the table.',
    featuredName: 'Matte Black Chip + Dip',
    image: '/assets/chip-dip-black.jpeg',
    imagePosition: '50% 72%',
    theme: 'charcoal',
    productCategories: ['Chip and dips', 'Berry bowl / colander', 'Plates'],
  },
  {
    id: 'kitchen-bath',
    label: 'Kitchen & Bath',
    kicker: 'BEAUTIFUL + USEFUL',
    title: 'Kitchen & Bath',
    description:
      'Thoughtful pieces for the spaces you use every day — from self-draining sponge holders to soap dishes and more.',
    featuredName: 'Self-Draining Sponge Holder',
    image: '/assets/sponge-holder.jpeg',
    imagePosition: '56% 58%',
    theme: 'teal',
    productCategories: ['Sponge holders', 'Soap dishes', 'Garlic Keepers'],
  },
  {
    id: 'decor-raku',
    label: 'Decor & Raku',
    kicker: 'ONE OF A KIND',
    title: 'Decor & Raku',
    description:
      'Expressive Raku-fired pieces and sculptural decor shaped by flame, smoke and surprise — each one with a finish all its own.',
    featuredName: 'Rainbow Raku Air Plant Hanger',
    image:
      'https://i.etsystatic.com/13059066/r/il/e990ad/3455463727/il_fullxfull.3455463727_o0di.jpg',
    imagePosition: '50% 50%',
    theme: 'ochre',
    productCategories: ['Air Plant Hangers'],
  },
];

export default function ShopSection({ onOpenCollection }) {
  const [activeId, setActiveId] = useState(collections[0].id);
  const active = collections.find((collection) => collection.id === activeId) || collections[0];

  return (
    <section className={`collection-shop collection-shop--${active.theme}`} id="shop">
      <div className="collection-shop__intro">
        <p className="eyebrow">SHOP OUR CERAMICS</p>

        <div className="collection-shop__tabs" role="navigation" aria-label="Shop collections">
          {collections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              className={active.id === collection.id ? 'is-active' : ''}
              onMouseEnter={() => setActiveId(collection.id)}
              onFocus={() => setActiveId(collection.id)}
              onClick={() => onOpenCollection(collection.id)}
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

          <button
            className="collection-shop__button"
            type="button"
            onClick={() => onOpenCollection(active.id)}
          >
            VIEW {active.label.toUpperCase()} <ArrowRight size={16} />
          </button>
        </div>

        <button
          className="collection-shop__art collection-shop__art-button"
          type="button"
          key={`${active.id}-image`}
          onClick={() => onOpenCollection(active.id)}
          aria-label={`View ${active.label}`}
        >
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
        </button>
      </div>
    </section>
  );
}
