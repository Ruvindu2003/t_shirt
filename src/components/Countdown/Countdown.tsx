import { useState, useEffect, useRef } from 'react'
import './Countdown.css'

// Target: 30 days from now
const TARGET = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

function pad(n: number) { return String(n).padStart(2, '0') }

function getTimeLeft() {
  const diff = Math.max(0, TARGET.getTime() - Date.now())
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function Countdown() {
  const [time, setTime]   = useState(getTimeLeft())
  const [email, setEmail] = useState('')
  const [sent, setSent]   = useState(false)
  const sectionRef        = useRef<HTMLElement>(null)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSent(true); setEmail('') }
  }

  const blocks = [
    { label: 'Days',    value: pad(time.days) },
    { label: 'Hours',   value: pad(time.hours) },
    { label: 'Minutes', value: pad(time.minutes) },
    { label: 'Seconds', value: pad(time.seconds) },
  ]

  return (
    <section id="drops" className="countdown" ref={sectionRef} aria-label="Next drop countdown">
      <div className="container countdown__inner">

        {/* Live badge */}
        <div className="countdown__eyebrow reveal" aria-live="polite">
          <span className="countdown__eyebrow-dot" aria-hidden="true" />
          <span className="countdown__eyebrow-text">Next Drop Incoming</span>
        </div>

        <h2 className="countdown__title reveal">
          Chapter <em>Two</em> Drops In
        </h2>
        <p className="countdown__sub reveal">
          Be the first to cop. Limited pieces. No restocks.
        </p>

        {/* Timer */}
        <div
          className="countdown__timer reveal"
          role="timer"
          aria-label="Time remaining until next drop"
        >
          {blocks.map((b, i) => (
            <span key={b.label} style={{ display: 'contents' }}>
              <div className="countdown__block">
                <div id={`countdown-${b.label.toLowerCase()}`} className="countdown__num" aria-label={`${b.value} ${b.label}`}>
                  {b.value}
                </div>
                <span className="countdown__label">{b.label}</span>
              </div>
              {i < blocks.length - 1 && (
                <span className="countdown__sep" aria-hidden="true">:</span>
              )}
            </span>
          ))}
        </div>

        {/* Notify form */}
        <form
          id="notify-form"
          className="countdown__notify reveal"
          onSubmit={handleNotify}
          aria-label="Get notified for next drop"
        >
          {sent ? (
            <p style={{ color: '#e61c1c', fontFamily: 'var(--font-accent)', fontSize: '1.1rem', letterSpacing: '0.08em' }}>
              ✅ You're on the list! We'll hit you up.
            </p>
          ) : (
            <>
              <input
                id="notify-email"
                type="email"
                className="countdown__input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-label="Email address for drop notification"
              />
              <button id="notify-submit" type="submit" className="btn-primary">
                Notify Me ⚡
              </button>
            </>
          )}
        </form>

      </div>
    </section>
  )
}
