import { useState } from 'react'
import product1 from '../../assets/product1.jpg'
import product2 from '../../assets/product2.jpg'
import product3 from '../../assets/product3.jpg'
import type { UserSession, OrderItem } from '../../types/dashboard'
import './CustomerDashboard.css'

interface CustomerDashboardProps {
  user: UserSession
  onBackToStore: () => void
}

interface CatalogProduct {
  id: number
  name: string
  category: string
  price: string
  image: string
  availableSizes: string[]
  desc: string
}

const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 101,
    name: 'Skull Thunder Tee — White',
    category: 'T-Shirts',
    price: 'LKR 4,500',
    image: product1,
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    desc: 'Signature heavyweight 100% ring-spun cotton. Twin red lightning graphic.'
  },
  {
    id: 102,
    name: 'Lightning Skull Tee — Black',
    category: 'T-Shirts',
    price: 'LKR 4,500',
    image: product2,
    availableSizes: ['S', 'M', 'L', 'XL'],
    desc: 'The dark variant. Red lightning bolt outline on jet black heavyweight tee.'
  },
  {
    id: 103,
    name: 'VNTGCO Cult Hoodie — Gothic',
    category: 'Hoodies',
    price: 'LKR 7,500',
    image: product3,
    availableSizes: ['M', 'L', 'XL'],
    desc: 'Heavy fleece streetwear hoodie with distressed graphic backprint.'
  }
]

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ORD-9821',
    productName: 'Skull Thunder Tee — White',
    image: product1,
    size: 'L',
    quantity: 1,
    date: 'Oct 20, 2026',
    status: 'Shipped',
    price: 'LKR 4,500'
  },
  {
    id: 'ORD-9740',
    productName: 'Lightning Skull Tee — Black',
    image: product2,
    size: 'XL',
    quantity: 2,
    date: 'Oct 12, 2026',
    status: 'Delivered',
    price: 'LKR 9,000'
  }
]

