import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Map, Globe, Users, ArrowRight, Plus, Check, RefreshCw } from 'lucide-react'
import BookingSearchCard from '../components/BookingSearchCard'
import WorldMap from '../components/WorldMap'

const COLORS = [
  { name: 'Teal', value: 'teal' },
  { name: 'Coral', value: '#f97316' },
  { name: 'Sky', value: '#3b82f6' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Fuchsia', value: '#d946ef' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Cyan', value: '#06b6d4' },
]

export default function LandingPage() {
  const [users, setUsers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()

  // Wizard state
  const [step, setStep] = useState(1)
  const [newUserName, setNewUserName] = useState('')
  const [newUserColor, setNewUserColor] = useState(COLORS[0].value)
  const [newUser, setNewUser] = useState(null)
  const [countryInput, setCountryInput] = useState('')
  const [newCountries, setNewCountries] = useState([])
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchUsers = () => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        setIsLoaded(true)
      })
      .catch((err) => {
        console.error(err)
        setIsLoaded(true)
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Scroll reveal observer
  useEffect(() => {
    if (users.length === 0) return

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

  const handleAddMember = async (e) => {
    e.preventDefault()
    if (!newUserName.trim() || !newUserColor) return

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName.trim(), color: newUserColor }),
      })
      const data = await res.json()

      if (res.ok) {
        setNewUser(data)
        setStep(2)
      } else {
        setError(data.error || 'Failed to create member.')
      }
    } catch (err) {
      setError('Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddCountry = async (e) => {
    e.preventDefault()
    if (!countryInput.trim() || !newUser) return

    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/visited', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: countryInput.trim(), userId: newUser.id }),
      })
      const data = await res.json()

      if (res.ok) {
        setSuccess(`Added ${data.countryCode}!`)
        setCountryInput('')
        // Fetch updated countries
        const updatedRes = await fetch(`/api/visited/${newUser.id}`)
        const updatedData = await updatedRes.json()
        setNewCountries(updatedData.countries)
      } else {
        setError(data.error || 'Could not add country.')
      }
    } catch (err) {
      setError('Connection failed. Please try again.')
    }
  }

  const handleFinish = () => {
    navigate(`/tracker?user=${newUser.id}`)
  }

  if (!isLoaded) {
    return (
      <div className="onboarding-wizard-container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <RefreshCw className="animate-spin" size={32} style={{ color: 'var(--color-secondary)' }} />
          <p style={{ color: 'var(--text-on-dark-muted)' }}>Loading family hub...</p>
        </div>
      </div>
    )
  }

  // If there are NO users, render the step-by-step onboarding wizard
  if (users.length === 0) {
    return (
      <div className="onboarding-wizard-container">
        <div className="onboarding-card">
          <div className="onboarding-header">
            <div className="onboarding-badge">
              <Globe size={12} />
              Setup Wizard
            </div>
            <h1 className="onboarding-title">
              {step === 1 ? 'Add a Member' : 'Where Have They Travelled?'}
            </h1>
            <p className="onboarding-subtitle">
              {step === 1
                ? 'Create the first profile in your family travel diary to get started.'
                : `Log the countries visited by ${newUser?.name} to paint the map.`}
            </p>
          </div>

          <div className="onboarding-steps-indicator">
            <div className={`onboarding-step-dot ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`} />
            <div className={`onboarding-step-dot ${step >= 2 ? 'active' : ''}`} />
          </div>

          {step === 1 ? (
            <form onSubmit={handleAddMember} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="onboarding-form-field">
                <label className="onboarding-form-label">Member Name</label>
                <input
                  type="text"
                  className="onboarding-form-input"
                  placeholder="Enter name (e.g. Mom, Jack)..."
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="onboarding-form-field">
                <label className="onboarding-form-label">Profile Theme Color</label>
                <div className="onboarding-color-picker">
                  {COLORS.map((c) => (
                    <label key={c.value} className="color-option">
                      <input
                        type="radio"
                        name="color"
                        value={c.value}
                        checked={newUserColor === c.value}
                        onChange={() => setNewUserColor(c.value)}
                      />
                      <span
                        className="color-swatch"
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {error && <div className="error-msg">{error}</div>}

              <button
                type="submit"
                className="onboarding-btn"
                disabled={!newUserName.trim() || loading}
              >
                {loading ? 'Adding...' : 'Add Member'}
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <form onSubmit={handleAddCountry} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div className="onboarding-form-field" style={{ flex: 1 }}>
                  <input
                    type="text"
                    className="onboarding-form-input"
                    placeholder="Enter country name (e.g. France, Japan)..."
                    value={countryInput}
                    onChange={(e) => setCountryInput(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="onboarding-btn"
                  style={{ width: 'auto', padding: '0.85rem 1.5rem', whiteSpace: 'nowrap' }}
                >
                  Add Country
                </button>
              </form>

              {error && <div className="error-msg">{error}</div>}
              {success && <div className="success-msg">{success}</div>}

              <div className="onboarding-form-field">
                <label className="onboarding-form-label">Visited Countries ({newCountries.length})</label>
                {newCountries.length > 0 ? (
                  <div className="onboarding-country-tags">
                    {newCountries.map((code, index) => (
                      <div key={index} className="onboarding-country-tag" style={{ borderLeft: `3px solid ${newUser?.color}` }}>
                        {code}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-on-dark-muted)' }}>
                    No countries added yet. Start typing above to paint the map!
                  </div>
                )}
              </div>

              <div className="onboarding-map-box">
                <WorldMap visitedCountries={newCountries} color={newUser?.color} />
              </div>

              <button
                onClick={handleFinish}
                className="onboarding-btn"
                style={{ background: 'var(--color-success)' }}
              >
                Go to Tracker Board
                <Check size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Normal landing page if users exist
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
