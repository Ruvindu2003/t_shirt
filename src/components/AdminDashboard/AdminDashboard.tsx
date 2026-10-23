import { useState } from 'react'
import product1 from '../../assets/product1.jpg'
import product2 from '../../assets/product2.jpg'
import product3 from '../../assets/product3.jpg'
import type { UserSession } from '../../types/dashboard'
import './AdminDashboard.css'

interface AdminDashboardProps {
  user: UserSession
  onBackToStore: () => void
}

interface AdminOrder {
  id: string
  customer: string
  product: string
  size: string
  qty: number
  total: string
  status: 'Processing' | 'Shipped' | 'Delivered'
  date: string
}

interface InventoryItem {
  id: number
  name: string
  category: string
  price: string
  sizes: {
    S: number
    M: number
    L: number
    XL: number
    XXL: number
  }
  img: string
}

const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  { id: 'ORD-9821', customer: 'Kasun Perera', product: 'Skull Thunder Tee — White', size: 'L', qty: 1, total: 'LKR 4,500', status: 'Shipped', date: 'Oct 23, 2026' },
  { id: 'ORD-9820', customer: 'Dilshan Silva', product: 'Lightning Skull Tee — Black', size: 'XL', qty: 2, total: 'LKR 9,000', status: 'Processing', date: 'Oct 23, 2026' },
  { id: 'ORD-9819', customer: 'Sithum De Silva', product: 'VNTGCO Cult Hoodie', size: 'M', qty: 1, total: 'LKR 7,500', status: 'Delivered', date: 'Oct 22, 2026' },
  { id: 'ORD-9818', customer: 'Amal Fernando', product: 'Skull Thunder Tee — White', size: 'M', qty: 1, total: 'LKR 4,500', status: 'Delivered', date: 'Oct 21, 2026' },
]

const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 1,
    name: 'Skull Thunder Tee — White',
    category: 'T-Shirts',
    price: 'LKR 4,500',
    sizes: { S: 8, M: 14, L: 16, XL: 5, XXL: 2 },
    img: product1
  },
  {
    id: 2,
    name: 'Lightning Skull Tee — Black',
    category: 'T-Shirts',
    price: 'LKR 4,500',
    sizes: { S: 4, M: 2, L: 1, XL: 1, XXL: 0 },
    img: product2
  },
  {
    id: 3,
    name: 'VNTGCO Cult Hoodie',
    category: 'Hoodies',
    price: 'LKR 7,500',
    sizes: { S: 2, M: 5, L: 4, XL: 1, XXL: 0 },
    img: product3
  },
]

