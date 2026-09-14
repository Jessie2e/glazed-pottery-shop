import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

export default function CartDrawer({ open, items, onClose, onIncrement, onDecrement, onRemove, onToast }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <>
      <div className={`drawer-backdrop ${open ? 'is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`cart-drawer ${open ? 'is-open' : ''}`} id="cart-drawer" tabIndex="-1" aria-hidden={!open} aria-label="Shopping cart">
        <div className="cart-drawer-header">
          <div><p className="eyebrow">YOUR CART</p><h3>{items.length ? 'GOOD CHOICES.' : 'NEEDS POTTERY.'}</h3></div>
          <button className="drawer-close" onClick={onClose} aria-label="Close cart"><X size={21} /></button>
        </div>
        <div className="cart-items">
          {!items.length && <div className="empty-cart"><ShoppingBag size={35} strokeWidth={1.4} /><p>Your cart is empty. The studio is not.</p><button className="button button-accent" onClick={onClose}>KEEP SHOPPING</button></div>}
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="cart-item-main"><strong>{item.title}</strong><span>${item.price}</span><div className="quantity-control"><button onClick={() => onDecrement(item.id)} aria-label={`Decrease ${item.title}`}><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => onIncrement(item.id)} aria-label={`Increase ${item.title}`}><Plus size={14} /></button></div></div>
              <button className="trash-button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.title}`}><Trash2 size={16} /></button>
            </article>
          ))}
        </div>
        <div className="cart-footer"><div className="cart-total"><span>SUBTOTAL</span><strong>${total.toFixed(2)}</strong></div><p>Shipping + taxes calculated at checkout.</p><button className="button button-accent button-full" disabled={!items.length} onClick={() => onToast('Prototype checkout — this becomes Shopify Checkout at launch.')}>CHECKOUT WITH SHOPIFY</button></div>
      </aside>
    </>
  );
}
