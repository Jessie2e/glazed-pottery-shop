import {
  ArrowLeft,
  ShoppingBag,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { collections } from './ShopSection';
import { fetchProducts } from '../services/shopify';

function normalize(value = '') {
  return value.toLowerCase().trim();
}

const COLLECTION_TAGS = {
  drinkware: 'glazed-drinkware',
  'dining-entertaining': 'glazed-dining',
  'kitchen-bath': 'glazed-kitchen-bath',
  'decor-raku': 'glazed-decor-raku',
};

function matchesCollection(product, collection) {
  const requiredTag = COLLECTION_TAGS[collection.id];

  if (!requiredTag) {
    return false;
  }

  return (product.tags || []).some(
    (tag) => normalize(tag) === requiredTag,
  );
}

function mapShopifyProduct(product) {
  const variant = product.variants?.nodes?.[0];

  return {
    id: variant?.id || product.id,
    productId: product.id,
    variantId: variant?.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    productType: product.productType,

    category:
      product.productType ||
      product.tags?.[0] ||
      'Handmade Pottery',

    image:
      product.featuredImage?.url ||
      product.images?.nodes?.[0]?.url ||
      '',

    secondaryImage:
      product.images?.nodes?.[1]?.url ||
      product.featuredImage?.url ||
      '',

    price: variant?.price?.amount
      ? Number(variant.price.amount).toFixed(2)
      : '0.00',

    currencyCode: variant?.price?.currencyCode || 'USD',

    stock:
      typeof variant?.quantityAvailable === 'number'
        ? variant.quantityAvailable
        : null,

    availableForSale:
      Boolean(product.availableForSale && variant?.availableForSale),

    tags: product.tags || [],

    raku: product.tags?.some((tag) =>
      normalize(tag).includes('raku'),
    ),
  };
}

function ProductCard({ product, onQuickAdd }) {
  return (
    <article
      className={`product-card ${product.raku ? 'raku-card' : ''}`}
    >
      <button
        className="product-image-wrap"
        type="button"
        onClick={() => onQuickAdd(product)}
        aria-label={`View ${product.title}`}
      >
        {product.image && (
          <img
            className="product-image product-image-primary"
            src={product.image}
            alt={product.title}
          />
        )}

        {product.secondaryImage && (
          <img
            className="product-image product-image-secondary"
            src={product.secondaryImage}
            alt=""
            aria-hidden="true"
          />
        )}

        {product.raku && (
          <span className="smoke" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}

        {product.stock === 1 && (
          <span className="stock-note">ONLY 1 LEFT</span>
        )}

        {!product.availableForSale && (
          <span className="stock-note">SOLD OUT</span>
        )}

        {product.availableForSale && (
          <span className="quick-add-hover">
            <ShoppingBag size={15} /> QUICK ADD
          </span>
        )}
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

  const availabilityText =
    product.stock === 1
      ? 'Only 1 available'
      : typeof product.stock === 'number'
        ? `${product.stock} available`
        : product.availableForSale
          ? 'Available'
          : 'Sold out';

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        className="quick-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Add ${product.title}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="quick-modal-image">
          {product.image && (
            <img src={product.image} alt={product.title} />
          )}
        </div>

        <div className="quick-modal-content">
          <p className="eyebrow">{product.category}</p>

          <h3>{product.title}</h3>

          <div className="price-row">
            <strong>${product.price}</strong>
            <span>{availabilityText}</span>
          </div>

          <p>{product.description}</p>

          <button
            className="button button-accent button-full"
            type="button"
            disabled={!product.availableForSale}
            onClick={() => onAdd(product)}
          >
            <ShoppingBag size={17} />
            {product.availableForSale
              ? 'ADD TO CART'
              : 'SOLD OUT'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage({
  collectionId,
  onBack,
  onOpenCollection,
  onAddToCart,
}) {
  const [quickProduct, setQuickProduct] = useState(null);
  const [shopifyProducts, setShopifyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopifyError, setShopifyError] = useState('');

  const isAll = collectionId === 'all';

  const collection = isAll
    ? {
        id: 'all',
        label: 'View All',
        title: 'Shop All Pottery',
        description:
          'Explore all of the handmade pieces currently available from Glazed Pottery.',
        theme: 'terracotta',
      }
    : collections.find((item) => item.id === collectionId) ||
      collections[0];

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setShopifyError('');

        const products = await fetchProducts();

        if (!cancelled) {
          setShopifyProducts(
            (products || []).map(mapShopifyProduct),
          );
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setShopifyError(
            'We could not load the shop right now.',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    if (isAll) {
      return shopifyProducts;
    }

    return shopifyProducts.filter((product) =>
      matchesCollection(product, collection),
    );
  }, [shopifyProducts, collection, isAll]);

  const handleAdd = (product) => {
    onAddToCart(product);
    setQuickProduct(null);
  };

  const switchCollection = (id) => {
    setQuickProduct(null);
    onOpenCollection(id);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section
      className={`collection-page collection-page--${collection.theme}`}
    >
      <div className="collection-page__hero">
        <button
          className="collection-page__back"
          type="button"
          onClick={onBack}
        >
          <ArrowLeft size={16} /> BACK TO GLAZED
        </button>

        <p className="eyebrow">
          {isAll ? 'THE FULL COLLECTION' : 'SHOP THE COLLECTION'}
        </p>

        <h1>{collection.title}</h1>

        <p>{collection.description}</p>

        <nav
          className="collection-page__tabs"
          aria-label="Shop pottery collections"
        >
          <button
            type="button"
            className={isAll ? 'is-active' : ''}
            onClick={() => switchCollection('all')}
          >
            VIEW ALL
          </button>

          {collections.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                !isAll && collection.id === item.id
                  ? 'is-active'
                  : ''
              }
              onClick={() => switchCollection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="collection-page__body">
        <div className="collection-page__results-head">
          <span>
            {loading
              ? 'LOADING PIECES...'
              : `${visibleProducts.length} PIECE${
                  visibleProducts.length === 1 ? '' : 'S'
                }`}
          </span>

          <span>HANDMADE BY GLAZED POTTERY</span>
        </div>

        {loading ? (
          <div className="empty-category">
            <h3>Loading the kiln...</h3>
            <p>Gathering the latest pieces from the studio.</p>
          </div>
        ) : shopifyError ? (
          <div className="empty-category">
            <h3>We hit a little snag.</h3>
            <p>{shopifyError}</p>
          </div>
        ) : visibleProducts.length ? (
          <div className="collection-page__grid product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={setQuickProduct}
              />
            ))}
          </div>
        ) : (
          <div className="empty-category">
            <h3>No pieces are listed here just yet.</h3>
            <p>
              Check back soon for fresh work from the studio.
            </p>
          </div>
        )}
      </div>

      <QuickAddModal
        product={quickProduct}
        onClose={() => setQuickProduct(null)}
        onAdd={handleAdd}
      />
    </section>
  );
}