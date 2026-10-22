import { useState, useRef, useEffect } from 'react'
import './Newsletter.css'

const perks = [
  { icon: '⚡', text: 'Early Drop Access' },
  { icon: '💰', text: 'Exclusive Discounts' },
  { icon: '📦', text: 'Free Shipping Offers' },
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubmitted(true); setEmail('') }
  }

  return (
    <section id="contact" className="newsletter" ref={sectionRef} aria-label="Newsletter signup">
      <div className="container newsletter__inner">

        {/* Header */}
        <div className="reveal">
          <span className="section-label">Stay in the Loop</span>
          <h2 className="newsletter__title">
            Join the <em>Cult</em>
          </h2>
          <p className="newsletter__sub">
            Subscribe for early access to drops, exclusive discounts, and everything VNTGCO.
            No spam. Just fire content.
          </p>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="reveal" style={{ marginTop: '40px', fontFamily: 'var(--font-accent)', fontSize: '1.2rem', color: 'var(--red)', letterSpacing: '0.06em' }}>
            ✅ Welcome to the cult, legend! Stay tuned.
          </div>
        ) : (
          <form
            id="newsletter-form"
            className="newsletter__form reveal"
            onSubmit={handleSubmit}
            aria-label="Newsletter signup form"
          >
            <input
              id="newsletter-email"
              type="email"
              className="newsletter__input"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button id="newsletter-submit" type="submit" className="btn-dark-solid">
              Subscribe ⚡
            </button>
          </form>
        )}

        {/* Perks */}
        <div className="newsletter__perks reveal">
          {perks.map((p, i) => (
            <div key={i} className="newsletter__perk">
              <span className="newsletter__perk-icon" aria-hidden="true">{p.icon}</span>
              {p.text}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
