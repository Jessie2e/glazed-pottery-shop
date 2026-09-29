import { useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ShopSection from './components/ShopSection';
import CollectionPage from './components/CollectionPage';
import StorySection from './components/StorySection';
import ExperienceHub from './components/ExperienceHub';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import MobileNav from './components/MobileNav';
import StudioSection from './components/StudioSection-';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [activeCollection, setActiveCollection] = useState(null);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__glazedToastTimer);
    window.__glazedToastTimer = window.setTimeout(() => setToast(''), 3600);
  };

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const openCollection = (collectionId) => {
    setActiveCollection(collectionId);
    window.history.replaceState(null, '', `#collection-${collectionId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = (href = '#top') => {
    setActiveCollection(null);
    window.history.replaceState(null, '', href);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  };

  return (
    <div className="app-shell">
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={navigateHome}
      />

      <main>
        {activeCollection ? (
          <CollectionPage
            collectionId={activeCollection}
            onBack={() => navigateHome('#shop')}
            onAddToCart={addToCart}
          />
        ) : (
          <>
            <Hero />
            <ShopSection onOpenCollection={openCollection} />
            <ExperienceHub onToast={showToast} />
            <StorySection />
            <StudioSection />
            <Reviews />
          </>
        )}
      </main>

      <Footer onToast={showToast} onNavigate={navigateHome} />
      <MobileNav
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={navigateHome}
      />
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onIncrement={(id) => updateQuantity(id, 1)}
        onDecrement={(id) => updateQuantity(id, -1)}
        onRemove={(id) =>
          setCartItems((current) => current.filter((item) => item.id !== id))
        }
        onToast={showToast}
      />
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
