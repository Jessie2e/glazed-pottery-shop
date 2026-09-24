import { ArrowRight, ShoppingBag, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { categories, products } from '../data/products';

function ProductCard({ product, onQuickAdd }) {
  return (
    <article className={`product-card ${product.raku ? 'raku-card' : ''}`}>
      <button className="product-image-wrap" onClick={() => onQuickAdd(product)} aria-label={`View ${product.title}`}>
        <img className="product-image product-image-primary" src={product.image} alt={product.title} />
        <img className="product-image product-image-secondary" src={product.secondaryImage} alt="" aria-hidden="true" />
        {product.raku && <span className="smoke" aria-hidden="true"><i /><i /><i /></span>}
        {product.stock === 1 && <span className="stock-note">ONLY 1 LEFT</span>}
        <span className="quick-add-hover"><ShoppingBag size={15} /> QUICK ADD</span>
      </button>
      <div className="product-meta">
        <div>
          <p>{product.category}</p>
          <h3>{product.title}</h3>
        </div>
        <span>${product.price}</span>
      </div>
    </article>
  );
}

function QuickAddModal({ product, onClose, onAdd }) {
  if (!product) return null;
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="quick-modal" role="dialog" aria-modal="true" aria-label={`Add ${product.title}`} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className="quick-modal-image"><img src={product.image} alt={product.title} /></div>
        <div className="quick-modal-content">
          <p className="eyebrow">{product.category}</p>
          <h3>{product.title}</h3>
          <div className="price-row"><strong>${product.price}</strong><span>{product.stock === 1 ? 'Only 1 available' : `${product.stock} available`}</span></div>
          <p>{product.description}</p>
          <button className="button button-accent button-full" onClick={() => onAdd(product)}><ShoppingBag size={17} /> ADD TO CART</button>
          <small>Prototype checkout. At launch this connects to Shopify.</small>
        </div>
      </div>
    </div>
  );
}

export default function ShopSection({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [quickProduct, setQuickProduct] = useState(null);
  const [migrationVisible, setMigrationVisible] = useState(true);

  const visibleProducts = useMemo(() => (
    activeCategory === 'All' ? products : products.filter((product) => product.category === activeCategory)
  ), [activeCategory]);

  const handleAdd = (product) => {
    onAddToCart(product);
    setQuickProduct(null);
  };

  return (
    <section className="shop-section" id="shop">
      <div className="section-heading-row">
        <div>
          <p className="eyebrow">SHOP THE STUDIO</p>
          <h2>Useful. Beautiful.<br />Made by hand.</h2>
        </div>
        <p className="section-heading-copy">
          Mandy designs pottery around the rituals she actually loves — cooking, entertaining, plants and the everyday objects that earn a place in your home.
        </p>
      </div>

      {migrationVisible && (
        <div className="migration-note">
          <img src="/assets/logomark.png" alt="" aria-hidden="true" />
          <p><strong>COMING FROM ETSY?</strong> You’re in the right place. The Shopify shop will carry over Glazed’s product photos, descriptions and familiar collections.</p>
          <a href="https://www.etsy.com/shop/GlazedPotteryShop" target="_blank" rel="noreferrer">CURRENT ETSY <ArrowRight size={15} /></a>
          <button onClick={() => setMigrationVisible(false)} aria-label="Dismiss Etsy migration note"><X size={16} /></button>
        </div>
      )}

      <div className="category-scroller" aria-label="Product categories">
        {categories.map((category) => (
          <button
            key={category.name}
            className={activeCategory === category.name ? 'is-active' : ''}
            onClick={() => setActiveCategory(category.name)}
            aria-pressed={activeCategory === category.name}
          >
            {category.name}<span>{category.count}</span>
          </button>
        ))}
      </div>

      <div className="shop-results-head">
        <span>{activeCategory === 'All' ? 'FEATURED NOW' : activeCategory.toUpperCase()}</span>
<span>{Math.min(visibleProducts.length, 4)} PREVIEW ITEM{Math.min(visibleProducts.length, 4) === 1 ? '' : 'S'}</span>      </div>

      {visibleProducts.length ? (
        <div className="product-grid">
{visibleProducts.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onQuickAdd={setQuickProduct} />)}        </div>
      ) : (
        <div className="empty-category">
          <h3>Full catalog coming from Shopify.</h3>
          <p>This prototype only includes the photos currently provided. The live store will populate this collection from Shopify automatically.</p>
          <button className="text-link" onClick={() => setActiveCategory('All')}>BACK TO FEATURED <ArrowRight size={15} /></button>
        </div>
      )}

      <div className="shop-all-row">
        <a className="button button-dark" href="https://www.etsy.com/shop/GlazedPotteryShop" target="_blank" rel="noreferrer">VIEW ALL 33 CURRENT ITEMS <ArrowUpRightIcon /></a>
        <span>Shopify-ready catalog structure · fast add-to-cart · mobile-first checkout</span>
      </div>

      <QuickAddModal product={quickProduct} onClose={() => setQuickProduct(null)} onAdd={handleAdd} />
    </section>
  );
}

function ArrowUpRightIcon() {
  return <span aria-hidden="true">↗</span>;
}
