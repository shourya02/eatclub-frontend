'use client';

import { useState } from 'react';
import { useRestaurantsViewModel } from '@/viewmodels/useRestaurantsViewModel';
import RestaurantCard from '@/components/RestaurantCard';

export default function HomePage() {
  const { restaurants, searchTerm, setSearchTerm } = useRestaurantsViewModel();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  if (selectedRestaurant) {
    const restaurant = restaurants.find(r => r.objectId === selectedRestaurant);
    return (
      <div>
        <button onClick={() => setSelectedRestaurant(null)}>Back</button>
        <h2 className="text-2xl font-bold">{restaurant?.name}</h2>
        {restaurant?.deals.sort((a, b) => +b.discount - +a.discount).map(deal => (
          <div key={deal.objectId}>{deal.discount}% Off</div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search restaurants"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="border rounded p-2 w-full mb-4"
      />
      <div className="grid grid-cols-1 gap-4">
        {restaurants.map(r => (
          <RestaurantCard key={r.objectId} restaurant={r} onClick={() => setSelectedRestaurant(r.objectId)} />
        ))}
      </div>
    </div>
  );
}