import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Map, Globe, Users, ArrowRight, Plus } from 'lucide-react'
import BookingSearchCard from '../components/BookingSearchCard'

export default function LandingPage() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error)
  }, [])

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [users])

  return (
    <>
      {/* ── Hero ────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-badge scroll-reveal">
          <Globe size={14} />
          Family Travel Hub
        </div>

        <h1 className="hero-title scroll-reveal delay-1">
          Your Travels, <span>Beautifully Tracked</span>
        </h1>

        <p className="hero-subtitle scroll-reveal delay-2">
          Log your family's adventures, visualize visited countries on an
          interactive map, and preserve travel memories forever.
        </p>

        <div className="scroll-reveal delay-3" style={{ width: '100%', maxWidth: 720, display: 'flex', justifyContent: 'center' }}>
          <BookingSearchCard users={users} />
        </div>
      </section>

      {/* ── Features ────────────────────────────────── */}
      <section className="features-section">
        <p className="section-label scroll-reveal">How It Works</p>
        <h2 className="section-heading scroll-reveal delay-1">
          Track Every Destination
        </h2>
        <p className="section-description scroll-reveal delay-2">
          A simple yet powerful platform to log, visualize, and share your
          family's travel history across the globe.
        </p>

        <div className="features-grid">
          <div className="feature-card scroll-reveal delay-1">
            <div className="feature-icon blue">
              <Map size={22} />
            </div>
            <h3 className="feature-title">Interactive World Map</h3>
            <p className="feature-text">
              See every country you've visited highlighted on a beautiful SVG
              world map with your personal color theme.
            </p>
          </div>

          <div className="feature-card scroll-reveal delay-2">
            <div className="feature-icon amber">
              <Users size={22} />
            </div>
            <h3 className="feature-title">Family Profiles</h3>
            <p className="feature-text">
              Each family member gets their own travel diary with unique colors.
              Switch between profiles instantly.
            </p>
          </div>

          <div className="feature-card scroll-reveal delay-3">
            <div className="feature-icon emerald">
              <Globe size={22} />
            </div>
            <h3 className="feature-title">Travel Timeline</h3>
            <p className="feature-text">
              View your journey as a chronological timeline of destinations,
              country by country, stop by stop.
            </p>
          </div>
        </div>
      </section>

      {/* ── Travelers Directory ─────────────────────── */}
      <section className="travelers-section">
        <div className="travelers-inner">
          <p className="section-label scroll-reveal">Your Family</p>
          <h2 className="section-heading scroll-reveal delay-1">
            Active Travelers
          </h2>
          <p className="section-description scroll-reveal delay-2">
            Select a traveler to explore their travel diary, or add a new family
            member to the crew.
          </p>

          <div className="travelers-grid">
            {users.map((user, idx) => (
              <div
                key={user.id}
                className={`traveler-card scroll-reveal delay-${Math.min(idx + 1, 5)}`}
                style={{ '--traveler-color': user.color }}
                onClick={() => navigate(`/tracker?user=${user.id}`)}
              >
                <div
                  className="traveler-avatar"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="traveler-name">{user.name}</span>
                <button className="traveler-explore-btn">
                  Explore Diary
                </button>
              </div>
            ))}

            <Link
              to="/add-traveler"
              className="traveler-card traveler-card-add scroll-reveal delay-4"
              style={{ textDecoration: 'none' }}
            >
              <div className="traveler-avatar">
                <Plus size={24} />
              </div>
              <span className="traveler-name">Add Traveler</span>
              <button className="traveler-explore-btn">Get Started</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="cta-section">
        <div className="cta-inner scroll-reveal">
          <h2 className="cta-heading">Ready to Start Tracking?</h2>
          <p className="cta-text">
            Add your first family member and begin logging the countries you've
            explored together.
          </p>
          <Link to="/add-traveler" className="cta-btn">
            Add a Traveler
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="footer">
        Family Travel Tracker &copy; {new Date().getFullYear()} &mdash; Built
        with React &amp; PostgreSQL
      </footer>
    </>
  )
}
