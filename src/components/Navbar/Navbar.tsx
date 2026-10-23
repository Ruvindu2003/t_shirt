import { useState, useEffect } from 'react'
import type { UserSession } from '../../types/dashboard'
import './Navbar.css'

const links = ['Home', 'Collection', 'About', 'Drops', 'Contact']

interface NavbarProps {
  onOpenAuth: () => void
  user: UserSession | null
  onLogout: () => void
  activeView: 'store' | 'dashboard'
  onToggleView: () => void
}

export default function Navbar({ onOpenAuth, user, onLogout, activeView, onToggleView }: NavbarProps) {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [cartCount]               = useState(2)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav id="navbar" className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container navbar__inner">

          {/* Logo */}
          <a href="#" className="navbar__logo" aria-label="VNTGCO Home">
            {/* Skull SVG icon */}
            <svg className="navbar__logo-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="20" cy="20" r="20" fill="#1a1a1a"/>
              <path d="M20 8C14.477 8 10 12.09 10 17.143c0 3.016 1.516 5.68 3.84 7.33V26h1.92v2h8.48v-2h1.92v-1.527C28.484 22.823 30 20.16 30 17.143 30 12.09 25.523 8 20 8z" fill="#f0f0f0"/>
              <rect x="16" y="26" width="2.5" height="3" rx="0.5" fill="#f0f0f0"/>
              <rect x="21.5" y="26" width="2.5" height="3" rx="0.5" fill="#f0f0f0"/>
              <path d="M26 14l-12 8" stroke="#e61c1c" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M14 14l12 8" stroke="#e61c1c" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="navbar__logo-text">VNTG<em>CO</em></span>
          </a>

          {/* Desktop links */}
          <ul className="navbar__links">
            {links.map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}>{link}</a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar__actions">
            {user ? (
              <div className="navbar__user-actions-row">
                <button
                  className="navbar__login-btn"
                  onClick={onToggleView}
                  style={{ background: activeView === 'dashboard' ? 'var(--red)' : 'rgba(230, 28, 28, 0.15)' }}
                >
                  <span className="navbar__toggle-view-text">
                    {activeView === 'dashboard' ? '🛍️ Store' : user.role === 'admin' ? '👑 Admin' : '📦 Account'}
                  </span>
                </button>

                <div
                  className="user-profile-badge"
                  onClick={onLogout}
                  title="Click to logout"
                  role="button"
                  tabIndex={0}
                >
                  <div className="user-avatar-circle" style={{ background: user.role === 'admin' ? '#e61c1c' : '#2563eb' }}>
                    {user.role === 'admin' ? '⚡' : user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name-text">
                    {user.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>✕</span>
                </div>
              </div>
            ) : (
              <button
                id="navbar-login-btn"
                className="navbar__login-btn"
                onClick={onOpenAuth}
                aria-label="Sign in"
              >
                <span className="navbar__login-icon">👤</span>
                <span>Sign In</span>
              </button>
            )}

            <button id="navbar-cart-btn" className="navbar__cart" aria-label="Open cart">
              🛒
              <span className="navbar__cart-count" aria-label={`${cartCount} items in cart`}>{cartCount}</span>
            </button>
            <button
              id="navbar-menu-btn"
              className="navbar__hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile drawer */}
      <div id="mobile-menu" className={`navbar__mobile${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <button
          id="mobile-menu-close"
          className="navbar__mobile-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >✕</button>
        {links.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
            {link}
          </a>
        ))}
        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {user ? (
            <button
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                onLogout()
                setMenuOpen(false)
              }}
            >
              Sign Out ({user.name})
            </button>
          ) : (
            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setMenuOpen(false)
                onOpenAuth()
              }}
            >
              👤 Sign In / Register
            </button>
          )}
        </div>
      </div>
    </>
  )
}
