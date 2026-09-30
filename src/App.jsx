import { useEffect, useMemo, useState } from 'react';
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
import { ShoppingBag } from 'lucide-react';

import {
  createCart,
  addCartLine,
  updateCartLine,
  removeCartLine,
  getCart,
} from './services/shopify';

const CART_STORAGE_KEY = 'glazed-shopify-cart-id';

export default function App() {
  const [shopifyCart, setShopifyCart] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [activeCollection, setActiveCollection] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCartId) {
      return;
    }

    async function restoreCart() {
      try {
        setCartLoading(true);

        const cart = await getCart(savedCartId);

        if (cart) {
          setShopifyCart(cart);
        } else {
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Unable to restore Shopify cart:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      } finally {
        setCartLoading(false);
      }
    }

    restoreCart();
  }, []);

  const saveShopifyCart = (cart) => {
    setShopifyCart(cart);

    if (cart?.id) {
      localStorage.setItem(CART_STORAGE_KEY, cart.id);
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  };

  const cartItems = useMemo(() => {
    if (!shopifyCart?.lines?.nodes) {
      return [];
    }

    return shopifyCart.lines.nodes.map((line) => {
      const variant = line.merchandise;

      return {
        id: line.id,
        variantId: variant.id,
        title: variant.product.title,
        variantTitle: variant.title,
        image:
          variant.image?.url ||
          variant.product.featuredImage?.url ||
          '',
        price: Number(variant.price.amount),
        quantity: line.quantity,
      };
    });
  }, [shopifyCart]);

  const cartCount = shopifyCart?.totalQuantity || 0;

  const showToast = (message) => {
    setToast(message);

    window.clearTimeout(window.__glazedToastTimer);

    window.__glazedToastTimer = window.setTimeout(
      () => setToast(''),
      3600,
    );
  };

  const addToCart = async (product) => {
    if (!product.variantId) {
      showToast('This piece cannot be added right now.');
      return;
    }

    try {
      setCartLoading(true);

      let updatedCart;

      if (!shopifyCart) {
        updatedCart = await createCart(product.variantId, 1);
      } else {
        updatedCart = await addCartLine(
          shopifyCart.id,
          product.variantId,
          1,
        );
      }

      saveShopifyCart(updatedCart);
      setCartOpen(true);
    } catch (error) {
      console.error(error);
      showToast('We could not add that piece to your cart.');
    } finally {
      setCartLoading(false);
    }
  };

  const updateQuantity = async (lineId, delta) => {
    if (!shopifyCart) return;

    const line = shopifyCart.lines.nodes.find(
      (item) => item.id === lineId,
    );

    if (!line) return;

    const newQuantity = line.quantity + delta;

    try {
      setCartLoading(true);

      let updatedCart;

      if (newQuantity <= 0) {
        updatedCart = await removeCartLine(
          shopifyCart.id,
          lineId,
        );
      } else {
        updatedCart = await updateCartLine(
          shopifyCart.id,
          lineId,
          newQuantity,
        );
      }

      saveShopifyCart(updatedCart);
    } catch (error) {
      console.error(error);
      showToast('We could not update your cart.');
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCart = async (lineId) => {
    if (!shopifyCart) return;

    try {
      setCartLoading(true);

      const updatedCart = await removeCartLine(
        shopifyCart.id,
        lineId,
      );

      saveShopifyCart(updatedCart);
    } catch (error) {
      console.error(error);
      showToast('We could not remove that piece.');
    } finally {
      setCartLoading(false);
    }
  };

  const openCollection = (collectionId) => {
    setActiveCollection(collectionId);

    window.history.replaceState(
      null,
      '',
      `#collection-${collectionId}`,
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navigateHome = (href = '#top') => {
    setActiveCollection(null);

    window.history.replaceState(null, '', href);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
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
      <button
  className="mobile-cart-fab"
  type="button"
  onClick={() => setCartOpen(true)}
  aria-label={`Open cart with ${cartCount} item${cartCount === 1 ? '' : 's'}`}
>
  <ShoppingBag size={20} />

  {cartCount > 0 && (
    <span>{cartCount}</span>
  )}
</button>

      <main>
        {activeCollection ? (
          <CollectionPage
            collectionId={activeCollection}
            onBack={() => navigateHome('#shop')}
            onOpenCollection={openCollection}
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

      <Footer
        onToast={showToast}
        onNavigate={navigateHome}
      />

      <MobileNav
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={navigateHome}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        loading={cartLoading}
        checkoutUrl={shopifyCart?.checkoutUrl}
        onClose={() => setCartOpen(false)}
        onIncrement={(id) => updateQuantity(id, 1)}
        onDecrement={(id) => updateQuantity(id, -1)}
        onRemove={removeFromCart}
        onToast={showToast}
      />

      <div
        className={`toast ${toast ? 'is-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
    </div>
  );
}