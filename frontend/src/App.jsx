import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import TrackerPage from './pages/TrackerPage'
import AddTravelerPage from './pages/AddTravelerPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path="/add-traveler" element={<AddTravelerPage />} />
      </Routes>
    </>
  )
}

export default App
