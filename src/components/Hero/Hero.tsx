import product1 from '../../assets/product1.jpg'
import product2 from '../../assets/product2.jpg'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Hero section">

      {/* Background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grid" />
        <div className="hero__bg-radial" />
      </div>

      <div className="container hero__inner">

        {/* ── Content ── */}
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-line" aria-hidden="true" />
            <span className="section-label">EST 2026 · First Chapter</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-accent">STREETWEAR</span>
            <span className="hero__title-outline">ESSENTIAL</span>
            <span>BY VNTGCO</span>
          </h1>

          <p className="hero__subtitle">
            Born from the streets. Worn by the bold. Our first chapter drops now —
            limited pieces, 100% premium cotton, made for those who stand out.
          </p>

          <div className="hero__actions">
            <a id="hero-shop-btn" href="#collection" className="btn-primary">
              View Collection →
            </a>
            <a id="hero-dm-btn" href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
              📸 DM to Order
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats" aria-label="Brand statistics">
            <div>
              <div className="hero__stat-num">100<em>%</em></div>
              <div className="hero__stat-label">Premium Cotton</div>
            </div>
            <div>
              <div className="hero__stat-num">LTD<em>.</em></div>
              <div className="hero__stat-label">Limited Drops</div>
            </div>
            <div>
              <div className="hero__stat-num">CH<em>1</em></div>
              <div className="hero__stat-label">First Chapter</div>
            </div>
          </div>
        </div>

        {/* ── Visual: Two shirts ── */}
        <div className="hero__visual" aria-label="VNTGCO T-shirts showcase">
          <div className="hero__shirts">

            {/* Front shirt — white */}
            <div className="hero__shirt-main">
              <img
                src={product1}
                alt="VNTGCO Streetwear Essential White T-Shirt — Front"
                width={520}
              />
            </div>

            {/* Back shirt — black, peeking behind */}
            <div className="hero__shirt-back">
              <img
                src={product2}
                alt="VNTGCO Lightning Skull Black T-Shirt"
                width={400}
              />
            </div>

            {/* Floating badge */}
            <div className="hero__badge" aria-hidden="true">
              ⚡ NEW DROP
            </div>

            {/* Info tag */}
            <div className="hero__tag" aria-hidden="true">
              <span className="hero__tag-icon">💀</span>
              <div>
                <div className="hero__tag-label">Collection</div>
                <div className="hero__tag-value">Chapter One</div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line" />
      </div>

    </section>
  )
}
