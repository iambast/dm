import React, { useEffect, useState } from 'react';

const API_KEY = "9f21948df4a827653d1c5d6d6b16a6cc";
const NEWS_URL = `https://gnews.io/api/v4/search?q=disaster&lang=en&token=${API_KEY}`;

export default function LiveAlerts() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(NEWS_URL)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch news", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600">🌍 Live Disaster News</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading news...</p>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-500">No disaster news found.</p>
      ) : (
        <ul className="space-y-4">
          {news.map((article, index) => (
            <li key={index} className="border-b pb-4">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                {article.title}
              </a>
              <p className="text-sm text-gray-600">{article.publishedAt}</p>
              <p className="text-sm">{article.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
