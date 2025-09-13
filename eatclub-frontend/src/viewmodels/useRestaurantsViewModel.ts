import { useState, useEffect, useMemo } from 'react';
import { Restaurant} from '@/models/restaurant';

export const useRestaurantsViewModel = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Sort by best deals first (highest discount among restaurant's deals)
        const sortedData = data.sort(
          (a: Restaurant, b: Restaurant) => {
            const maxDiscountA = Math.max(...a.deals.map(d => +d.discount || 0));
            const maxDiscountB = Math.max(...b.deals.map(d => +d.discount || 0));
            return maxDiscountB - maxDiscountA;
          }
        );
        
        setRestaurants(sortedData);
      } catch (err) {
        console.error('Failed to fetch restaurants', err);
        setError('Failed to load restaurants. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRestaurants();
  }, []);

  // Get all unique cuisines for filter
  const availableCuisines = useMemo(() => {
    const allCuisines = restaurants.flatMap(r => r.cuisines || []);
    return Array.from(new Set(allCuisines)).filter(Boolean);
  }, [restaurants]);

  // Filter restaurants based on search term and selected cuisine
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      const matchesSearch = 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.cuisines || []).some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCuisine = !selectedCuisine || 
        (r.cuisines || []).includes(selectedCuisine);
      
      return matchesSearch && matchesCuisine;
    });
  }, [restaurants, searchTerm, selectedCuisine]);

  return { 
    restaurants: filteredRestaurants, 
    searchTerm, 
    setSearchTerm,
    selectedCuisine,
    setSelectedCuisine,
    availableCuisines,
    isLoading,
    error
  };
};