import { useState, useEffect } from 'react';
import { Restaurant } from '@/models/restaurant';
import axios from 'axios';

export const useRestaurantsViewModel = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('/api'); // call your App Router API
        setRestaurants(
          response.data.sort(
            (a: Restaurant, b: Restaurant) =>
              Math.max(...b.deals.map(d => +d.discount)) - Math.max(...a.deals.map(d => +d.discount))
          )
        );
      } catch (err) {
        console.error('Failed to fetch restaurants', err);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.cuisines ?? []).some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return { restaurants: filteredRestaurants, searchTerm, setSearchTerm };
};
