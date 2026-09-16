import { ArrowUpRight } from 'lucide-react';

export default function StorySection() {
  return (
    <section className="story-section" id="story">
      <div className="story-composite artist-story-composite">
        <div className="mandy-quote-panel">
          <img src="/assets/logomark.png" alt="" aria-hidden="true" />
          <blockquote>
            “My pieces are designed to make the simple things in life a little easier and a little more beautiful.”
          </blockquote>
          <span>— MANDY KROLAK, OWNER · CREATOR · DESIGNER</span>
        </div>

        <figure className="story-product-panel artist-story-image">
          <img
            src="/assets/sponge-holder.jpeg"
            alt="Glazed Pottery Shop self-draining ceramic sponge holder in use by a kitchen sink"
          />
          <figcaption>FUNCTION, BUILT INTO THE FORM</figcaption>
        </figure>

        <div className="story-work-panel artist-bio-panel">
          <div className="story-work-accent" aria-hidden="true" />
          <p className="eyebrow">MEET THE ARTIST</p>
          <h2>Mandy Krolak</h2>
          <div className="artist-bio-copy">
            <p>
              Mandy is the owner, creator and designer behind Glazed Pottery Shop in Gypsum, Colorado. Her work starts with a practical question: how can an everyday object feel better to use — and still have enough personality to make you smile?
            </p>
            <p>
              From wheel-thrown forms to glazes mixed from scratch, her process is rooted in curiosity, experimentation and function. She makes pottery for real homes and real routines, with thoughtful details that make ordinary moments a little more beautiful.
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
