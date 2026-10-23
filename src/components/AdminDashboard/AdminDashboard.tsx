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
  stock: number
  price: string
  status: 'In Stock' | 'Low Stock' | 'Out of Stock'
  img: string
}

const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  { id: 'ORD-9821', customer: 'Kasun Perera', product: 'Skull Thunder Tee — White', size: 'L', qty: 1, total: 'LKR 4,500', status: 'Shipped', date: 'Oct 23, 2026' },
  { id: 'ORD-9820', customer: 'Dilshan Silva', product: 'Lightning Skull Tee — Black', size: 'XL', qty: 2, total: 'LKR 9,000', status: 'Processing', date: 'Oct 23, 2026' },
  { id: 'ORD-9819', customer: 'Sithum De Silva', product: 'VNTGCO Cult Hoodie', size: 'M', qty: 1, total: 'LKR 7,500', status: 'Delivered', date: 'Oct 22, 2026' },
  { id: 'ORD-9818', customer: 'Amal Fernando', product: 'Skull Thunder Tee — White', size: 'M', qty: 1, total: 'LKR 4,500', status: 'Delivered', date: 'Oct 21, 2026' },
]

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 1, name: 'Skull Thunder Tee — White', category: 'T-Shirts', stock: 45, price: 'LKR 4,500', status: 'In Stock', img: product1 },
  { id: 2, name: 'Lightning Skull Tee — Black', category: 'T-Shirts', stock: 8, price: 'LKR 4,500', status: 'Low Stock', img: product2 },
  { id: 3, name: 'VNTGCO Cult Hoodie', category: 'Hoodies', stock: 12, price: 'LKR 7,500', status: 'In Stock', img: product3 },
]

export default function AdminDashboard({ user, onBackToStore }: AdminDashboardProps) {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ADMIN_ORDERS)
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY)
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory'>('overview')

  const handleStatusChange = (orderId: string, newStatus: 'Processing' | 'Shipped' | 'Delivered') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
  }

  const handleStockUpdate = (id: number, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + delta)
        const newStatus = newStock === 0 ? 'Out of Stock' : newStock <= 10 ? 'Low Stock' : 'In Stock'
        return { ...item, stock: newStock, status: newStatus }
      }
      return item
    }))
  }

  return (
    <div className="admin-dashboard">
      {/* Admin Header */}
      <div className="ad-header">
        <div>
          <div className="ad-badge-group" style={{ marginBottom: 8 }}>
            <span className="ad-admin-badge">⚡ Admin Control Center</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--grey-400)' }}>Full Business Access</span>
          </div>
          <h1>{user.name}'s Dashboard</h1>
          <p>Store analytics, drop inventory control, and customer orders</p>
        </div>

        <div className="ad-header-actions">
          <button className="btn-outline" onClick={onBackToStore}>
            👁️ View Public Store
          </button>
        </div>
      </div>

      {/* Admin Metrics Cards */}
      <div className="ad-metrics-grid">
        <div className="ad-metric-card">
          <div className="ad-metric-top">
            <span className="ad-metric-title">Total Revenue</span>
            <span className="ad-metric-icon">💰</span>
          </div>
          <div className="ad-metric-val">LKR 182,500</div>
          <div className="ad-metric-change">↑ 24% this week's drop</div>
        </div>

        <div className="ad-metric-card">
          <div className="ad-metric-top">
            <span className="ad-metric-title">Orders Received</span>
            <span className="ad-metric-icon">📦</span>
          </div>
          <div className="ad-metric-val">42</div>
          <div className="ad-metric-change">↑ 8 new today</div>
        </div>

        <div className="ad-metric-card">
          <div className="ad-metric-top">
            <span className="ad-metric-title">Stock Units</span>
            <span className="ad-metric-icon">👕</span>
          </div>
          <div className="ad-metric-val">{inventory.reduce((a, b) => a + b.stock, 0)}</div>
          <div className="ad-metric-change" style={{ color: '#facc15' }}>1 product low stock</div>
        </div>

        <div className="ad-metric-card">
          <div className="ad-metric-top">
            <span className="ad-metric-title">Active VIP Members</span>
            <span className="ad-metric-icon">👥</span>
          </div>
          <div className="ad-metric-val">128</div>
          <div className="ad-metric-change">↑ 14 signed up</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="cd-nav-tabs">
        <button
          className={`cd-tab-btn${activeTab === 'overview' ? ' active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Recent Orders Management
        </button>
        <button
          className={`cd-tab-btn${activeTab === 'inventory' ? ' active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          Drop Inventory Control
        </button>
      </div>

      {/* Orders Table */}
      {activeTab === 'overview' && (
        <div className="ad-section-box">
          <div className="ad-section-title-row">
            <h3 className="ad-section-title">Customer Orders</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--grey-400)' }}>
              Change status live to update customer views
            </span>
          </div>

          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product & Size</th>
                  <th>Amount</th>
                  <th>Order Date</th>
                  <th>Status Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td><strong>{order.id}</strong></td>
                    <td>{order.customer}</td>
                    <td>{order.product} ({order.size}) × {order.qty}</td>
                    <td>{order.total}</td>
                    <td>{order.date}</td>
                    <td>
                      <select
                        className="ad-status-select"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
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

      {/* Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="ad-section-box">
          <div className="ad-section-title-row">
            <h3 className="ad-section-title">Product Inventory & Stock Management</h3>
            <button
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => alert('New product drop wizard opened.')}
            >
              + Add New Drop
            </button>
          </div>

          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock Available</th>
                  <th>Stock Status</th>
                  <th>Quick Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img
                          src={item.img}
                          alt={item.name}
                          style={{ width: 42, height: 42, borderRadius: 6, objectFit: 'cover' }}
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>
                      <strong style={{ fontSize: '1.05rem' }}>{item.stock}</strong> units
                    </td>
                    <td>
                      <span className={`ad-stock-pill ${item.stock <= 10 ? 'stock-low' : 'stock-high'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="ad-action-btn"
                        onClick={() => handleStockUpdate(item.id, 5)}
                        title="Add 5 units"
                      >
                        +5 Stock
                      </button>
                      <button
                        className="ad-action-btn"
                        onClick={() => handleStockUpdate(item.id, -1)}
                        title="Reduce 1 unit"
                      >
                        -1 Sold
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
