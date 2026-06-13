import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

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

export default function AddTravelerPage() {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0].value)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !color) return

    setLoading(true)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), color }),
      })
      const data = await res.json()

      if (res.ok) {
        navigate(`/tracker?user=${data.id}`)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-traveler-page">
      <div className="add-traveler-card">
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
            transition: 'color 0.2s',
          }}
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <h1 className="add-traveler-title">Add a Traveler</h1>
        <p className="add-traveler-subtitle">
          Create a new family member profile to start tracking their adventures.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter traveler name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">Pick a Color</label>
            <div className="color-picker">
              {COLORS.map((c) => (
                <label key={c.value} className="color-option">
                  <input
                    type="radio"
                    name="color"
                    value={c.value}
                    checked={color === c.value}
                    onChange={() => setColor(c.value)}
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

          <button
            type="submit"
            className="form-submit"
            disabled={!name.trim() || loading}
          >
            {loading ? 'Creating...' : 'Create Traveler'}
          </button>
        </form>
      </div>
    </div>
  )
}
