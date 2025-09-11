// src/components/RestaurantCard.tsx
'use client';

import React from 'react';
import { Restaurant } from '@/models/restaurant';

type Props = { restaurant: Restaurant; };

export default function RestaurantCard({ restaurant }: Props) {
  const topDeal = restaurant.deals?.length ? Math.max(...restaurant.deals.map(d => +d.discount || 0)) : 0;
  const hasNewDeal = restaurant.deals?.some(d => d.lightning === 'true');

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <div className="relative">
        <img
          src={restaurant.imageLink || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={restaurant.name}
          className="w-full h-44 object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x200?text=No+Image';
          }}
        />
        
        {/* Discount badge */}
        {topDeal > 0 && (
          <div className="absolute left-3 top-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {topDeal}% off
          </div>
        )}
        
        {/* "New" badge */}
        {hasNewDeal && (
          <div className="absolute right-3 top-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
            New
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-black">{restaurant.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {restaurant.distance || '0.5km Away'}, {restaurant.suburb || 'Lower East'}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {(restaurant.cuisines || ['Australian']).join(' • ')}
            </p>
          </div>
          <div className="ml-2 self-start">
            <button className="p-2 rounded-full text-gray-400 hover:text-red-500" aria-label="favourite">♡</button>
          </div>
        </div>

        {/* Deal information */}
        {restaurant.deals.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            {restaurant.deals.slice(0, 1).map(deal => (
              <div key={deal.objectId} className="flex items-center">
                <span className="text-red-600 font-semibold text-sm">{deal.discount}% off</span>
                <span className="text-gray-500 text-sm mx-2">•</span>
                <span className="text-gray-500 text-sm">
                  {deal.start && deal.end ? `${deal.start} - ${deal.end}` : 'Anytime today'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Service tags */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
          <span className="px-2 py-1 border border-gray-200 rounded-full">Dine In</span>
          <span className="px-2 py-1 border border-gray-200 rounded-full">Takeaway</span>
          <span className="px-2 py-1 border border-gray-200 rounded-full">Order Online</span>
        </div>
      </div>
    </div>
  );
}