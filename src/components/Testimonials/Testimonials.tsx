import { useEffect, useRef } from 'react'
import './Testimonials.css'

interface Review {
  id: number
  stars: number
  text: string
  name: string
  handle: string
  avatar: string
  verified: boolean
}

const REVIEWS: Review[] = [
  {
    id: 1,
    stars: 5,
    text: '"Got the Skull Thunder Tee and honestly the quality is insane for the price. The print is super crisp and the fit is perfect. Already ordered a second one."',
    name: 'Kavindu P.',
    handle: '@kavi_streetwear',
    avatar: '😎',
    verified: true,
  },
  {
    id: 2,
    stars: 5,
    text: '"VNTGCO is doing something different. The black lightning tee is fire — I\'ve worn it like 3 times already this week. Delivery was super fast too."',
    name: 'Thilini M.',
    handle: '@thili.fits',
    avatar: '🔥',
    verified: true,
  },
  {
    id: 3,
    stars: 5,
    text: '"Finally a local brand that actually understands streetwear culture. The hoodie is premium quality, heavy cotton and the graphic is clean. 10/10 would recommend."',
    name: 'Rushen K.',
    handle: '@rush.grxphics',
    avatar: '💀',
    verified: true,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="testimonial-card__stars" aria-label={`${count} out of 5 stars`}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= count ? 'star-filled' : 'star-empty'} aria-hidden="true">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
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
    <section id="reviews" className="testimonials" ref={sectionRef} aria-label="Customer reviews">
      <div className="container">

        {/* Header */}
        <div className="section-header reveal">
          <span className="section-label">Reviews</span>
          <h2 className="section-title">
            What the <span className="highlight">Streets</span> Say
          </h2>
          <p className="section-sub">
            Real customers. Real feedback. No cap.
          </p>
        </div>

        {/* Grid */}
        <div className="testimonials__grid" role="list">
          {REVIEWS.map((r, i) => (
            <article
              key={r.id}
              id={`review-${r.id}`}
              className="testimonial-card reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
              role="listitem"
              aria-label={`Review by ${r.name}`}
            >
              <div className="testimonial-card__quote" aria-hidden="true">"</div>
              <Stars count={r.stars} />
              <p className="testimonial-card__text">{r.text}</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">
                  {r.avatar}
                </div>
                <div>
                  <div className="testimonial-card__name">{r.name}</div>
                  <div className="testimonial-card__handle">{r.handle}</div>
                </div>
                {r.verified && (
                  <span className="testimonial-card__verified" title="Verified purchase" aria-label="Verified purchase">
                    ✅
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
