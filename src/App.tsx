import { useState } from 'react'
import Navbar      from './components/Navbar/Navbar'
import Hero        from './components/Hero/Hero'
import MarqueeStrip from './components/Marquee/MarqueeStrip'
import Products    from './components/Products/Products'
import BrandStory  from './components/BrandStory/BrandStory'
import Countdown   from './components/Countdown/Countdown'
import Testimonials from './components/Testimonials/Testimonials'
import Newsletter  from './components/Newsletter/Newsletter'
import Footer      from './components/Footer/Footer'
import AuthModal   from './components/AuthModal/AuthModal'
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import type { UserSession } from './types/dashboard'

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [user, setUser] = useState<UserSession | null>(null)
  const [activeView, setActiveView] = useState<'store' | 'dashboard'>('store')

  const handleLoginSuccess = (loggedInUser: UserSession) => {
    setUser(loggedInUser)
    setActiveView('store') // Stay on Home / Store page after login
  }

  const handleLogout = () => {
    setUser(null)
    setActiveView('store')
  }

  return (
    <>
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
        activeView={activeView}
        onToggleView={() => setActiveView(prev => prev === 'store' ? 'dashboard' : 'store')}
      />

      <main>
        {activeView === 'dashboard' && user ? (
          user.role === 'admin' ? (
            <AdminDashboard user={user} onBackToStore={() => setActiveView('store')} />
          ) : (
            <CustomerDashboard user={user} onBackToStore={() => setActiveView('store')} />
          )
        ) : (
          <>
            <Hero />
            <MarqueeStrip />
            <Products />
            <BrandStory />
            <Countdown />
            <Testimonials />
            <Newsletter />
          </>
        )}
      </main>

      <Footer />

      {/* Auth Modal with Collection Background Images & Role selection */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}


