'use client';

import React from 'react';
import { Restaurant } from '@/models/restaurant';
import { BsHeart, BsLightningChargeFill } from 'react-icons/bs';

type Props = { restaurant: Restaurant; };

export default function RestaurantCard({ restaurant }: Props) {
  const deals = [...(restaurant.deals || [])].sort((a, b) => {
    return (+b.discount || 0) - (+a.discount || 0);
  });
  
  // Determine which service tags to show based on deals
  const hasDineInDeal = deals.some(deal => deal.dineIn === 'true');
  const hasTakeawayDeal = deals.some(deal => deal.dineIn !== 'true');
  const hasOrderOnline = true;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <div className="relative">
        <img
          src={restaurant.imageLink || 'https://placehold.co/600x400?text=Image+Coming+Soon&font=roboto'}
          alt={restaurant.name}
          className="w-full h-44 object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/600x400?text=Image+Coming+Soon&font=roboto';
          }}
        />
        
        {/* All deals badges */}
        {deals.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {deals.map((deal, index) => {
              // Check for time range in multiple possible properties
              let timeRange = 'Anytime today';
              
              if (deal.start && deal.end) {
                timeRange = `${deal.start} - ${deal.end}`;
              } else if (deal.open && deal.close) {
                timeRange = `${deal.open} - ${deal.close}`;
              } else if (deal.start && deal.close) {
                timeRange = `${deal.start} - ${deal.close}`;
              } else if (deal.open && deal.end) {
                timeRange = `${deal.open} - ${deal.end}`;
              }

              const dealType = deal.dineIn === 'true' ? 'Dine-in' : 'Takeaway';
              const isLightningDeal = deal.lightning === 'true';
              
              return (
                <div key={index} className="text-white text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: '#ed4c2e' }}>
                  <div className="flex items-center">
                    {isLightningDeal && <BsLightningChargeFill className="text-yellow-300 mr-1" />}
                    {deal.discount}% off - {dealType}
                  </div>
                  
                  <span className="font-normal">{timeRange}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0"> {/* min-w-0 is crucial for truncation */}
            <h3 className="text-lg font-semibold text-black truncate">{restaurant.name}</h3>
            <p className="text-sm text-gray-500 mt-1 truncate">
              {restaurant.distance || '0.5 km Away'}, {restaurant.suburb || 'Lower East'}
            </p>
            <p className="text-sm text-gray-600 mt-1 truncate">
              {(restaurant.cuisines || ['Italian', 'Pizza']).join(', ')}
            </p>
          </div>
          <div className="ml-2 self-start flex-shrink-0">
            <button className="p-2 rounded-full text-gray-400 hover:text-[#ed4c2e] transition-colors" aria-label="favourite">
              <BsHeart className="text-2xl" />
            </button>
          </div>
        </div>

        {/* Service tags - only show applicable ones */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
          {hasDineInDeal && (
            <span className="px-2 py-1 border border-gray-200 rounded-full">Dine In</span>
          )}
          {hasTakeawayDeal && (
            <span className="px-2 py-1 border border-gray-200 rounded-full">Takeaway</span>
          )}
          {hasOrderOnline && (
            <span className="px-2 py-1 border border-gray-200 rounded-full">Order Online</span>
          )}
        </div>
      </div>
    </div>
  );
}