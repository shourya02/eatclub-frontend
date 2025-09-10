'use client';

import { Deal } from '@/models/restaurant';

interface Props {
  deal: Deal;
}

export default function DealCard({ deal }: Props) {
  return (
    <div className="deal-card border p-2 rounded my-1">
      <p className="font-semibold">{deal.discount}% Off</p>
      <p>{deal.dineIn === 'true' ? 'Dine In' : 'Takeaway'}</p>
      <p>Qty Left: {deal.qtyLeft}</p>
    </div>
  );
}