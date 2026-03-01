import React from 'react';
import './toolbar.css';
import { genres } from '../modals/data';

export default function Toolbar({ 
  selectedGenre, 
  setSelectedGenre, 
  sortBy, 
  setSortBy,
  isVisible
}) {
  if (!isVisible) return null;

  return (
    <div className='toolbar-container fade-in'>
      <div className='filter-group'>
        <label htmlFor="genre-select">Genre:</label>
        <select 
          id="genre-select" 
          value={selectedGenre || ''} 
          onChange={(e) => setSelectedGenre(e.target.value ? Number(e.target.value) : null)}
          className="toolbar-select"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div className='filter-group'>
        <label htmlFor="sort-select">Sort By:</label>
        <select 
          id="sort-select" 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="toolbar-select"
        >
          <option value="popularity">Popularity</option>
          <option value="rating">Rating (High to Low)</option>
          <option value="date">Release Date (Newest)</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>
    </div>
  );
}
