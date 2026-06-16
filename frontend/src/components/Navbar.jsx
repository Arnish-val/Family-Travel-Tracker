import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Globe, Compass, Map, UserPlus, RefreshCw } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
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
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 h-20 flex items-center justify-between transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Globe size={18} />
        </div>
        Booking<span className="text-slate-800 font-extrabold italic">Adventures</span>
      </Link>

      <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-500">
        <Link 
          to="/" 
          className={`hover:text-blue-600 transition-colors flex items-center gap-1.5 ${isActive('/') ? 'text-blue-600 font-semibold' : ''}`}
        >
          <Compass size={16} />
          Home
        </Link>
        <Link 
          to="/tracker" 
          className={`hover:text-blue-600 transition-colors flex items-center gap-1.5 ${isActive('/tracker') ? 'text-blue-600 font-semibold' : ''}`}
        >
          <Map size={16} />
          Destinations
        </Link>
        <button 
          onClick={handleResetDB} 
          className="text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-1.5 text-sm font-medium"
        >
          <RefreshCw size={16} />
          Reset DB
        </button>
      </div>

      <div>
        <Link 
          to="/add-traveler" 
          className="bg-black hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-sm hover:shadow-md active:scale-95"
        >
          <UserPlus size={16} />
          Add Traveler
        </Link>
      </div>
    </nav>
  )
}