export default function AdminDashboard({ user, onBackToStore }: AdminDashboardProps) {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ADMIN_ORDERS)
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY)
  const [activeNav, setActiveNav] = useState<'analytics' | 'inventory' | 'orders' | 'sizes'>('inventory')
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('T-Shirts')
  const [newPrice, setNewPrice] = useState('4500')
  const [newImage, setNewImage] = useState<string>(product1)
  const [newImageFileName, setNewImageFileName] = useState<string>('')
  const [newQtyS, setNewQtyS] = useState(10)
  const [newQtyM, setNewQtyM] = useState(15)
  const [newQtyL, setNewQtyL] = useState(15)
  const [newQtyXL, setNewQtyXL] = useState(8)
  const [newQtyXXL, setNewQtyXXL] = useState(4)

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewImageFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewImage(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Calculations for total sizes across all inventory
  const totalS = inventory.reduce((sum, item) => sum + item.sizes.S, 0)
  const totalM = inventory.reduce((sum, item) => sum + item.sizes.M, 0)
  const totalL = inventory.reduce((sum, item) => sum + item.sizes.L, 0)
  const totalXL = inventory.reduce((sum, item) => sum + item.sizes.XL, 0)
  const totalXXL = inventory.reduce((sum, item) => sum + item.sizes.XXL, 0)
  const grandTotalUnits = totalS + totalM + totalL + totalXL + totalXXL

  const handleStatusChange = (orderId: string, newStatus: 'Processing' | 'Shipped' | 'Delivered') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
  }

  // Delete product action
  const handleDeleteProduct = (id: number, name: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}" from store inventory?`)
    if (confirmDelete) {
      setInventory(prev => prev.filter(item => item.id !== id))
    }
  }

  // Quick size stock increment/decrement
  const handleUpdateSizeStock = (id: number, size: 'S' | 'M' | 'L' | 'XL' | 'XXL', delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const currentQty = item.sizes[size]
        const updatedQty = Math.max(0, currentQty + delta)
        return {
          ...item,
          sizes: {
            ...item.sizes,
            [size]: updatedQty
          }
        }
      }
      return item
    }))
  }

  // Handle Add New Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName) return

    const newProduct: InventoryItem = {
      id: Date.now(),
      name: newName,
      category: newCategory,
      price: `LKR ${Number(newPrice).toLocaleString()}`,
      sizes: {
        S: Number(newQtyS) || 0,
        M: Number(newQtyM) || 0,
        L: Number(newQtyL) || 0,
        XL: Number(newQtyXL) || 0,
        XXL: Number(newQtyXXL) || 0,
      },
      img: newImage
    }

    setInventory(prev => [newProduct, ...prev])
    setIsAddModalOpen(false)
    setNewName('')
    setNewImage(product1)
    setNewImageFileName('')
    alert(`"${newName}" added with uploaded image to your collection inventory!`)
  }

  return (
    <div className="admin-layout">
      {/* ── Left Modern Streetwear Sidebar ── */}
      <aside className="ad-sidebar">
        <div className="ad-sidebar-top">
          <div className="ad-sidebar-brand">
            <div className="ad-sidebar-avatar">⚡</div>
            <div>
              <div className="ad-sidebar-user-name">{user.name}</div>
              <span className="ad-sidebar-role-tag">Admin Console</span>
            </div>
          </div>
        </div>

        <nav className="ad-sidebar-nav">
          <div className="ad-sidebar-section-title">Navigation</div>

          <button
            className={`ad-sidebar-item${activeNav === 'inventory' ? ' active' : ''}`}
            onClick={() => setActiveNav('inventory')}
          >
            <div className="ad-sidebar-item-content">
              <span className="ad-item-icon">👕</span>
              <span>Inventory & Drops</span>
            </div>
            <span className="ad-item-badge">{inventory.length}</span>
          </button>

          <button
            className={`ad-sidebar-item${activeNav === 'sizes' ? ' active' : ''}`}
            onClick={() => setActiveNav('sizes')}
          >
            <div className="ad-sidebar-item-content">
              <span className="ad-item-icon">📏</span>
              <span>Size Stock Matrix</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#ff5252', fontWeight: 700 }}>L: {totalL}</span>
          </button>

          <button
            className={`ad-sidebar-item${activeNav === 'orders' ? ' active' : ''}`}
            onClick={() => setActiveNav('orders')}
          >
            <div className="ad-sidebar-item-content">
              <span className="ad-item-icon">📦</span>
              <span>Customer Orders</span>
            </div>
            <span className="ad-item-badge">{orders.length}</span>
          </button>

          <button
            className={`ad-sidebar-item${activeNav === 'analytics' ? ' active' : ''}`}
            onClick={() => setActiveNav('analytics')}
          >
            <div className="ad-sidebar-item-content">
              <span className="ad-item-icon">📊</span>
              <span>Revenue & KPIs</span>
            </div>
          </button>
        </nav>

        <div className="ad-sidebar-footer">
          <button className="ad-store-switch-btn" onClick={onBackToStore}>
            <span>🛍️</span>
            <span>View Public Store</span>
          </button>
        </div>
      </aside>

      {/* ── Main Dashboard Workspace ── */}
      <main className="ad-main-content">
        <div className="ad-header-row">
          <div>
            <h1>VNTGCO DROP COMMAND CENTER</h1>
            <p>Control streetwear drops, monitor real-time size stock, and fulfill youth orders.</p>
          </div>

          <button
            className="btn-primary"
            onClick={() => setIsAddModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span>+</span>
            <span>Add New Shirt / Drop</span>
          </button>
        </div>

        {/* ── KPI Metric Cards ── */}
        <div className="ad-metrics-grid">
          <div className="ad-metric-card">
            <div className="ad-metric-top">
              <span className="ad-metric-title">Total Stock in Vault</span>
              <span className="ad-metric-icon">👕</span>
            </div>
            <div className="ad-metric-val">{grandTotalUnits}</div>
            <div className="ad-metric-change">Units across {inventory.length} designs</div>
          </div>

          <div className="ad-metric-card">
            <div className="ad-metric-top">
              <span className="ad-metric-title">Large (L) Available</span>
              <span className="ad-metric-icon">🔥</span>
            </div>
            <div className="ad-metric-val">{totalL} pcs</div>
            <div className="ad-metric-change" style={{ color: '#ff5252' }}>Most demanded youth size</div>
          </div>

          <div className="ad-metric-card">
            <div className="ad-metric-top">
              <span className="ad-metric-title">Total Revenue</span>
              <span className="ad-metric-icon">💰</span>
            </div>
            <div className="ad-metric-val">LKR 182,500</div>
            <div className="ad-metric-change">↑ 24% Chapter One drop</div>
          </div>

          <div className="ad-metric-card">
            <div className="ad-metric-top">
              <span className="ad-metric-title">Pending Orders</span>
              <span className="ad-metric-icon">🚚</span>
            </div>
            <div className="ad-metric-val">{orders.filter(o => o.status !== 'Delivered').length}</div>
            <div className="ad-metric-change" style={{ color: '#facc15' }}>Requires dispatch</div>
          </div>
        </div>

        {/* ── Size Stock Matrix Card ── */}
        {(activeNav === 'sizes' || activeNav === 'inventory') && (
          <div className="ad-size-breakdown-card">
            <div className="ad-card-head">
              <div>
                <h3 className="ad-card-title">Real-Time Size Inventory (Youth Demand)</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--grey-400)' }}>
                  Total quantity of Large (L), Medium (M), and other sizes currently in stock
                </p>
              </div>
            </div>

            <div className="ad-size-chips-grid">
              <div className="ad-size-chip">
                <div>
                  <div className="ad-size-label">SIZE S</div>
                  <div className="ad-size-sub">Small Slim</div>
                </div>
                <div className="ad-size-qty">{totalS} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>pcs</span></div>
              </div>

              <div className="ad-size-chip">
                <div>
                  <div className="ad-size-label">SIZE M</div>
                  <div className="ad-size-sub">Medium Fit</div>
                </div>
                <div className="ad-size-qty">{totalM} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>pcs</span></div>
              </div>

              <div className="ad-size-chip" style={{ borderColor: 'rgba(230, 28, 28, 0.5)', background: 'rgba(230, 28, 28, 0.08)' }}>
                <div>
                  <div className="ad-size-label" style={{ color: '#ff5252' }}>SIZE L ⭐</div>
                  <div className="ad-size-sub" style={{ color: '#ff5252' }}>Large (High Youth Demand)</div>
                </div>
                <div className="ad-size-qty" style={{ color: '#fff' }}>{totalL} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>pcs</span></div>
              </div>

              <div className="ad-size-chip">
                <div>
                  <div className="ad-size-label">SIZE XL</div>
                  <div className="ad-size-sub">Extra Large Oversize</div>
                </div>
                <div className="ad-size-qty">{totalXL} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>pcs</span></div>
              </div>

              <div className="ad-size-chip">
                <div>
                  <div className="ad-size-label">SIZE XXL</div>
                  <div className="ad-size-sub">Super Boxy Oversize</div>
                </div>
                <div className="ad-size-qty">{totalXXL} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>pcs</span></div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Inventory & Drops (with Delete & Size Control) ── */}
        {(activeNav === 'inventory' || activeNav === 'sizes') && (
          <div className="ad-section-box">
            <div className="ad-card-head">
              <div>
                <h3 className="ad-card-title">Manage Streetwear Drops & Stock</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--grey-400)' }}>
                  Horizontal scrollable cards or table view — manage size stock & quick delete.
                </p>
              </div>

              {/* View Switcher: Cards vs Table */}
              <div className="ad-view-switcher">
                <button
                  type="button"
                  className={`ad-view-btn${viewMode === 'cards' ? ' active' : ''}`}
                  onClick={() => setViewMode('cards')}
                >
                  <span>🎴</span>
                  <span>Card Scroll</span>
                </button>
                <button
                  type="button"
                  className={`ad-view-btn${viewMode === 'table' ? ' active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  <span>📋</span>
                  <span>Table View</span>
                </button>
              </div>
            </div>

            {/* ── CARD HORIZONTAL SCROLL VIEW ── */}
            {viewMode === 'cards' && (
              <div className="ad-cards-scroll-container">
                {inventory.map((item) => {
                  const itemTotal = item.sizes.S + item.sizes.M + item.sizes.L + item.sizes.XL + item.sizes.XXL
                  const isLow = itemTotal <= 10
                  const isOutOfStock = itemTotal === 0

                  return (
                    <article key={item.id} className="ad-product-card">
                      {/* Image Wrap */}
                      <div className="ad-card-img-wrap">
                        <img src={item.img} alt={item.name} className="ad-card-img" />
                        <div className="ad-card-badge-top">
                          <span className="ad-card-cat-badge">{item.category}</span>
                          <span className={`ad-stock-pill ${isOutOfStock ? 'stock-out' : isLow ? 'stock-low' : 'stock-high'}`}>
                            {isOutOfStock ? 'Sold Out' : isLow ? 'Low Stock' : 'In Stock'}
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="ad-card-body">
                        <div className="ad-card-title-row">
                          <h4 className="ad-card-item-title">{item.name}</h4>
                          <span className="ad-card-price">{item.price}</span>
                        </div>

                        {/* Sizes Grid */}
                        <div className="ad-card-sizes-block">
                          <div className="ad-card-sizes-label">
                            <span>Sizes In Vault</span>
                            <span style={{ color: '#fff', fontWeight: 800 }}>Total: {itemTotal}</span>
                          </div>
                          <div className="ad-card-size-pills">
                            <span className="ad-card-size-pill">S: {item.sizes.S}</span>
                            <span className="ad-card-size-pill">M: {item.sizes.M}</span>
                            <span className="ad-card-size-pill highlight-large">L: {item.sizes.L} ⭐</span>
                            <span className="ad-card-size-pill">XL: {item.sizes.XL}</span>
                            <span className="ad-card-size-pill">XXL: {item.sizes.XXL}</span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="ad-card-footer-actions">
                          <div className="ad-card-btn-group">
                            <button
                              className="ad-action-btn"
                              onClick={() => handleUpdateSizeStock(item.id, 'L', 1)}
                              title="Add 1 Large size"
                            >
                              +1 L
                            </button>
                            <button
                              className="ad-action-btn"
                              onClick={() => handleUpdateSizeStock(item.id, 'L', -1)}
                              title="Reduce 1 Large size"
                            >
                              -1 L
                            </button>
                          </div>

                          <button
                            className="ad-delete-btn"
                            onClick={() => handleDeleteProduct(item.id, item.name)}
                            title="Delete product"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            {/* ── TABLE VIEW ── */}
            {viewMode === 'table' && (
              <div className="ad-table-wrap">
                <table className="ad-table">
                  <thead>
                    <tr>
                      <th>Product Drop</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Sizes Breakdown (S / M / L / XL / XXL)</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => {
                      const itemTotal = item.sizes.S + item.sizes.M + item.sizes.L + item.sizes.XL + item.sizes.XXL
                      const isLow = itemTotal <= 10
                      const isOutOfStock = itemTotal === 0

                      return (
                        <tr key={item.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <img src={item.img} alt={item.name} className="ad-prod-thumb" />
                              <div>
                                <strong>{item.name}</strong>
                                <div style={{ fontSize: '0.74rem', color: 'var(--grey-400)' }}>ID: #{item.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>{item.category}</td>
                          <td>{item.price}</td>
                          <td>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                              <span style={{ fontSize: '0.78rem' }}>S: <strong>{item.sizes.S}</strong></span>
                              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                              <span style={{ fontSize: '0.78rem' }}>M: <strong>{item.sizes.M}</strong></span>
                              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                              {/* Large highlighted */}
                              <span style={{
                                fontSize: '0.82rem',
                                padding: '2px 8px',
                                background: item.sizes.L > 0 ? 'rgba(230, 28, 28, 0.2)' : 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(230, 28, 28, 0.4)',
                                borderRadius: 4,
                                color: item.sizes.L > 0 ? '#ff5252' : '#888'
                              }}>
                                L: <strong>{item.sizes.L}</strong>
                              </span>
                              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                              <span style={{ fontSize: '0.78rem' }}>XL: <strong>{item.sizes.XL}</strong></span>
                              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                              <span style={{ fontSize: '0.78rem' }}>XXL: <strong>{item.sizes.XXL}</strong></span>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <strong style={{ fontSize: '1.05rem' }}>{itemTotal}</strong>
                              <span className={`ad-stock-pill ${isOutOfStock ? 'stock-out' : isLow ? 'stock-low' : 'stock-high'}`}>
                                {isOutOfStock ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <button
                                className="ad-action-btn"
                                onClick={() => handleUpdateSizeStock(item.id, 'L', 1)}
                                title="Add 1 Large size"
                              >
                                +1 L
                              </button>
                              <button
                                className="ad-action-btn"
                                onClick={() => handleUpdateSizeStock(item.id, 'L', -1)}
                                title="Reduce 1 Large size"
                              >
                                -1 L
                              </button>
                              <button
                                className="ad-delete-btn"
                                onClick={() => handleDeleteProduct(item.id, item.name)}
                                title="Delete product from collection"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Customer Orders ── */}
        {(activeNav === 'orders' || activeNav === 'analytics') && (
          <div className="ad-section-box">
            <div className="ad-card-head">
              <div>
                <h3 className="ad-card-title">Live Orders & Status Processing</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--grey-400)' }}>
                  Update tracking status to notify street customers in real-time.
                </p>
              </div>
            </div>

            <div className="ad-table-wrap">
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Item & Size</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td><strong>{o.id}</strong></td>
                      <td>{o.customer}</td>
                      <td>{o.product} <span style={{ color: '#ff5252', fontWeight: 700 }}>({o.size})</span> × {o.qty}</td>
                      <td>{o.total}</td>
                      <td>{o.date}</td>
                      <td>
                        <select
                          className="ad-status-select"
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value as any)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ── Add New Product Modal ── */}
      {isAddModalOpen && (
        <div className="ad-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="ad-modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="ad-modal-title">ADD NEW STREETWEAR DROP</h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--grey-400)' }}>
              Set up your new T-shirt or Hoodie and allocate sizes for youth buyers.
            </p>

            <form onSubmit={handleCreateProduct}>
              <div className="ad-form-grid">
                {/* ── T-Shirt Image Upload Area ── */}
                <div className="ad-input-group ad-field-full">
                  <label>📸 T-Shirt Design / Product Photo</label>
                  <label htmlFor="tshirt-image-upload" className="ad-upload-dropzone">
                    <input
                      id="tshirt-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                    />

                    {newImageFileName ? (
                      <div className="ad-upload-preview-wrap">
                        <img
                          src={newImage}
                          alt="T-Shirt preview"
                          className="ad-upload-preview-img"
                        />
                        <div className="ad-upload-info">
                          <div className="ad-upload-filename">✓ {newImageFileName}</div>
                          <span className="ad-upload-reselect">Click to choose a different photo</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: '2rem' }}>👕 📁</div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>
                          Click here or Drag & Drop T-Shirt Image
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--grey-400)' }}>
                          Supports JPG, PNG, WEBP (Instant preview)
                        </div>
                      </>
                    )}
                  </label>
                </div>

                <div className="ad-input-group ad-field-full">
                  <label>Product Design Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Acid Skull Thunder Vintage Tee"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>

                <div className="ad-input-group">
                  <label>Category</label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="Oversized">Oversized Cuts</option>
                  </select>
                </div>

                <div className="ad-input-group">
                  <label>Price (LKR)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    required
                  />
                </div>

                {/* Size breakdown fields */}
                <div className="ad-field-full" style={{ marginTop: 6 }}>
                  <label style={{ fontFamily: 'var(--font-accent)', fontSize: '0.75rem', color: '#ff5252', fontWeight: 700, textTransform: 'uppercase' }}>
                    Allocate Size Quantities:
                  </label>
                </div>

                <div className="ad-input-group">
                  <label>Size S</label>
                  <input type="number" min="0" value={newQtyS} onChange={(e) => setNewQtyS(Number(e.target.value))} />
                </div>

                <div className="ad-input-group">
                  <label>Size M</label>
                  <input type="number" min="0" value={newQtyM} onChange={(e) => setNewQtyM(Number(e.target.value))} />
                </div>

                <div className="ad-input-group">
                  <label style={{ color: '#ff5252' }}>Size L (Large)</label>
                  <input type="number" min="0" value={newQtyL} onChange={(e) => setNewQtyL(Number(e.target.value))} />
                </div>

                <div className="ad-input-group">
                  <label>Size XL</label>
                  <input type="number" min="0" value={newQtyXL} onChange={(e) => setNewQtyXL(Number(e.target.value))} />
                </div>

                <div className="ad-input-group">
                  <label>Size XXL</label>
                  <input type="number" min="0" value={newQtyXXL} onChange={(e) => setNewQtyXXL(Number(e.target.value))} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Publish Drop 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
