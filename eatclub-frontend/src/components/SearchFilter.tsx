'use client';

import React from 'react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCuisine: string;
  onCuisineChange: (cuisine: string) => void;
  availableCuisines: string[];
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  selectedCuisine,
  onCuisineChange,
  availableCuisines
}: SearchFilterProps) {
  return (
    <div className="space-y-3">
      {/* Search input */}
      <div>
        <input
          type="text"
          placeholder="Search by name or cuisine..."
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full border rounded-full p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      
      {/* Cuisine filter */}
      <div className="flex flex-wrap gap-2">
        <select
          value={selectedCuisine}
          onChange={e => onCuisineChange(e.target.value)}
          className="border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">All Cuisines</option>
          {availableCuisines.map(cuisine => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
        
        {/* Clear filters button */}
        {(searchTerm || selectedCuisine) && (
          <button
            onClick={() => {
              onSearchChange('');
              onCuisineChange('');
            }}
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}