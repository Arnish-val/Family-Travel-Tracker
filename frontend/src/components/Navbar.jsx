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

  const handleResetDB = async () => {
    if (!window.confirm("Are you sure you want to reset the database? This will delete all travelers and visited countries!")) {
      return
    }
    try {
      const res = await fetch('/api/reset', { method: 'POST' })
      if (res.ok) {
        window.location.href = '/'
      } else {
        alert("Failed to reset database.")
      }
    } catch (e) {
      alert("Error resetting database.")
    }
  }

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
        <button onClick={handleResetDB} className="navbar-link" style={{ color: 'var(--color-error)' }}>
          Reset DB
        </button>
        <Link to="/add-traveler" className="navbar-cta">
          <UserPlus size={16} style={{ marginRight: 4 }} />
          Add Traveler
        </Link>
      </div>
    </nav>
  )
}
