import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { MapPin, Plus, Home } from 'lucide-react'
import WorldMap from '../components/WorldMap'
import Timeline from '../components/Timeline'

export default function TrackerPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [countries, setCountries] = useState([])
  const [total, setTotal] = useState(0)
  const [countryInput, setCountryInput] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Fetch users
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data)
        const userId = searchParams.get('user') || data[0]?.id
        const user = data.find((u) => u.id == userId) || data[0]
        if (user) {
          setCurrentUser(user)
          setSearchParams({ user: user.id }, { replace: true })
        }
      })
      .catch(console.error)
  }, [])

  // Fetch visited countries when user changes
  useEffect(() => {
    if (!currentUser) return
    fetch(`/api/visited/${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.countries)
        setTotal(data.total)
      })
      .catch(console.error)
  }, [currentUser])

  const switchUser = (user) => {
    setCurrentUser(user)
    setSearchParams({ user: user.id })
    setError('')
    setSuccess('')
  }

  const handleAddCountry = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!countryInput.trim()) return

    try {
      const res = await fetch('/api/visited', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: countryInput.trim(), userId: currentUser.id }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        return
      }

      setSuccess(`Added ${data.countryCode}!`)
      setCountryInput('')
      // Refresh countries
      const updated = await fetch(`/api/visited/${currentUser.id}`)
      const updatedData = await updated.json()
      setCountries(updatedData.countries)
      setTotal(updatedData.total)
    } catch (err) {
      setError('Something went wrong. Try again.')
    }
  }

  if (!currentUser) {
    return (
      <div className="tracker-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-on-dark-muted)', marginBottom: '1rem' }}>
            No travelers found.
          </p>
          <Link to="/add-traveler" className="cta-btn">
            <Plus size={16} /> Add your first traveler
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="tracker-page">
      <div className="tracker-layout">
        {/* ── Sidebar ──────────────────────────────── */}
        <aside className="tracker-sidebar">
          {/* User chips */}
          <div className="tracker-panel">
            <div className="tracker-panel-title">
              <Home size={16} />
              <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
              <span style={{ color: 'var(--text-on-dark-muted)', margin: '0 0.25rem' }}>/</span>
              Travelers
            </div>
            <div className="user-selector">
              {users.map((user) => (
                <button
                  key={user.id}
                  className={`user-chip ${currentUser.id === user.id ? 'active' : ''}`}
                  style={currentUser.id === user.id ? { backgroundColor: user.color } : undefined}
                  onClick={() => switchUser(user)}
                >
                  <span className="user-chip-dot" style={{ backgroundColor: user.color }} />
                  {user.name}
                </button>
              ))}
            </div>
          </div>

          {/* Add country */}
          <div className="tracker-panel">
            <div className="tracker-panel-title">
              <MapPin size={16} />
              Add New Country
            </div>
            <form className="country-form" onSubmit={handleAddCountry}>
              <input
                type="text"
                className={`country-input ${error ? 'error' : ''}`}
                placeholder="Enter country name..."
                value={countryInput}
                onChange={(e) => setCountryInput(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="country-submit"
                style={{ backgroundColor: currentUser.color }}
              >
                Add
              </button>
            </form>
            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}
          </div>

          {/* Timeline */}
          <div className="tracker-panel" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="tracker-panel-title">
              <MapPin size={16} />
              Stops &amp; Legs
            </div>
            <Timeline countries={countries} color={currentUser.color} />
          </div>
        </aside>

        {/* ── Map Area ─────────────────────────────── */}
        <div className="tracker-map">
          <div className="map-header">
            <div className="map-profile">
              <div
                className="map-profile-avatar"
                style={{ backgroundColor: currentUser.color }}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="map-profile-name">
                {currentUser.name}&apos;s Journey
              </span>
            </div>
            <span
              className="map-badge"
              style={{ backgroundColor: currentUser.color }}
            >
              {total} Countries Visited
            </span>
          </div>

          <div className="map-container">
            <WorldMap visitedCountries={countries} color={currentUser.color} />
          </div>
        </div>
      </div>
    </div>
  )
}
