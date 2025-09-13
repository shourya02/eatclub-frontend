import { render, screen } from '@testing-library/react';
import DealCard from '@/components/DealCard';
import { Deal } from '@/models/restaurant';

describe('DealCard', () => {
  it('displays lightning deals with icon', () => {
    const lightningDeal: Deal = {
      objectId: '1',
      discount: '25',
      dineIn: 'true',
      lightning: 'true',
      start: '12:00',
      end: '15:00'
    };
    
    render(<DealCard deal={lightningDeal} />);
    
    expect(screen.getByText(/25% Off/)).toBeInTheDocument();
    expect(screen.getByText(/12:00 - 15:00/)).toBeInTheDocument();
    expect(screen.getByText(/Dine In/)).toBeInTheDocument();
  });

  it('displays non-lightning deals without icon', () => {
    const regularDeal: Deal = {
      objectId: '2',
      discount: '15',
      dineIn: 'false',
      lightning: 'false',
      start: '10:00',
      end: '20:00'
    };
    
    render(<DealCard deal={regularDeal} />);
    
    expect(screen.getByText(/15% Off/)).toBeInTheDocument();
    expect(screen.getByText(/10:00 - 20:00/)).toBeInTheDocument();
    expect(screen.getByText(/Takeaway/)).toBeInTheDocument();
  });

  it('handles missing time range with default text', () => {
    const dealWithoutTime: Deal = {
      objectId: '3',
      discount: '10',
      dineIn: 'true',
      lightning: 'false'
      // no start/end times
    };
    
    render(<DealCard deal={dealWithoutTime} />);
    
    expect(screen.getByText(/10% Off/)).toBeInTheDocument();
    expect(screen.getByText(/Anytime today/)).toBeInTheDocument();
    expect(screen.getByText(/Dine In/)).toBeInTheDocument();
  });
});