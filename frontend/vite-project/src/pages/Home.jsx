import React, { useEffect, useState } from 'react';

const slides = [
  { image: '/images/hpc.jpg', quote: '“Disasters bring out the heroes in ordinary people.”' },
  { image: '/images/ih.jpg', quote: '“Every second counts — your report can save a life.”' },
  { image: '/images/w.jpg', quote: '“True courage is running toward the danger when everyone else runs away.”' },
  { image: '/images/ih2.jpg', quote: '“Together we stand, divided we fall — let’s help each other rise.”' },
  { image: '/images/i3.jpg', quote: '“Real heroes wear helmets, vests, and carry compassion.”' },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [query, setQuery] = useState('');

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Weather by location
  useEffect(() => {
    if (!query && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5cfff56b04fa0f51087e1ad0ed080403&units=metric`)
          .then(res => res.json())
          .then(data => {
            setWeather({
              temp: data.main.temp,
              description: data.weather[0].description,
              icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
              city: data.name,
            });
          });
      });
    }
  }, [query]);

  // Weather by city
  useEffect(() => {
    if (query) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=5cfff56b04fa0f51087e1ad0ed080403&units=metric`)
        .then(res => res.json())
        .then(data => {
          if (data.main) {
            setWeather({
              temp: data.main.temp,
              description: data.weather[0].description,
              icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
              city: data.name,
            });
          }
        });
    }
  }, [query]);

  // News Feed with safe check
  useEffect(() => {
    fetch(`https://gnews.io/api/v4/top-headlines?lang=en&topic=breaking-news&token=9f21948df4a827653d1c5d6d6b16a6cc`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.articles)) {
          setNews(data.articles.slice(0, 5));
        } else {
          console.error('News API returned unexpected data:', data);
          setNews([]);
        }
      })
      .catch((err) => {
        console.error('News API failed:', err);
        setNews([]);
      });
  }, []);

  return (
    <div className="w-full scroll-smooth bg-gray-50">
      {/* Slideshow */}
      <div className="relative h-[70vh] overflow-hidden rounded shadow-xl">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
            alt={`slide-${index}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">DisasterGuard</h1>
          <p className="text-lg md:text-xl max-w-2xl">{slides[current].quote}</p>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i === current ? 'bg-white' : 'bg-gray-400'}`} />
          ))}
        </div>
      </div>

      {/* Mission */}
      <section className="p-6 md:p-12 text-center bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-6">
          DisasterGuard is committed to real-time alerts, quick disaster reporting, and rapid response during critical events.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="/report" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg shadow-md">Report Disaster</a>
          <a href="/help" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg shadow-md">Request Help</a>
        </div>
      </section>

      {/* Emergency Cards */}
      <div className="py-8">
        <h2 className="text-2xl font-semibold text-center mb-6">📞 Emergency Helplines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {[
            { label: "National Emergency", number: "112", color: "bg-blue-100 hover:bg-blue-200" },
            { label: "Fire Emergency", number: "101", color: "bg-red-100 hover:bg-red-200" },
            { label: "Ambulance", number: "102", color: "bg-green-100 hover:bg-green-200" },
            { label: "Police Station", number: "100", color: "bg-yellow-100 hover:bg-yellow-200" },
            { label: "Disaster Management", number: "108", color: "bg-purple-100 hover:bg-purple-200" },
            { label: "Women Helpline", number: "1091", color: "bg-pink-100 hover:bg-pink-200" }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-6 shadow-md text-center transition-transform transform hover:scale-105 cursor-pointer ${item.color}`}
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-1">{item.label}</h3>
              <p className="text-3xl font-bold text-gray-800">{item.number}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weather */}
      {weather && (
        <section className="flex justify-center items-center mt-10">
          <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl rounded-xl p-6 w-[90%] sm:w-[400px] transition-transform hover:scale-105 hover:shadow-2xl duration-300">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="🔍 Enter city name..."
                className="w-full px-4 py-2 pr-24 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setQuery(city)}
              />
              <button
                onClick={() => setQuery(city)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Search
              </button>
            </div>

            <div className="flex flex-col items-center">
              <img src={weather.icon} alt="Weather icon" className="w-20 h-20" />
              <h3 className="text-xl font-bold mt-2">{weather.city}</h3>
              <p className="text-3xl text-blue-700 font-semibold">{weather.temp}°C</p>
              <p className="capitalize text-gray-600">{weather.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* News */}
      <section className="bg-white py-10 px-6 md:px-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📢 Latest Disaster News</h2>
        <div className="text-gray-600 space-y-4">
          {news.length === 0 ? (
            <p>No news available or still loading...</p>
          ) : (
            news.map((article, index) => (
              <div key={index} className="border-b pb-2">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">{article.title}</a>
                <p className="text-sm text-gray-500">{article.source.name}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">🌐 DisasterGuard</h3>
            <p className="text-sm text-gray-300">Empowering communities with real-time alerts, help requests, and disaster resources.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-red-400">🏠 Home</a></li>
              <li><a href="/report" className="hover:text-red-400">🚨 Report Disaster</a></li>
              <li><a href="/help" className="hover:text-red-400">🤝 Request Help</a></li>
              <li><a href="/login" className="hover:text-red-400">🔐 Admin Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <p className="text-sm text-gray-300 mb-1">📧 support@disasterguard.org</p>
            <p className="text-sm text-gray-300 mb-1">📍 New Delhi, India</p>
            <p className="text-sm text-gray-300">📞 +91-99999-99999</p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-8">
          © {new Date().getFullYear()} DisasterGuard. All rights reserved.
        </div>
      </footer>

      <br /><br />
    </div>
  );
}
