import { render, screen } from '@testing-library/react';
import RestaurantCard from '@/components/RestaurantCard';
import { Restaurant } from '@/models/restaurant';

const mockRestaurant: Restaurant = {
  objectId: '1',
  name: 'Test Restaurant',
  distance: '0.5 km',
  suburb: 'Test Suburb',
  cuisines: ['Italian', 'Pizza'],
  deals: [
    {
      objectId: 'deal1',
      discount: '20',
      dineIn: 'true',
      start: '10:00',
      end: '22:00'
    }
  ],
  imageLink: 'test.jpg'
};

describe('RestaurantCard', () => {
  it('displays restaurant name and basic info', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('0.5 km, Test Suburb')).toBeInTheDocument();
    expect(screen.getByText('Italian, Pizza')).toBeInTheDocument();
  });

  it('displays deals with correct formatting', () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);
    
    expect(screen.getByText('20% off - Dine-in')).toBeInTheDocument();
    expect(screen.getByText('10:00 - 22:00')).toBeInTheDocument();
  });

  it('handles missing image gracefully', () => {
    const restaurantWithoutImage = { ...mockRestaurant, imageLink: undefined };
    render(<RestaurantCard restaurant={restaurantWithoutImage} />);
    
    // Should show placeholder image
    const image = screen.getByAltText('Test Restaurant');
    expect(image).toHaveAttribute('src', expect.stringContaining('placehold.co'));
  });
});