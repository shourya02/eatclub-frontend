'use client';
import React from 'react';
import { useRestaurantsViewModel } from '../viewmodels/useRestaurantsViewModel';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantListPage: React.FC = () => {
  const { restaurants, searchTerm, setSearchTerm } = useRestaurantsViewModel();

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="restaurant-list">
        {restaurants.map(r => (
          <RestaurantCard key={r.objectId} restaurant={r} onClick={() => {/* navigate to detail */}} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantListPage;
