import { ArrowUpRight } from 'lucide-react';

export default function StorySection() {
  return (
    <section className="story-section" id="story">
      <div className="story-composite">
        <div className="mandy-quote-panel">
          <img src="/assets/logomark.png" alt="" aria-hidden="true" />
          <blockquote>
            “My pieces are designed to make the simple things in life a little easier and a little more beautiful.”
          </blockquote>
          <span>— MANDY KROLAK, OWNER · CREATOR · DESIGNER</span>
        </div>

        <figure className="story-product-panel">
          <img
            src="/assets/sponge-holder.jpeg"
            alt="Glazed Pottery Shop self-draining ceramic sponge holder in use by a kitchen sink"
          />
          <figcaption>FUNCTION, BUILT INTO THE FORM</figcaption>
        </figure>

        <div className="story-work-panel">
          <div className="story-work-accent" aria-hidden="true" />
          <p className="eyebrow">THE WORK BEHIND GLAZED</p>
          <h2>Form first.<br />Then fire does its thing.</h2>
          <p className="story-body">
            Wheel-thrown forms, glazes mixed from scratch and firing methods that make every surface its own. Functional pottery with personality, built for daily use.
          </p>
          <a className="text-link" href="#glaze-lab">
            PLAY WITH THE GLAZE LAB <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
