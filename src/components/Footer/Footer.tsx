import './Footer.css'

const shopLinks  = ['New Arrivals', 'T-Shirts', 'Hoodies', 'Accessories', 'Sale']
const infoLinks  = ['About VNTGCO', 'Our Story', 'Sustainability', 'Careers']
const helpLinks  = ['FAQ', 'Shipping & Returns', 'Size Guide', 'Track Order', 'Contact Us']

const socials = [
  { label: 'Instagram', href: '#', icon: '📸' },
  { label: 'TikTok',    href: '#', icon: '🎵' },
  { label: 'Facebook',  href: '#', icon: '👥' },
  { label: 'WhatsApp',  href: '#', icon: '💬' },
]

export default function Footer() {
  return (
    <footer id="footer" className="footer" aria-label="Site footer">
      <div className="container">

        {/* Main grid */}
        <div className="footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <a href="#home" className="footer__logo" aria-label="VNTGCO Home">
              <span className="footer__logo-text">VNTG<em>CO</em></span>
            </a>
            <p className="footer__desc">
              Born from the streets. Worn by the bold. Premium streetwear for the next generation.
              EST 2026 — First Chapter.
            </p>
            <nav className="footer__social" aria-label="Social media links">
              {socials.map(s => (
                <a
                  key={s.label}
                  id={`footer-${s.label.toLowerCase()}`}
                  href={s.href}
                  className="footer__social-link"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </nav>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="footer__col-title">Shop</h3>
            <ul className="footer__links" role="list">
              {shopLinks.map(l => (
                <li key={l} role="listitem">
                  <a href="#collection">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="footer__col-title">Company</h3>
            <ul className="footer__links" role="list">
              {infoLinks.map(l => (
                <li key={l} role="listitem">
                  <a href="#about">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h3 className="footer__col-title">Help</h3>
            <ul className="footer__links" role="list">
              {helpLinks.map(l => (
                <li key={l} role="listitem">
                  <a href="#contact">{l}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © 2026 <em>VNTGCO</em>. All rights reserved. Made with ❤️ in Sri Lanka.
          </p>
          <nav className="footer__legal" aria-label="Legal links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </nav>
        </div>

      </div>
    </footer>
  )
}
