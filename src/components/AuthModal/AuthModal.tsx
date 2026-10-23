import { useState } from 'react'
import product1 from '../../assets/product1.jpg'
import product2 from '../../assets/product2.jpg'
import product3 from '../../assets/product3.jpg'
import type { UserSession, UserRole } from '../../types/dashboard'
import './AuthModal.css'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess?: (user: UserSession) => void
}

const BACKGROUND_IMAGES = [
  { id: 0, url: product2, label: 'Dark Lightning' },
  { id: 1, url: product1, label: 'White Skull' },
  { id: 2, url: product3, label: 'Cult Hoodie' }
]

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer')
  const [selectedBgIndex, setSelectedBgIndex] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  
  // Form fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  if (!isOpen) return null

  // Fast demo filler
  const handleDemoFill = (role: UserRole) => {
    setSelectedRole(role)
    if (role === 'admin') {
      setName('Admin Director')
      setEmail('admin@vntg.co')
      setPassword('admin123')
    } else {
      setName('Kasun Perera')
      setEmail('kasun@gmail.com')
      setPassword('customer123')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setStatusMessage({ type: 'error', text: 'Please complete all required fields.' })
      return
    }

    if (mode === 'register' && !name) {
      setStatusMessage({ type: 'error', text: 'Please enter your full name.' })
      return
    }

    // Role detection: if email contains admin or role is selected as admin
    const finalRole: UserRole = email.toLowerCase().includes('admin') || selectedRole === 'admin' ? 'admin' : 'customer'
    const userName = name || (finalRole === 'admin' ? 'Admin Manager' : email.split('@')[0])
    
    setStatusMessage({
      type: 'success',
      text: mode === 'login'
        ? `Welcome, ${userName}! You are now logged in as ${finalRole === 'admin' ? 'Admin' : 'Customer'}.`
        : `Account created! Welcome, ${userName}.`
    })

    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess({ name: userName, email, role: finalRole })
      }
      onClose()
      setStatusMessage(null)
    }, 900)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="auth-modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="auth-modal-card">
        {/* Close Button */}
        <button
          className="auth-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* ── Left Side: Collection Background Showcase ── */}
        <div
          className="auth-showcase-panel"
          style={{ backgroundImage: `url(${BACKGROUND_IMAGES[selectedBgIndex].url})` }}
        >
          <div className="auth-showcase-overlay" />
          
          <div className="auth-showcase-content">
            <div className="auth-showcase-brand">
              <span className="auth-brand-badge">⚡ CHAPTER ONE DROP</span>
            </div>

            <div>
              <h3 className="auth-showcase-heading">
                JOIN THE <span>UNDERGROUND</span> VIP CLUB.
              </h3>
              <p className="auth-showcase-desc">
                Get early drop alerts, members-only secret discounts, and access to limited edition streetwear tees.
              </p>

              {/* Thumbnails to choose shirt background */}
              <div className="auth-preview-thumbs">
                {BACKGROUND_IMAGES.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`auth-thumb-btn${selectedBgIndex === idx ? ' active' : ''}`}
                    onClick={() => setSelectedBgIndex(idx)}
                    title={`Switch view to ${item.label}`}
                    aria-label={`Switch background to ${item.label}`}
                  >
                    <img src={item.url} alt={item.label} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Side: Interactive Login / Register Form ── */}
        <div className="auth-form-panel">
          {/* Switcher Tab */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn${mode === 'login' ? ' active' : ''}`}
              onClick={() => {
                setMode('login')
                setStatusMessage(null)
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-btn${mode === 'register' ? ' active' : ''}`}
              onClick={() => {
                setMode('register')
                setStatusMessage(null)
              }}
            >
              Create Account
            </button>
          </div>

          <div className="auth-form-header">
            <h2 id="auth-title" className="auth-form-title">
              {mode === 'login' ? 'Welcome Back' : 'Join VNTGCO'}
            </h2>
            <p className="auth-form-subtitle">
              {mode === 'login'
                ? 'Sign in to access your streetwear orders and wishlist'
                : 'Experience premier streetwear drops and fast checkouts'}
            </p>
          </div>

          {/* Sample Demo Accounts Badge Box */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 8,
            padding: '12px 14px',
            marginBottom: 16
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
              fontSize: '0.74rem',
              fontFamily: 'var(--font-accent)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--grey-400)',
              fontWeight: 700
            }}>
              <span>⚡ Quick Demo Logins (Click to autofill)</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {/* Customer Demo Card */}
              <button
                type="button"
                onClick={() => handleDemoFill('customer')}
                style={{
                  background: selectedRole === 'customer' ? 'rgba(230, 28, 28, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedRole === 'customer' ? '1px solid var(--red)' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 6,
                  padding: '8px 10px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: '0.9rem' }}>🛍️</span>
                  <strong style={{ color: selectedRole === 'customer' ? '#fff' : '#ddd', fontSize: '0.78rem' }}>Customer Role</strong>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
                  kasun@gmail.com
                </div>
                <div style={{ fontSize: '0.68rem', color: '#ff5252', marginTop: 2 }}>
                  Pass: customer123
                </div>
              </button>

              {/* Admin Demo Card */}
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                style={{
                  background: selectedRole === 'admin' ? 'rgba(230, 28, 28, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedRole === 'admin' ? '1px solid var(--red)' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 6,
                  padding: '8px 10px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: '0.9rem' }}>👑</span>
                  <strong style={{ color: selectedRole === 'admin' ? '#fff' : '#ddd', fontSize: '0.78rem' }}>Admin Role</strong>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
                  admin@vntg.co
                </div>
                <div style={{ fontSize: '0.68rem', color: '#ff5252', marginTop: 2 }}>
                  Pass: admin123
                </div>
              </button>
            </div>
          </div>

          {statusMessage && (
            <div className={`auth-notification ${statusMessage.type}`} role="alert" style={{ marginBottom: 16 }}>
              <span>{statusMessage.type === 'success' ? '✓' : '⚠️'}</span>
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="auth-input-group">
                <label htmlFor="auth-name">Full Name</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">👤</span>
                  <input
                    id="auth-name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="auth-input-group">
              <label htmlFor="auth-email">Email Address</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉️</span>
                <input
                  id="auth-email"
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="auth-password">Password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="auth-options-row">
              <label className="auth-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              {mode === 'login' && (
                <button
                  type="button"
                  className="auth-forgot-link"
                  onClick={() => alert('Password reset link sent to your registered email.')}
                >
                  Forgot Password?
                </button>
              )}
            </div>

            <button type="submit" className="auth-submit-btn">
              <span>{mode === 'login' ? 'Sign In to Account' : 'Create Free Account'}</span>
              <span>→</span>
            </button>
          </form>

          {/* Social login divider */}
          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          <div className="auth-social-buttons">
            <button
              type="button"
              className="auth-social-btn"
              onClick={() => {
                setName('Google User')
                setEmail('google.user@gmail.com')
                if (onLoginSuccess) {
                  onLoginSuccess({ name: 'Google User', email: 'google.user@gmail.com', role: selectedRole })
                }
                onClose()
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="auth-social-btn"
              onClick={() => {
                setName('Instagram User')
                setEmail('instagram.user@vntg.co')
                if (onLoginSuccess) {
                  onLoginSuccess({ name: 'Instagram Fan', email: 'fan@instagram.com', role: selectedRole })
                }
                onClose()
              }}
            >
              <span>📸</span>
              <span>Instagram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
