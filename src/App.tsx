import Navbar      from './components/Navbar/Navbar'
import Hero        from './components/Hero/Hero'
import MarqueeStrip from './components/Marquee/MarqueeStrip'
import Products    from './components/Products/Products'
import BrandStory  from './components/BrandStory/BrandStory'
import Countdown   from './components/Countdown/Countdown'
import Testimonials from './components/Testimonials/Testimonials'
import Newsletter  from './components/Newsletter/Newsletter'
import Footer      from './components/Footer/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <Products />
        <BrandStory />
        <Countdown />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
