import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, ArrowRight, Plus, Check, RefreshCw, Globe } from 'lucide-react';
import WorldMap from '../components/WorldMap';

const COLORS = [
  { name: 'Teal', value: '#0d9488' },
  { name: 'Coral', value: '#f97316' },
  { name: 'Sky', value: '#3b82f6' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Fuchsia', value: '#d946ef' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Cyan', value: '#06b6d4' },
];

export default function LandingPage() {
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Wizard state
  const [step, setStep] = useState(1);
  const [newUserName, setNewUserName] = useState('');
  const [newUserColor, setNewUserColor] = useState(COLORS[0].value);
  const [newUser, setNewUser] = useState(null);
  const [countryInput, setCountryInput] = useState('');
  const [newCountries, setNewCountries] = useState([]);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Booking Card State
  const [selectedTravelerId, setSelectedTravelerId] = useState('');

  const fetchUsers = () => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        if (data.length > 0) {
          setSelectedTravelerId(data[0].id.toString());
        }
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserColor) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newUserName.trim(), color: newUserColor }),
      });
      const data = await res.json();

      if (res.ok) {
        setNewUser(data);
        setStep(2);
      } else {
        setError(data.error || 'Failed to create member.');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCountry = async (e) => {
    e.preventDefault();
    if (!countryInput.trim() || !newUser) return;

    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/visited', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: countryInput.trim(), userId: newUser.id }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(`Added ${data.countryCode}!`);
        setCountryInput('');
        // Fetch updated countries
        const updatedRes = await fetch(`/api/visited/${newUser.id}`);
        const updatedData = await updatedRes.json();
        setNewCountries(updatedData.countries);
      } else {
        setError(data.error || 'Could not add country.');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    }
  };

  const handleFinish = () => {
    navigate(`/tracker?user=${newUser.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (selectedTravelerId) {
      navigate(`/tracker?user=${selectedTravelerId}`);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f0f7ff] flex flex-col items-center justify-center gap-4">
        <RefreshCw className="animate-spin text-blue-500" size={40} />
        <p className="text-slate-500 font-semibold">Loading family hub...</p>
      </div>
    );
  }

  // ONBOARDING FLOW (No users in the DB)
  if (users.length === 0) {
    return (
      <div className="min-h-screen bg-[#f0f7ff] pt-24 pb-12 px-6 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <Globe size={12} className="animate-spin duration-3000" />
              Setup Wizard
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800">
              {step === 1 ? 'Add a Member' : 'Where Have They Travelled?'}
            </h1>
            <p className="text-slate-500 mt-2">
              {step === 1
                ? 'Create the first profile in your family travel diary to get started.'
                : `Log the countries visited by ${newUser?.name} to paint the map.`}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex gap-2 mb-8">
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-blue-500' : 'bg-slate-100'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-blue-500' : 'bg-slate-100'}`} />
          </div>

          {step === 1 ? (
            <form onSubmit={handleAddMember} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Member Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none rounded-2xl px-5 py-4 text-slate-800 font-semibold transition-all placeholder-slate-400"
                  placeholder="Enter name (e.g. Mom, Jack)..."
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Profile Theme Color</label>
                <div className="grid grid-cols-5 gap-3">
                  {COLORS.map((c) => (
                    <label key={c.value} className="relative flex items-center justify-center cursor-pointer group">
                      <input
                        type="radio"
                        name="color"
                        value={c.value}
                        checked={newUserColor === c.value}
                        onChange={() => setNewUserColor(c.value)}
                        className="sr-only"
                      />
                      <span
                        className={`w-10 h-10 rounded-full border-4 shadow-sm transition-all duration-200 group-hover:scale-105 active:scale-95 ${
                          newUserColor === c.value ? 'border-slate-800 scale-110' : 'border-white'
                        }`}
                        style={{ backgroundColor: c.value }}
                        title={c.name}
                      />
                    </label>
                  ))}
                </div>
              </div>

              {error && <div className="text-red-500 text-sm font-semibold">{error}</div>}

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-full flex items-center justify-center gap-2 font-bold transition-all shadow-md hover:shadow-lg active:scale-98"
                disabled={!newUserName.trim() || loading}
              >
                {loading ? 'Adding...' : 'Add Member'}
                <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <form onSubmit={handleAddCountry} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none rounded-2xl px-5 py-4 text-slate-800 font-semibold transition-all placeholder-slate-400"
                    placeholder="Enter country name (e.g. France, Japan)..."
                    value={countryInput}
                    onChange={(e) => setCountryInput(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-black text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap"
                >
                  Add
                </button>
              </form>

              {error && <div className="text-red-500 text-sm font-semibold">{error}</div>}
              {success && <div className="text-green-600 text-sm font-semibold">{success}</div>}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Visited Countries ({newCountries.length})
                </label>
                {newCountries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {newCountries.map((code, index) => (
                      <div
                        key={index}
                        className="bg-slate-100 text-slate-700 text-sm font-bold px-3 py-1.5 rounded-xl border-l-4"
                        style={{ borderLeftColor: newUser?.color }}
                      >
                        {code}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-400 italic">
                    No countries added yet. Start typing above to paint the map!
                  </div>
                )}
              </div>

              <div className="bg-slate-950 rounded-2xl p-4 overflow-hidden border border-slate-800 shadow-inner h-64 flex items-center justify-center">
                <WorldMap visitedCountries={newCountries} color={newUser?.color} />
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-full flex items-center justify-center gap-2 font-bold transition-all shadow-md hover:shadow-lg active:scale-98"
              >
                Go to Tracker Board
                <Check size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // MAIN PAGE LAYOUT
  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans text-slate-900 overflow-x-hidden pt-20">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="z-10">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-slate-900">
              Let's Plan Your <br />
              Perfect <span className="text-blue-500">Journey</span>
            </h1>
            <p className="mt-6 text-slate-500 text-lg max-w-md leading-relaxed">
              Plan and book your perfect trip with expert advice, travel tips, destination information and inspiration from us.
            </p>
            <button 
              onClick={() => navigate(`/tracker?user=${selectedTravelerId || users[0]?.id}`)}
              className="mt-8 bg-zinc-900 text-white px-8 py-4 rounded-full flex items-center gap-2 font-bold hover:gap-4 transition-all group shadow-lg hover:bg-black active:scale-95"
            >
              Discover Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Content - 3D Globe Illustration */}
          <div className="relative flex justify-center items-center">
            {/* The Globe and Clouds */}
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
              {/* Main Blue Globe Shape */}
              <div className="absolute inset-0 bg-blue-500 rounded-full shadow-2xl overflow-hidden border-8 border-white/20">
                {/* Green "Continents" shapes */}
                <div className="absolute top-10 left-10 w-32 h-20 bg-lime-400 rounded-full rotate-45 blur-sm opacity-80"></div>
                <div className="absolute bottom-20 right-10 w-40 h-24 bg-lime-500 rounded-full -rotate-12 blur-sm opacity-80"></div>
              </div>

              {/* Decorative Floating Elements */}
              <div className="absolute -top-10 -right-10 animate-bounce duration-[3000ms]">
                <div className="bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-100">
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-pink-500">🎟️</div>
                </div>
              </div>
              
              <div className="absolute top-1/2 -left-10 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg text-lg">
                ☁️
              </div>
              
              <div className="absolute bottom-10 -right-5 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-lg text-lg">
                ☁️
              </div>

              <div className="absolute -bottom-5 left-1/4">
                 <span className="text-4xl animate-pulse">🍉</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar / Booking Card (Interactive) */}
        <form onSubmit={handleSearchSubmit} className="mt-16 bg-white p-4 md:p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl">
          
          {/* Traveler Selector */}
          <div className="flex items-center gap-4 flex-1 border-r border-slate-100 px-4 w-full">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
              <Users size={24} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Traveler</p>
              <select
                value={selectedTravelerId}
                onChange={(e) => setSelectedTravelerId(e.target.value)}
                className="text-sm font-bold text-slate-800 bg-transparent outline-none w-full mt-0.5 cursor-pointer"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-4 flex-1 border-r border-slate-100 px-4 w-full">
            <div className="bg-orange-50 p-3 rounded-2xl text-orange-500">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</p>
              <p className="text-sm font-bold text-slate-800">When will you travel?</p>
            </div>
          </div>

          {/* People Count */}
          <div className="flex items-center gap-4 flex-1 px-4 w-full">
            <div className="bg-pink-50 p-3 rounded-2xl text-pink-500">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Destinations</p>
              <p className="text-sm font-bold text-slate-800">195 Countries Mapped</p>
            </div>
          </div>

          {/* Search Button */}
          <button 
            type="submit"
            className="bg-zinc-900 text-white p-5 rounded-2xl hover:bg-black transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <Search size={24} />
          </button>
        </form>
      </main>

      {/* Travelers Directory Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="border-t border-slate-200/60 pt-16">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Your Crew</p>
          <h2 className="text-3xl font-extrabold text-slate-800 mt-2">Active Travelers</h2>
          <p className="text-slate-500 mt-2 max-w-md">
            Select a traveler to view their personal journey map and timeline, or add a new member.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => navigate(`/tracker?user=${user.id}`)}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Visual accent color bar at the top */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: user.color }}
                />
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-4"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {user.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                  View Travel Board
                </p>
              </div>
            ))}
            
            <Link
              to="/add-traveler"
              className="bg-white hover:bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-4 group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-700">Add Traveler</h3>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Start New Profile</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-xs text-slate-400 border-t border-slate-200/60 bg-white">
        Family Travel Tracker &copy; {new Date().getFullYear()} &mdash; Built with React, Tailwind &amp; PostgreSQL
      </footer>
    </div>
  );
}
