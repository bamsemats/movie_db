import React, { useRef, useCallback, useEffect } from 'react';
import './movie-cards.css';
import { FaHeart, FaSearch } from "react-icons/fa";
import Modals from "../modals/modals";
import SkeletonCard, { SkeletonGrid } from '../skeletons/skeleton';

export default function MovieCards({
  movies,
  addFavorite,
  favorites,
  showFavorites,
  currentSearch,
  openModal,
  closeModal,
  modalStack,
  navigateModal,
  goBackModal,
  selectedGenre,
  sortBy,
  loadMore,
  hasMore,
  loadingMore,
  loading
}) {
  
  const observer = useRef();
  const sentinelRef = useRef();

  useEffect(() => {
    if (loadingMore || !hasMore || showFavorites || loading) return;

    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    };

    observer.current = new IntersectionObserver(callback, {
      rootMargin: '400px', 
    });

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loadMore, hasMore, loadingMore, showFavorites, loading]);

  const displayMovies = showFavorites ? favorites : movies;

  const isFavorite = (movieId) => favorites.some(fav => fav.id === movieId);

  if (loading && movies.length === 0) {
    return <SkeletonGrid count={12} />;
  }

  if (showFavorites && favorites.length === 0) {
    return (
      <div className='empty-state fade-in'>
        <div className="empty-icon"><FaHeart /></div>
        <h2>Your collection is empty</h2>
        <p>Start exploring movies and add them to your favorites!</p>
      </div>
    );
  }

  if (movies.length === 0 && !loading && !showFavorites) {
    return (
      <div className='empty-state fade-in'>
        <div className="empty-icon"><FaSearch /></div>
        <h2>No movies found</h2>
        <p>We couldn't find any movies matching your current filters.</p>
      </div>
    );
  }

  const activeModalMovie = modalStack.length > 0 ? modalStack[0] : null;

  return (
    <div className='movie-card-wrapper fade-in'>
      <div className='movie-card-grid'>
        {movies.map((movie, index) => {
          const isLastElement = movies.length === index + 1;
          return (
            <div 
              className='movie-card-container' 
              key={`${movie.id}-${index}`}
              ref={isLastElement ? sentinelRef : null}
            >
              <div className='movie-card-header' onClick={() => openModal(movie)}>
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'} 
                  alt={movie.original_title || movie.title} 
                  className='movie-poster'
                  loading="lazy"
                />
                <button 
                  className={`like-button ${isFavorite(movie.id) ? 'is-favorite' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    addFavorite(movie);
                  }}
                >
                  <FaHeart />
                </button>
              </div>
              
              <div className='movie-card-body' onClick={() => openModal(movie)}>
                <h3 className='movie-title'>{movie.original_title || movie.title}</h3>
                <p className='movie-year'>
                  {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'} • ⭐ {movie.vote_average?.toFixed(1)}
                </p>
              </div>
            </div>
          );
        })}
        {loadingMore && Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={`more-${i}`} />
        ))}
      </div>

      {!showFavorites && hasMore && !loadingMore && (
        <div className="sentinel-trigger" style={{ height: '20px' }}></div>
      )}

      {activeModalMovie && (
        <Modals 
          movie={activeModalMovie} 
          closeModal={closeModal}
          navigateModal={navigateModal}
          goBackModal={goBackModal}
          hasHistory={modalStack.length > 1}
          scaleState={{scale: 1}}
          addFavorite={addFavorite}
          favorites={favorites}
        />
      )}
    </div>
  );
}
