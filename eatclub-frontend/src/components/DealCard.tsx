'use client';

import { Deal } from '@/models/restaurant';
import { BsLightningChargeFill } from 'react-icons/bs';

interface Props {
  deal: Deal;
}

export default function DealCard({ deal }: Props) {
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

  const dealType = deal.dineIn === 'true' ? 'Dine In' : 'Takeaway';
  const isLightningDeal = deal.lightning === 'true';

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            {isLightningDeal ? (
              <div className="flex items-center">
                <BsLightningChargeFill className="text-yellow-500 mr-1" />
                <span className="text-red-600 font-bold text-lg">{deal.discount}% Off</span>
              </div>
            ) : (
              <span className="text-red-600 font-bold text-lg">{deal.discount}% Off</span>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-1">
            {dealType} • {timeRange}
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
  );
}