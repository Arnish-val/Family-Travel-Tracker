import { MapPin } from 'lucide-react'

// Country code -> name mapping (subset for display)
const COUNTRY_NAMES = {
  AF: 'Afghanistan', AL: 'Albania', DZ: 'Algeria', AR: 'Argentina', AU: 'Australia',
  AT: 'Austria', BD: 'Bangladesh', BE: 'Belgium', BR: 'Brazil', CA: 'Canada',
  CL: 'Chile', CN: 'China', CO: 'Colombia', HR: 'Croatia', CZ: 'Czech Republic',
  DK: 'Denmark', EG: 'Egypt', FI: 'Finland', FR: 'France', DE: 'Germany',
  GR: 'Greece', IN: 'India', ID: 'Indonesia', IR: 'Iran', IQ: 'Iraq',
  IE: 'Ireland', IL: 'Israel', IT: 'Italy', JP: 'Japan', KE: 'Kenya',
  KR: 'South Korea', MX: 'Mexico', MA: 'Morocco', NL: 'Netherlands', NZ: 'New Zealand',
  NG: 'Nigeria', NO: 'Norway', PK: 'Pakistan', PE: 'Peru', PH: 'Philippines',
  PL: 'Poland', PT: 'Portugal', RO: 'Romania', RU: 'Russia', SA: 'Saudi Arabia',
  ZA: 'South Africa', ES: 'Spain', SE: 'Sweden', CH: 'Switzerland', TH: 'Thailand',
  TR: 'Turkey', UA: 'Ukraine', AE: 'UAE', GB: 'United Kingdom', US: 'United States',
  VN: 'Vietnam', NP: 'Nepal', LK: 'Sri Lanka', MM: 'Myanmar', KH: 'Cambodia',
  LA: 'Laos', MY: 'Malaysia', SG: 'Singapore', BT: 'Bhutan', MN: 'Mongolia',
}

export default function Timeline({ countries, color }) {
  if (!countries || countries.length === 0) {
    return (
      <div className="timeline-empty">
        <MapPin size={20} style={{ marginBottom: 8, opacity: 0.5 }} />
        <p>No countries visited yet.</p>
        <p style={{ fontSize: '0.75rem', marginTop: 4 }}>
          Add your first destination above!
        </p>
      </div>
    )
  }

  return (
    <div className="timeline-list">
      {countries.map((code, idx) => (
        <div className="timeline-stop" key={`${idx}-${code}`}>
          <div
            className="timeline-marker"
            style={{ backgroundColor: color || '#3b82f6' }}
          >
            {idx + 1}
          </div>
          <span className="timeline-name">
            {COUNTRY_NAMES[code] || code}
          </span>
          <span className="timeline-code">{code}</span>
        </div>
      ))}
    </div>
  )
}
