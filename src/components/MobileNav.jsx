import { CalendarDays, ShoppingBag, Store } from 'lucide-react';

export default function MobileNav({ cartCount, onCartOpen, onNavigate }) {
  return (
    <nav className="mobile-bottom-nav" aria-label="Quick actions">
      <a href="#shop" onClick={(event) => { if (onNavigate) { event.preventDefault(); onNavigate('#shop'); } }}><Store size={18} /><span>SHOP</span></a>
      <a href="#experiences" onClick={(event) => { if (onNavigate) { event.preventDefault(); onNavigate('#experiences'); } }}><CalendarDays size={18} /><span>BOOK</span></a>
      <button onClick={onCartOpen}><ShoppingBag size={18} /><span>CART {cartCount ? `· ${cartCount}` : ''}</span></button>
    </nav>
  );
}
