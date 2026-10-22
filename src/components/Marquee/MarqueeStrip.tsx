import './MarqueeStrip.css'

const items = [
  '⚡ STREETWEAR ESSENTIAL',
  '💀 VNTGCO EST 2026',
  '🔥 FIRST CHAPTER',
  '⚡ PREMIUM COTTON',
  '💀 WELCOME TO THE CULT',
  '🔥 NEW DROP INCOMING',
  '⚡ STREETWEAR ESSENTIAL',
  '💀 VNTGCO EST 2026',
  '🔥 FIRST CHAPTER',
  '⚡ PREMIUM COTTON',
  '💀 WELCOME TO THE CULT',
  '🔥 NEW DROP INCOMING',
]

export default function MarqueeStrip() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-strip__track">
        {items.map((item, i) => (
          <span key={i} className="marquee-strip__item">
            {item}
            <span className="marquee-strip__sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
