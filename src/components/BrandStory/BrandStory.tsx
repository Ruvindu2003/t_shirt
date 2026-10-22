import { useEffect, useRef } from 'react'
import product2 from '../../assets/product2.jpg'
import './BrandStory.css'

const values = [
  { icon: '💀', title: 'Raw Aesthetic', desc: 'Bold graphics that speak louder than words.' },
  { icon: '🧵', title: 'Premium Quality', desc: '100% cotton, built for daily wear.' },
  { icon: '⚡', title: 'Limited Drops', desc: 'Exclusive pieces, never mass-produced.' },
  { icon: '🌏', title: 'Made Local', desc: 'Proudly crafted for Sri Lankan streets.' },
]

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="brand-story" ref={sectionRef} aria-label="Brand story">
      <div className="container brand-story__inner">

        {/* ── Visual ── */}
        <div className="brand-story__visual reveal">
          <img
            src={product2}
            alt="VNTGCO Black Lightning Tee"
            className="brand-story__img"
            width={580}
            loading="lazy"
          />
          <div className="brand-story__est" aria-label="Established 2026">
            <span className="brand-story__est-year">2026</span>
            <span className="brand-story__est-label">Est.</span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="brand-story__content reveal" style={{ transitionDelay: '0.15s' }}>
          <span className="section-label">Our Story</span>

          <h2 className="brand-story__title">
            Born from the <em>Streets</em>
          </h2>

          <p className="brand-story__text">
            VNTGCO started with a simple idea: streetwear that doesn't compromise. We're not
            here to follow trends — we set them. Every design is a chapter of our story, raw,
            unapologetic, and made for those who dare to stand out.
          </p>
          <p className="brand-story__text">
            Our first chapter launches with the iconic skull-and-lightning graphic — a symbol of
            energy, rebellion, and the spirit of youth. This is just the beginning.
          </p>

          {/* Values */}
          <div className="brand-story__values" role="list">
            {values.map((v, i) => (
              <div key={i} className="brand-story__value" role="listitem">
                <div className="brand-story__value-icon" aria-hidden="true">{v.icon}</div>
                <div>
                  <div className="brand-story__value-title">{v.title}</div>
                  <div className="brand-story__value-desc">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <a id="story-shop-btn" href="#collection" className="btn-dark">
            Shop the Collection →
          </a>
        </div>

      </div>
    </section>
  )
}
