import { useState, useEffect } from 'react';
import { fetchRestaurants } from '../api/restaurantsApi';
import { Restaurant } from '../models/restaurant';

export const useRestaurantsViewModel = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRestaurants().then(data => {
      setRestaurants(
        data.sort((a, b) => Math.max(...b.deals.map(d => +d.discount)) - Math.max(...a.deals.map(d => +d.discount)))
      );
    });
  }, []);

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.cuisines.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return { restaurants: filteredRestaurants, searchTerm, setSearchTerm };
};
