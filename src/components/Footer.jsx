import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

function InstagramIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer({ onClayTap }) {
  return (
    <footer className="site-footer">
      <div className="footer-newsletter">
        <div>
          <p className="eyebrow">STAY CLOSE TO THE STUDIO</p>
          <h3>Shop drops, class dates + studio notes.</h3>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="EMAIL ADDRESS" aria-label="Email address" required />
          <button type="submit">JOIN <ArrowUpRight size={16} /></button>
        </form>
      </div>

      <div className="footer-main">
        <div className="footer-brand-block">
          <img src="/assets/logo-horizontal-transparent.png" alt="Glazed Pottery Shop" />
          <p>Innovative handcrafted pottery for the home, made by Mandy Krolak in Colorado.</p>
        </div>

        <div className="footer-links">
          <div>
            <strong>SHOP</strong>
            <a href="#shop">Current work</a>
            <a href="#glaze-lab">Raku + glaze</a>
          </div>
          <div>
            <strong>STUDIO</strong>
            <a href="#experiences">Classes</a>
            <a href="#experiences">Studio time</a>
            <a href="#membership">Membership</a>
          </div>
          <div>
            <strong>CONNECT</strong>
            <a href="mailto:glazedpotteryshop@gmail.com"><Mail size={14} /> Email Mandy</a>
            <a href="https://www.instagram.com/glazedpottery/" target="_blank" rel="noreferrer"><InstagramIcon size={14} /> Instagram</a>
            <button onClick={onClayTap}><MapPin size={14} /> Colorado clay note</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} GLAZED POTTERY SHOP</span>
        <span>EAGLE, COLORADO</span>
      </div>
    </footer>
  );
}
