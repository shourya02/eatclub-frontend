// src/app/restaurant/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useRestaurantsViewModel } from '@/viewmodels/useRestaurantsViewModel';

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { restaurants } = useRestaurantsViewModel();

  const restaurant = restaurants.find(r => r.objectId === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Restaurant Not Found</div>
          <button 
            onClick={() => router.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Sort deals by highest discount
  const sortedDeals = [...restaurant.deals].sort((a, b) => {
    return (+b.discount || 0) - (+a.discount || 0);
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header with back button */}
      <header className="flex items-center p-4 bg-white shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => router.back()}
          className="text-blue-500 flex items-center"
        >
          <span className="text-xl mr-1">&larr;</span>
          Back
        </button>
        <h1 className="flex-1 text-center font-semibold">Restaurant Details</h1>
        <div className="w-6"></div> {/* Spacer for balance */}
      </header>

      {/* Restaurant image */}
      <div className="relative">
        <img
          src={restaurant.imageLink || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x200?text=No+Image';
          }}
        />
      </div>

      {/* Restaurant info */}
      <div className="p-4 bg-white">
        <h2 className="text-2xl font-bold text-black mb-1">{restaurant.name}</h2>
        <p className="text-gray-600 mb-2">
          {restaurant.cuisines?.join(' • ') || 'Various cuisines'}
        </p>
        
        <p className="text-gray-500">
          {restaurant.distance || '0.5km Away'}, {restaurant.suburb || 'Lower East'}
        </p>
        
        {/* Action buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
          <button className="flex flex-col items-center text-gray-600">
            <span className="text-xl mb-1">📋</span>
            <span className="text-xs">Menu</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <span className="text-xl mb-1">📞</span>
            <span className="text-xs">Call us</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <span className="text-xl mb-1">📍</span>
            <span className="text-xs">Location</span>
          </button>
          <button className="flex flex-col items-center text-gray-600">
            <span className="text-xl mb-1">❤️</span>
            <span className="text-xs">Favourite</span>
          </button>
        </div>
      </div>

      {/* Additional info */}
      <div className="p-4 bg-white mt-2">
        <h3 className="font-semibold text-gray-800 mb-2">Details</h3>
        <p className="text-gray-600 text-sm">
          {restaurant.cuisines?.join(' • ')} • {restaurant.priceRange || '$$'}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          Hours: {restaurant.open || '12:00PM'} - {restaurant.close || '11:00PM'}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          {restaurant.address1} • {restaurant.distance || '1.0km'} Away
        </p>
      </div>

      {/* Deals section */}
      <div className="p-4 bg-white mt-2">
        <h3 className="font-semibold text-lg text-gray-800 mb-3">Available Deals</h3>
        
        {sortedDeals.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No deals available at this time.
          </div>
        ) : (
          <div className="space-y-3">
            {sortedDeals.map(deal => (
              <div key={deal.objectId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="text-red-600 font-bold text-lg">{deal.discount}% Off</span>
                      {deal.lightning === 'true' && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium ml-2 px-2 py-0.5 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {deal.dineIn === 'true' ? 'Dine In' : 'Takeaway'} • {deal.start && deal.end ? `${deal.start} - ${deal.end}` : 'Anytime today'}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Qty left: {deal.qtyLeft || '5'} Deals Left
                    </p>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Redeem
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}