import { useState } from 'react'
import product1 from '../../assets/product1.jpg'
import product2 from '../../assets/product2.jpg'
import type { UserSession, OrderItem } from '../../types/dashboard'
import './CustomerDashboard.css'

interface CustomerDashboardProps {
  user: UserSession
  onBackToStore: () => void
}

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
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'wishlist'>('orders')
  const [orders] = useState<OrderItem[]>(INITIAL_ORDERS)
  const [phone, setPhone] = useState('+94 77 123 4567')
  const [address, setAddress] = useState('No. 45 Galle Road, Colombo 03, Sri Lanka')
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  return (
    <div className="customer-dashboard">
      {/* Header */}
      <div className="cd-header">
        <div className="cd-user-intro">
          <div className="cd-badge-group" style={{ marginBottom: 8 }}>
            <span className="cd-tier-badge">⚡ VIP Member</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--grey-400)' }}>Customer Account</span>
          </div>
          <h1>Welcome, {user.name}</h1>
          <p>{user.email} · Exclusive Member since Oct 2026</p>
        </div>

        <button className="cd-back-btn" onClick={onBackToStore}>
          ← Back to Store
        </button>
      </div>

      {/* Stats Summary */}
      <div className="cd-stats-grid">
        <div className="cd-stat-card">
          <div className="cd-stat-icon">📦</div>
          <div>
            <div className="cd-stat-num">{orders.length}</div>
            <div className="cd-stat-label">Total Orders</div>
          </div>
        </div>

        <div className="cd-stat-card">
          <div className="cd-stat-icon">⚡</div>
          <div>
            <div className="cd-stat-num">520</div>
            <div className="cd-stat-label">Drop Loyalty Points</div>
          </div>
        </div>

        <div className="cd-stat-card">
          <div className="cd-stat-icon">❤️</div>
          <div>
            <div className="cd-stat-num">3</div>
            <div className="cd-stat-label">Wishlist Items</div>
          </div>
        </div>

        <div className="cd-stat-card">
          <div className="cd-stat-icon">🎟️</div>
          <div>
            <div className="cd-stat-num">10% OFF</div>
            <div className="cd-stat-label">Active Member Code</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="cd-nav-tabs">
        <button
          className={`cd-tab-btn${activeTab === 'orders' ? ' active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders & Drops
        </button>
        <button
          className={`cd-tab-btn${activeTab === 'profile' ? ' active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Shipping & Profile
        </button>
        <button
          className={`cd-tab-btn${activeTab === 'wishlist' ? ' active' : ''}`}
          onClick={() => setActiveTab('wishlist')}
        >
          Saved Wishlist
        </button>
      </div>

      {/* Tab 1: Orders (Horizontal Streetwear Card Scroll) */}
      {activeTab === 'orders' && (
        <div>
          <div className="cd-section-header-row">
            <div>
              <h3 className="cd-section-title">My Streetwear Drops & Orders</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--grey-400)' }}>
                Scroll horizontally to view your orders, delivery status, and tracking updates.
              </p>
            </div>
          </div>

          <div className="cd-cards-scroll-container">
            {orders.map((order) => (
              <article key={order.id} className="cd-order-card">
                <div className="cd-order-img-wrap">
                  <img src={order.image} alt={order.productName} className="cd-order-img" />
                  <div className="cd-order-card-badge">
                    <span className={`cd-order-status-badge status-${order.status}`}>
                      ● {order.status}
                    </span>
                  </div>
                </div>

                <div className="cd-order-body">
                  <h4 className="cd-order-title">{order.productName}</h4>
                  <div className="cd-order-meta">Order ID: <strong>{order.id}</strong></div>
                  <div className="cd-order-meta">Date: {order.date}</div>

                  <div>
                    <span className="cd-order-size-highlight">
                      Size: {order.size} (Qty: {order.quantity})
                    </span>
                  </div>

                  <div className="cd-order-footer">
                    <span className="cd-order-price">{order.price}</span>
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

      {/* Tab 2: Profile */}
      {activeTab === 'profile' && (
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
              <label>Phone Number for Delivery</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className="cd-field-row">
              <label>Shipping / Delivery Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: 10 }}>
              Update Profile Details
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          <div className="cd-section-header-row">
            <div>
              <h3 className="cd-section-title">Saved Streetwear Drops</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--grey-400)' }}>
                Your saved wishlist items ready for order via WhatsApp or Instagram DM.
              </p>
            </div>
          </div>

          <div className="cd-cards-scroll-container">
            <article className="cd-order-card">
              <div className="cd-order-img-wrap">
                <img src={product1} alt="Skull Thunder Tee" className="cd-order-img" />
                <div className="cd-order-card-badge">
                  <span className="cd-order-status-badge status-Delivered">In Stock</span>
                </div>
              </div>
              <div className="cd-order-body">
                <h4 className="cd-order-title">Skull Thunder Tee — White</h4>
                <div className="cd-order-meta">Chapter One · Heavyweight Ring-spun</div>
                <div className="cd-order-size-highlight">Sizes: S, M, L, XL, XXL</div>
                <div className="cd-order-footer">
                  <span className="cd-order-price">LKR 4,500</span>
                  <button className="cd-track-btn" onClick={onBackToStore}>
                    Order Now →
                  </button>
                </div>
              </div>
            </article>

            <article className="cd-order-card">
              <div className="cd-order-img-wrap">
                <img src={product2} alt="Lightning Skull Tee" className="cd-order-img" />
                <div className="cd-order-card-badge">
                  <span className="cd-order-status-badge status-Processing">Limited Stock</span>
                </div>
              </div>
              <div className="cd-order-body">
                <h4 className="cd-order-title">Lightning Skull Tee — Black</h4>
                <div className="cd-order-meta">Signature Series · 220gsm Cotton</div>
                <div className="cd-order-size-highlight">Sizes: S, M, L (⭐ Rare)</div>
                <div className="cd-order-footer">
                  <span className="cd-order-price">LKR 4,500</span>
                  <button className="cd-track-btn" onClick={onBackToStore}>
                    Order Now →
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  )
}
