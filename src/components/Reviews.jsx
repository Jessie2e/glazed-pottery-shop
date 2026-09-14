import { Star } from 'lucide-react';
import { reviews } from '../data/products';

export default function Reviews() {
  return (
    <section className="reviews-section">
      <div className="reviews-head">
        <div>
          <p className="eyebrow">FROM THE ETSY YEARS</p>
          <h2>Already loved.<br />Now coming home.</h2>
        </div>
        <div className="review-proof">
          <strong>4.9 <Star size={18} fill="currentColor" /></strong>
          <span>1.3k reviews · 4.5k+ sales · 10 years on Etsy</span>
        </div>
      </div>

      <div className="review-mobile-cue" aria-hidden="true">SWIPE REVIEWS <span>→</span></div>

      <div className="review-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review.quote}>
            <div className="review-stars" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill="currentColor" />)}
            </div>
            <blockquote>“{review.quote}”</blockquote>
            <span>ETSY CUSTOMER · {review.product}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
