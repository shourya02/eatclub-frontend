// src/app/page.tsx
'use client';

import Link from 'next/link';
import { useRestaurantsViewModel } from '@/viewmodels/useRestaurantsViewModel';
import RestaurantCard from '@/components/RestaurantCard';
import SearchFilter from '@/components/SearchFilter';

export default function HomePage() {
  const { 
    restaurants, 
    searchTerm, 
    setSearchTerm,
    selectedCuisine,
    setSelectedCuisine,
    availableCuisines,
    isLoading,
    error 
  } = useRestaurantsViewModel();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-red-500 text-lg mb-2">Error</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm sticky top-0 z-10">
        <button className="p-2 rounded-full" aria-label="profile">👤</button>
        <div className="text-xl font-bold">🍽️ EatClub</div>
        <button className="p-2 rounded-full" aria-label="filters">⚙️</button>
      </header>

      {/* Search and filter section */}
      <div className="p-4 bg-white border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. chinese, pizza"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full border rounded-full p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 pl-10"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Content */}
      <main className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No restaurants found. Try adjusting your search.
          </div>
        ) : (
          <div className="space-y-4">
            {restaurants.map(r => (
              <Link
                key={r.objectId}
                href={`/restaurant/${r.objectId}`}
                aria-label={`Open ${r.name} details`}
                className="block"
              >
                <RestaurantCard restaurant={r} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}