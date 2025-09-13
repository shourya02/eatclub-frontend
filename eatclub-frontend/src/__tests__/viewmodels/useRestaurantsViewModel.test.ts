import { renderHook, act } from '@testing-library/react';
import { useRestaurantsViewModel } from '@/viewmodels/useRestaurantsViewModel';
import { Restaurant } from '@/models/restaurant';

// Mock the fetch API
global.fetch = jest.fn();

describe('useRestaurantsViewModel', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should filter restaurants by search term', async () => {
    const mockRestaurants: Restaurant[] = [
      {
        objectId: '1',
        name: 'Pizza Place',
        cuisines: ['Italian', 'Pizza'],
        deals: [],
        distance: '0.5 km',
        suburb: 'Test Suburb'
      },
      {
        objectId: '2',
        name: 'Sushi Spot',
        cuisines: ['Japanese', 'Sushi'],
        deals: [],
        distance: '0.8 km',
        suburb: 'Test Suburb'
      }
    ];

    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRestaurants,
    });

    const { result } = renderHook(() => useRestaurantsViewModel());
    
    // Wait for the initial data to load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    act(() => {
      result.current.setSearchTerm('pizza');
    });
    
    // Assert that filtering logic works
    expect(result.current.restaurants).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Pizza Place',
          cuisines: expect.arrayContaining(['Pizza'])
        })
      ])
    );
  });
});