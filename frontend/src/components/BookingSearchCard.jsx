import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plane, Building2, Users, MapPin } from 'lucide-react'

export default function BookingSearchCard({ users }) {
  const [selectedUser, setSelectedUser] = useState(users?.[0]?.id || '')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (selectedUser) {
      navigate(`/tracker?user=${selectedUser}`)
    }
  }

  const totalCountries = users?.length || 0

  return (
    <div className="booking-card">
      {/* Tabs */}
      <div className="booking-tabs">
        <button className="booking-tab active">
          <Plane size={16} />
          Travel Diaries
        </button>
        <button className="booking-tab" disabled>
          <Building2 size={16} />
          Plan Trip
          <span className="coming-soon">Soon</span>
        </button>
      </div>

      {/* Body */}
      <form className="booking-body" onSubmit={handleSearch}>
        <div className="booking-fields">
          <div className="booking-field">
            <label>Select Traveler</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              {users?.length === 0 && (
                <option value="">No travelers yet</option>
              )}
              {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="booking-search-btn"
            disabled={!selectedUser}
          >
            <Search size={16} />
            Search Diary
          </button>
        </div>

        {/* Stats */}
        <div className="booking-stats">
          <div className="booking-stat">
            <Users size={14} />
            <span className="booking-stat-value">{totalCountries}</span>
            Travelers
          </div>
          <div className="booking-stat">
            <MapPin size={14} />
            <span className="booking-stat-value">195</span>
            Countries
          </div>
        </div>
      </form>
    </div>
  )
}