export default function CustomerDashboard({ user, onBackToStore }: CustomerDashboardProps) {
  const [activeNav, setActiveNav] = useState<'shop' | 'orders' | 'profile' | 'wishlist'>('shop')
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS)
  const [phone, setPhone] = useState('+94 77 123 4567')
  const [address, setAddress] = useState('No. 45 Galle Road, Colombo 03, Sri Lanka')
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Selected sizes state per catalog item: { [productId]: size }
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({
    101: 'L',
    102: 'L',
    103: 'L'
  })

  // Order modal state
  const [activeOrderProduct, setActiveOrderProduct] = useState<CatalogProduct | null>(null)
  const [orderQty, setOrderQty] = useState(1)
  const [orderSpecialNotes, setOrderSpecialNotes] = useState('')

  const handleSelectSize = (productId: number, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }))
  }

  const handleOpenOrderModal = (product: CatalogProduct) => {
    setActiveOrderProduct(product)
    setOrderQty(1)
  }

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeOrderProduct) return

    const chosenSize = selectedSizes[activeOrderProduct.id] || 'L'
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`
    const numericPrice = parseInt(activeOrderProduct.price.replace(/[^\d]/g, ''), 10) || 4500
    const calculatedTotal = `LKR ${(numericPrice * orderQty).toLocaleString()}`

    const newOrder: OrderItem = {
      id: newOrderId,
      productName: activeOrderProduct.name,
      image: activeOrderProduct.image,
      size: chosenSize,
      quantity: orderQty,
      date: 'Just Now',
      status: 'Processing',
      price: calculatedTotal
    }

    setOrders([newOrder, ...orders])
    setActiveOrderProduct(null)
    setActiveNav('orders') // switch to orders view so user sees new order
    alert(`🎉 Order Confirmed!\n\nOrder ID: ${newOrderId}\nItem: ${activeOrderProduct.name}\nSize: ${chosenSize}\nQty: ${orderQty}\nTotal: ${calculatedTotal}\n\nOur team is preparing your drop!`)
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  return (
    <div className="customer-layout">
      {/* ── Left Modern Streetwear Sidebar ── */}
      <aside className="cd-sidebar">
        <div className="cd-sidebar-top">
          <div className="cd-sidebar-brand">
            <div className="cd-sidebar-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div>
              <div className="cd-sidebar-user-name">{user.name}</div>
              <span className="cd-sidebar-tier-tag">⚡ VIP Street Member</span>
            </div>
          </div>
        </div>

        <nav className="cd-sidebar-nav">
          <div className="cd-sidebar-section-title">Lounge Menu</div>

          <button
            className={`cd-sidebar-item${activeNav === 'shop' ? ' active' : ''}`}
            onClick={() => setActiveNav('shop')}
          >
            <div className="cd-sidebar-item-content">
              <span className="cd-item-icon">🛍️</span>
              <span>Shop Next Drop</span>
            </div>
            <span className="cd-item-badge">HOT</span>
          </button>

          <button
            className={`cd-sidebar-item${activeNav === 'orders' ? ' active' : ''}`}
            onClick={() => setActiveNav('orders')}
          >
            <div className="cd-sidebar-item-content">
              <span className="cd-item-icon">📦</span>
              <span>My Orders</span>
            </div>
            <span className="cd-item-badge">{orders.length}</span>
          </button>

          <button
            className={`cd-sidebar-item${activeNav === 'wishlist' ? ' active' : ''}`}
            onClick={() => setActiveNav('wishlist')}
          >
            <div className="cd-sidebar-item-content">
              <span className="cd-item-icon">❤️</span>
              <span>Saved Wishlist</span>
            </div>
          </button>

          <button
            className={`cd-sidebar-item${activeNav === 'profile' ? ' active' : ''}`}
            onClick={() => setActiveNav('profile')}
          >
            <div className="cd-sidebar-item-content">
              <span className="cd-item-icon">📍</span>
              <span>Delivery Details</span>
            </div>
          </button>
        </nav>

        <div className="cd-sidebar-footer">
          <button className="cd-store-switch-btn" onClick={onBackToStore}>
            <span>←</span>
            <span>Return to Main Store</span>
          </button>
        </div>
      </aside>

      {/* ── Main Customer Dashboard Content ── */}
      <main className="cd-main-content">
        {/* Header Greeting */}
        <div className="cd-header-row">
          <div>
            <h1>VIP STREET LOUNGE</h1>
            <p>Welcome back, {user.name} · Explore drops, select custom sizes & order direct.</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="cd-stats-grid">
          <div className="cd-stat-card">
            <div className="cd-stat-icon">📦</div>
            <div>
              <div className="cd-stat-num">{orders.length}</div>
              <div className="cd-stat-label">Total Drops Ordered</div>
            </div>
          </div>

          <div className="cd-stat-card">
            <div className="cd-stat-icon">⚡</div>
            <div>
              <div className="cd-stat-num">520</div>
              <div className="cd-stat-label">Street Loyalty Points</div>
            </div>
          </div>

          <div className="cd-stat-card">
            <div className="cd-stat-icon">🏷️</div>
            <div>
              <div className="cd-stat-num">10% OFF</div>
              <div className="cd-stat-label">Active Member Code</div>
            </div>
          </div>

          <div className="cd-stat-card">
            <div className="cd-stat-icon">🚚</div>
            <div>
              <div className="cd-stat-num">City Express</div>
              <div className="cd-stat-label">Priority Dispatch Partner</div>
            </div>
          </div>
        </div>

        {/* ── Tab: Shop Next Drop with Size Selector & Direct Ordering ── */}
        {activeNav === 'shop' && (
          <div className="cd-section-box">
            <div className="cd-card-head">
              <div>
                <h3 className="cd-card-title">Order Your Next Streetwear Drop</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--grey-400)' }}>
                  Pick your custom size (S, M, L, XL, XXL) and place your order instantly.
                </p>
              </div>
            </div>

            {/* Horizontal Scrollable Drop Cards */}
            <div className="cd-cards-scroll-container">
              {CATALOG_PRODUCTS.map((prod) => {
                const currentChosenSize = selectedSizes[prod.id] || 'L'

                return (
                  <article key={prod.id} className="cd-product-card">
                    <div className="cd-card-img-wrap">
                      <img src={prod.image} alt={prod.name} className="cd-card-img" />
                      <div className="cd-card-badge-top">
                        <span className="cd-order-status-badge status-Delivered">Available Now</span>
                      </div>
                    </div>

                    <div className="cd-card-body">
                      <h4 className="cd-card-title">{prod.name}</h4>
                      <div className="cd-card-price">{prod.price}</div>

                      {/* Size Selector */}
                      <div className="cd-size-selector-wrap">
                        <div className="cd-size-selector-label">
                          <span>Select Size:</span>
                          <strong style={{ color: '#ff5252' }}>Selected: {currentChosenSize}</strong>
                        </div>
                        <div className="cd-size-buttons">
                          {prod.availableSizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              className={`cd-size-btn${currentChosenSize === size ? ' selected' : ''}`}
                              onClick={() => handleSelectSize(prod.id, size)}
                              title={`Choose Size ${size}`}
                            >
                              {size} {size === 'L' ? '⭐' : ''}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Order Now Trigger */}
                      <button
                        type="button"
                        className="cd-order-now-btn"
                        onClick={() => handleOpenOrderModal(prod)}
                      >
                        <span>⚡ Order Size ({currentChosenSize}) Now</span>
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Tab: Customer Orders ── */}
        {activeNav === 'orders' && (
          <div className="cd-section-box">
            <div className="cd-card-head">
              <div>
                <h3 className="cd-card-title">My Streetwear Drops & Orders</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--grey-400)' }}>
                  Scroll horizontally to view your orders, delivery status, and tracking updates.
                </p>
              </div>
            </div>

            <div className="cd-cards-scroll-container">
              {orders.map((order) => (
                <article key={order.id} className="cd-product-card">
                  <div className="cd-card-img-wrap">
                    <img src={order.image} alt={order.productName} className="cd-card-img" />
                    <div className="cd-card-badge-top">
                      <span className={`cd-order-status-badge status-${order.status}`}>
                        ● {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="cd-card-body">
                    <h4 className="cd-card-title">{order.productName}</h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--grey-400)', marginBottom: 4 }}>
                      Order ID: <strong>{order.id}</strong>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--grey-400)', marginBottom: 8 }}>
                      Date: {order.date}
                    </div>

                    <div style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      background: 'rgba(230, 28, 28, 0.15)',
                      border: '1px solid rgba(230, 28, 28, 0.35)',
                      borderRadius: 4,
                      color: '#ff5252',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      marginBottom: 14
                    }}>
                      Size: {order.size} (Qty: {order.quantity})
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="cd-card-price" style={{ margin: 0 }}>{order.price}</span>
                      <button
                        className="cd-track-btn"
                        onClick={() => alert(`Tracking information for ${order.id}:\nStatus: ${order.status}\nCarrier: City Express Courier\nEstimated Delivery: 2-3 business days.`)}
                      >
                        Track Drop 🚚
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Saved Wishlist ── */}
        {activeNav === 'wishlist' && (
          <div className="cd-section-box">
            <div className="cd-card-head">
              <div>
                <h3 className="cd-card-title">Saved Wishlist Pieces</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--grey-400)' }}>
                  Streetwear pieces you saved for later. Select size and claim your drop.
                </p>
              </div>
            </div>

            <div className="cd-cards-scroll-container">
              {CATALOG_PRODUCTS.slice(0, 2).map((prod) => (
                <article key={prod.id} className="cd-product-card">
                  <div className="cd-card-img-wrap">
                    <img src={prod.image} alt={prod.name} className="cd-card-img" />
                    <div className="cd-card-badge-top">
                      <span className="cd-order-status-badge status-Delivered">In Stock</span>
                    </div>
                  </div>
                  <div className="cd-card-body">
                    <h4 className="cd-card-title">{prod.name}</h4>
                    <div className="cd-card-price">{prod.price}</div>
                    <button
                      type="button"
                      className="cd-order-now-btn"
                      onClick={() => handleOpenOrderModal(prod)}
                    >
                      Order Drop Now →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Delivery Profile ── */}
        {activeNav === 'profile' && (
          <div className="cd-profile-card">
            <h3>Delivery & Contact Details</h3>
            {savedSuccess && (
              <div style={{ padding: '10px 14px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#4ade80', borderRadius: 6, marginBottom: 16 }}>
                ✓ Details updated successfully!
              </div>
            )}
            <form onSubmit={handleSaveProfile}>
              <div className="cd-field-row">
                <label>Full Name</label>
                <input type="text" value={user.name} disabled style={{ opacity: 0.7 }} />
              </div>

              <div className="cd-field-row">
                <label>Email Address</label>
                <input type="email" value={user.email} disabled style={{ opacity: 0.7 }} />
              </div>

              <div className="cd-field-row">
                <label>Phone Number for Courier Delivery</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>

              <div className="cd-field-row">
                <label>Shipping / Street Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: 10 }}>
                Update Delivery Details
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ── Direct Drop Checkout Confirmation Modal ── */}
      {activeOrderProduct && (
        <div className="cd-order-modal-backdrop" onClick={() => setActiveOrderProduct(null)}>
          <div className="cd-order-modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="cd-modal-title">CONFIRM DROP ORDER</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--grey-400)', marginBottom: 20 }}>
              Verify your chosen size and delivery details before checkout.
            </p>

            <form onSubmit={handleConfirmOrder}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 20, background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8 }}>
                <img
                  src={activeOrderProduct.image}
                  alt={activeOrderProduct.name}
                  style={{ width: 64, height: 64, borderRadius: 6, objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{activeOrderProduct.name}</div>
                  <div style={{ color: '#ff5252', fontWeight: 800, fontSize: '0.95rem' }}>{activeOrderProduct.price}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--grey-400)', marginTop: 2 }}>
                    Selected Size: <strong style={{ color: '#fff' }}>{selectedSizes[activeOrderProduct.id] || 'L'}</strong>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="cd-field-row">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={orderQty}
                  onChange={(e) => setOrderQty(Math.max(1, Number(e.target.value)))}
                  required
                />
              </div>

              {/* Delivery Address */}
              <div className="cd-field-row">
                <label>Courier Destination Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* Phone */}
              <div className="cd-field-row">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* Customizer Notes */}
              <div className="cd-field-row">
                <label>Custom Notes for Courier (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Call before delivery, Leave at security"
                  value={orderSpecialNotes}
                  onChange={(e) => setOrderSpecialNotes(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setActiveOrderProduct(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Confirm & Place Order 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
