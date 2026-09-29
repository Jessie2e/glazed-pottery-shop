import { ArrowLeft, ArrowUpRight, ShoppingBag, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { products } from '../data/products';
import { collections } from './ShopSection';

const ETSY_URL = 'https://www.etsy.com/shop/GlazedPotteryShop';

function ProductCard({ product, onQuickAdd }) {
  return (
    <article className={`product-card ${product.raku ? 'raku-card' : ''}`}>
      <button
        className="product-image-wrap"
        type="button"
        onClick={() => onQuickAdd(product)}
        aria-label={`View ${product.title}`}
      >
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
      <div
        className="quick-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Add ${product.title}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <div className="quick-modal-image"><img src={product.image} alt={product.title} /></div>
        <div className="quick-modal-content">
          <p className="eyebrow">{product.category}</p>
          <h3>{product.title}</h3>
          <div className="price-row">
            <strong>${product.price}</strong>
            <span>{product.stock === 1 ? 'Only 1 available' : `${product.stock} available`}</span>
          </div>
          <p>{product.description}</p>
          <button className="button button-accent button-full" type="button" onClick={() => onAdd(product)}>
            <ShoppingBag size={17} /> ADD TO CART
          </button>
          <small>Prototype checkout. This will connect to Mandy’s Shopify inventory at launch.</small>
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage({ collectionId, onBack, onAddToCart }) {
  const [quickProduct, setQuickProduct] = useState(null);
  const collection = collections.find((item) => item.id === collectionId) || collections[0];

  const visibleProducts = useMemo(
    () => products.filter((product) => collection.productCategories.includes(product.category)),
    [collection],
  );

  const handleAdd = (product) => {
    onAddToCart(product);
    setQuickProduct(null);
  };

  return (
    <section className={`collection-page collection-page--${collection.theme}`}>
      <div className="collection-page__hero">
        <button className="collection-page__back" type="button" onClick={onBack}>
          <ArrowLeft size={16} /> BACK TO GLAZED
        </button>

        <p className="eyebrow">SHOP THE COLLECTION</p>
        <h1>{collection.title}</h1>
        <p>{collection.description}</p>
      </div>

      <div className="collection-page__body">
        <div className="collection-page__results-head">
          <span>{visibleProducts.length ? `${visibleProducts.length} PREVIEW ITEM${visibleProducts.length === 1 ? '' : 'S'}` : 'COLLECTION PREVIEW'}</span>
          <span>FULL INVENTORY WILL SYNC FROM SHOPIFY</span>
        </div>

        {visibleProducts.length ? (
          <div className="collection-page__grid product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickAdd={setQuickProduct} />
            ))}
          </div>
        ) : (
          <div className="empty-category">
            <h3>More pieces are coming from Shopify.</h3>
            <p>Once Mandy approves collaborator access, this collection can pull directly from her existing Shopify catalog.</p>
          </div>
        )}

        <div className="collection-page__shop-all">
          <div>
            <p className="eyebrow">WANT TO SEE EVERYTHING?</p>
            <h2>Shop all {collection.label.toLowerCase()}.</h2>
          </div>
          <a className="button button-dark" href={ETSY_URL} target="_blank" rel="noreferrer">
            SHOP ALL {collection.label.toUpperCase()} <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <QuickAddModal product={quickProduct} onClose={() => setQuickProduct(null)} onAdd={handleAdd} />
    </section>
  );
}
