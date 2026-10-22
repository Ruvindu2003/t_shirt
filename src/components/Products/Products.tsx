import { useState, useEffect, useRef } from 'react'
import product1 from '../../assets/product1.jpg'
import product2 from '../../assets/product2.jpg'
import product3 from '../../assets/product3.jpg'
import './Products.css'

type Status = 'available' | 'limited' | 'soldout'

interface Product {
  id: number
  name: string
  tag: string
  desc: string
  badge?: string
  badgeType?: 'new' | 'hot' | 'sold' | 'limited'
  img: string
  sizes: string[]
  category: string
  status: Status
  statusLabel: string
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Skull Thunder Tee — White',
    tag: 'Streetwear Essential · First Chapter',
    desc: 'Our signature piece. A bold skull graphic with twin red lightning bolts — front logo and full back print. 100% premium ring-spun cotton. Oversized fit.',
    badge: 'NEW',
    badgeType: 'new',
    img: product1,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'tees',
    status: 'available',
    statusLabel: 'Available Now',
  },
  {
    id: 2,
    name: 'Lightning Skull Tee — Black',
    tag: 'Signature Series',
    desc: 'The dark variant. White skull with red lightning bolt outline on jet black. Heavyweight 220gsm cotton. Regular fit.',
    badge: 'HOT',
    badgeType: 'hot',
    img: product2,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'tees',
    status: 'limited',
    statusLabel: 'Limited Stock',
  },
  {
    id: 3,
    name: 'VNTGCO Cult Hoodie',
    tag: 'Urban Noise Collection',
    desc: 'Oversized streetwear hoodie with gothic skull and red lightning motif. Heavyweight fleece.',
    badge: 'LIMITED',
    badgeType: 'limited',
    img: product3,
    sizes: ['M', 'L', 'XL'],
    category: 'hoodies',
    status: 'limited',
    statusLabel: 'Almost Gone',
  },
]

const FILTERS = ['All', 'Tees', 'Hoodies']

function StatusBadge({ status, label }: { status: Status; label: string }) {
  return (
    <div className={`product-card__status status--${status}`}>
      <span className="product-card__status-dot" aria-hidden="true" />
      <span className="product-card__status-text">{label}</span>
    </div>
  )
}

export default function Products() {
  const [active, setActive]   = useState('All')
  const [wished, setWished]   = useState<number[]>([])
  const sectionRef            = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const toggleWish = (id: number) =>
    setWished(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const filtered = active === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === active.toLowerCase())

  return (
    <section id="collection" className="products" ref={sectionRef} aria-label="Product collection">
      <div className="container">

        {/* ── Header ── */}
        <div className="section-header reveal">
          <span className="section-label">The Collection</span>
          <h2 className="section-title">
            Our <span className="highlight">Shirts</span>
          </h2>
          <p className="section-sub">
            Every design is a statement. Limited drops, premium cotton, made for the streets.
            DM us on Instagram to order.
          </p>
        </div>

        {/* ── Filter ── */}
        <div className="products__filter reveal" role="group" aria-label="Filter products">
          {FILTERS.map(f => (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              className={`products__filter-btn${active === f ? ' products__filter-btn--active' : ''}`}
              onClick={() => setActive(f)}
              aria-pressed={active === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Product Grid ── */}
        <div className="products__grid" role="list">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              id={`product-${p.id}`}
              className="product-card reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              role="listitem"
              aria-label={p.name}
            >
              {/* ─ Image ─ */}
              <div className="product-card__img-wrap">
                <img
                  src={p.img}
                  alt={p.name}
                  className="product-card__img"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />

                {/* Hover overlay */}
                <div className="product-card__overlay">
                  <button
                    id={`view-btn-${p.id}`}
                    className="product-card__view-btn"
                  >
                    View Details →
                  </button>
                </div>

                {/* Wishlist */}
                <button
                  id={`wish-${p.id}`}
                  className={`product-card__wishlist${wished.includes(p.id) ? ' product-card__wishlist--active' : ''}`}
                  onClick={() => toggleWish(p.id)}
                  aria-label={wished.includes(p.id) ? 'Remove from wishlist' : 'Save'}
                  aria-pressed={wished.includes(p.id)}
                >
                  {wished.includes(p.id) ? '❤️' : '🤍'}
                </button>

                {/* Badge */}
                {p.badge && p.badgeType && (
                  <span className={`product-card__badge product-card__badge--${p.badgeType}`}>
                    {p.badge}
                  </span>
                )}
              </div>

              {/* ─ Info ─ */}
              <div className="product-card__info">
                <div className="product-card__name">{p.name}</div>
                <div className="product-card__tag">{p.tag}</div>
                {/* Description only shows on featured (first) card via CSS */}
                <p className="product-card__desc">{p.desc}</p>

                {/* Status row — NO PRICE */}
                <div className="product-card__status-row">
                  <StatusBadge status={p.status} label={p.statusLabel} />
                  <button
                    id={`enquire-${p.id}`}
                    className="product-card__enquire"
                    aria-label={`Enquire about ${p.name}`}
                  >
                    Order via DM →
                  </button>
                </div>

                {/* Sizes */}
                <div className="product-card__sizes-row">
                  <span className="product-card__sizes-label">Sizes:</span>
                  <div className="product-card__sizes" role="group" aria-label="Available sizes">
                    {p.sizes.map(s => (
                      <button
                        key={s}
                        className="product-card__size"
                        aria-label={`Size ${s}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── DM to Order CTA strip ── */}
        <div className="products__cta-strip reveal">
          <div className="products__cta-text">
            <div className="products__cta-title">Want to Order? 📲</div>
            <p className="products__cta-sub">
              Slide into our DMs on Instagram or WhatsApp.{' '}
              <strong>No prices listed</strong> — we keep it personal.
            </p>
          </div>
          <div className="products__cta-actions">
            <a
              id="cta-instagram"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              📸 DM on Instagram
            </a>
            <a
              id="cta-whatsapp"
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
