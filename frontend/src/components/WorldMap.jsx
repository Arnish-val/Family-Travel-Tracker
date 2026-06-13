import mapData from './mapData.json'

export default function WorldMap({ visitedCountries = [], color = '#3b82f6' }) {
  return (
    <svg
      className="world-map-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1008 651"
    >
      {mapData.map((country) => {
        const isVisited = visitedCountries.includes(country.id)
        return (
          <path
            key={country.id}
            id={country.id}
            d={country.d}
            className={isVisited ? 'visited' : ''}
            style={isVisited ? { fill: color, fillOpacity: 0.85 } : undefined}
          >
            <title>{country.title}</title>
          </path>
        )
      })}
    </svg>
  )
}
