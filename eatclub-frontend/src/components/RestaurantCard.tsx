import React from 'react';
import { Restaurant } from '../models/restaurant';

interface Props {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard: React.FC<Props> = ({ restaurant, onClick }) => (
  <div onClick={onClick} className="card">
    <img src={restaurant.imageLink} alt={restaurant.name} />
    <h3>{restaurant.name}</h3>
    <p>{restaurant.cuisines?.join(', ')}</p>
  </div>
);

export default RestaurantCard;
