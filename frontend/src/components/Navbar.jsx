import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Globe, Map, UserPlus, Compass } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-brand">
        <div className="navbar-brand-icon">
          <Globe size={20} />
        </div>
        TravelTracker
      </Link>

      <div className="navbar-links">
        <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}>
          <Compass size={16} />
          Home
        </Link>
        <Link to="/tracker" className={`navbar-link ${isActive('/tracker') ? 'active' : ''}`}>
          <Map size={16} />
          My Travels
        </Link>
        <Link to="/add-traveler" className="navbar-cta">
          <UserPlus size={16} style={{ marginRight: 4 }} />
          Add Traveler
        </Link>
      </div>
    </nav>
  )
}
