import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const mandyPhotos = [
  {
    src: '/assets/mandy-studio.webp',
    alt: 'Mandy Krolak standing inside the Glazed Pottery Shop studio beneath the Glazed sign',
    caption: 'IN THE STUDIO · GYPSUM, COLORADO',
  },
  {
    src: '/assets/mandy-market-white.webp',
    alt: 'Mandy Krolak at a Glazed Pottery Shop market booth surrounded by handmade pottery',
    caption: 'GLAZED OUT IN THE WILD',
  },
  {
    src: '/assets/mandy-market-color.webp',
    alt: 'Mandy Krolak smiling at her Glazed Pottery Shop market booth',
    caption: 'MAKER · SHOP OWNER · MARKET REGULAR',
  },
];

export default function StorySection() {
  const [activePhoto, setActivePhoto] = useState(0);

  const showPrevious = () => {
    setActivePhoto((current) =>
      current === 0 ? mandyPhotos.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActivePhoto((current) =>
      current === mandyPhotos.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="story-section" id="story">
      <div className="artist-bio-layout">
        <div className="artist-carousel">
          <div className="artist-carousel-frame">
            {mandyPhotos.map((photo, index) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                className={`artist-carousel-image ${
                  index === activePhoto ? 'is-active' : ''
                }`}
              />
            ))}

            <div className="artist-carousel-caption">
              <span>{mandyPhotos[activePhoto].caption}</span>
              <span>
                {String(activePhoto + 1).padStart(2, '0')} /{' '}
                {String(mandyPhotos.length).padStart(2, '0')}
              </span>
            </div>

            <div className="artist-carousel-controls">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous photo of Mandy"
              >
                <ChevronLeft size={19} />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo of Mandy"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>

          <div className="artist-carousel-dots" aria-label="Choose a photo">
            {mandyPhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                className={index === activePhoto ? 'is-active' : ''}
                onClick={() => setActivePhoto(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={index === activePhoto}
              />
            ))}
          </div>
        </div>

        <div className="artist-bio-card">
          <p className="eyebrow">ARTIST BIO</p>
          <h2>Mandy Krolak</h2>

          <blockquote>
            “My pieces are designed to make the simple things in life a little easier and a little more beautiful.”
          </blockquote>

          <div className="artist-bio-copy">
            <p>
              Mandy is the owner, creator and designer behind Glazed Pottery Shop in Gypsum, Colorado. Her work starts with a practical question: how can an everyday object feel better to use — and still have enough personality to make you smile?
            </p>
            <p>
              Her process is rooted in curiosity, experimentation and function. She makes pottery for real homes and real routines, with thoughtful details that make ordinary moments a little more beautiful.
            </p>
            <p>
              Glazed has grown into more than a shop: it is a working studio, a place to learn, a way to meet people at local markets and a home for the pieces Mandy is always dreaming up next.
            </p>
          </div>

          <a className="text-link" href="#markets">
            FIND GLAZED LOCALLY <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
