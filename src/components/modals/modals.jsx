import './modals.css';
import { genres } from './data';
import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { RxCross2 } from "react-icons/rx";
import { FaHeart, FaStar, FaArrowLeft, FaClock } from "react-icons/fa";

export default function Modals({
  movie,
  closeModal,
  navigateModal,
  goBackModal,
  hasHistory,
  scaleState,
  addFavorite,
  favorites
}) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [showFullOverview, setShowMore] = useState(false);
  const isOpen = scaleState.scale === 1;

  const fetchFullDetails = useCallback(async () => {
    const token = process.env.REACT_APP_TMDB_TOKEN;
    if (!token) return;
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=credits,videos,similar,recommendations,watch/providers&language=en-US`, 
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      const result = await response.json();
      setMovieDetails(result);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }, [movie.id]);

  useEffect(() => {
    if (isOpen) {
      fetchFullDetails();
      setShowMore(false); // Reset overview toggle
      const infoSection = document.querySelector('.modal-info-section');
      if (infoSection) infoSection.scrollTop = 0;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, fetchFullDetails, movie.id]);

  if (!isOpen) return null;

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const movieGenres = movie.genre_ids
    ?.map(id => genres.find(g => g.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  const isFavorite = favorites.some(fav => fav.id === movie.id);
  const cast = movieDetails?.credits?.cast?.slice(0, 5) || [];
  const director = movieDetails?.credits?.crew?.find(c => c.job === 'Director')?.name;
  
  const trailer = movieDetails?.videos?.results?.find(
    vid => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser')
  );

  const relatedMovies = (movieDetails?.recommendations?.results?.length > 0 
    ? movieDetails.recommendations.results 
    : movieDetails?.similar?.results)?.slice(0, 4) || [];

  const watchData = movieDetails?.['watch/providers']?.results?.US;
  const watchProviders = watchData?.flatrate || [];
  const watchLink = watchData?.link;

  const modalContent = (
    <div className='movie-modal-overlay fade-in' onClick={closeModal}>
      <div className='movie-modal-card' onClick={(e) => e.stopPropagation()}>
        <div className='modal-content'>
          <div className='modal-poster-container'>
            <img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'} 
              alt={movie.original_title} 
              className='modal-poster'
            />
          </div>
          
          <div className='modal-info-section'>
            <div className='modal-header'>
              <div className='modal-header-left'>
                {hasHistory && (
                  <button className='modal-back-button' onClick={goBackModal} title="Go Back">
                    <FaArrowLeft size={18} />
                  </button>
                )}
                <h2 className='modal-title'>{movie.original_title}</h2>
              </div>
              <button className='modal-close-button' onClick={closeModal}>
                <RxCross2 size={24} />
              </button>
            </div>

            <div className='modal-meta'>
              <span className='modal-year'>{movie.release_date?.substring(0, 4)}</span>
              <span className='modal-genres'>{movieGenres}</span>
              <span className='modal-runtime'><FaClock /> {formatRuntime(movieDetails?.runtime)}</span>
              <span className='modal-rating'><FaStar /> {movie.vote_average?.toFixed(1)}</span>
            </div>

            {watchProviders.length > 0 && (
              <div className='watch-providers'>
                <p>Available on:</p>
                <div className='provider-logos'>
                  {watchProviders.map(provider => (
                    <a key={provider.provider_id} href={watchLink} target="_blank" rel="noopener noreferrer">
                      <img src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} className='provider-logo' />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className='modal-overview-container'>
              <p className={`modal-overview ${showFullOverview ? 'expanded' : 'clamped'}`}>
                {movie.overview}
              </p>
              {movie.overview?.length > 200 && (
                <button className="read-more-btn" onClick={() => setShowMore(!showFullOverview)}>
                  {showFullOverview ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>

            {movieDetails?.credits && (
              <div className='modal-cast-crew'>
                {director && (
                  <div className="crew-section">
                    <strong>Director:</strong> <span>{director}</span>
                  </div>
                )}
                <div className="cast-section">
                  <strong>Starring:</strong> 
                  <div className="cast-grid">
                    {cast.map(person => (
                      <div key={person.id} className="cast-item">
                        {person.profile_path ? (
                          <img src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} alt={person.name} />
                        ) : (
                          <div className="profile-placeholder">{person.name.charAt(0)}</div>
                        )}
                        <span>{person.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {trailer && (
              <div className='modal-video-container'>
                <iframe
                  width="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {relatedMovies.length > 0 && (
              <div className='modal-similar-section'>
                <h3>Recommended Movies</h3>
                <div className='similar-movies-grid'>
                  {relatedMovies.map(rel => (
                    <div key={rel.id} className='similar-movie-item' onClick={() => navigateModal(rel)}>
                      <img src={rel.poster_path ? `https://image.tmdb.org/t/p/w200${rel.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Poster'} alt={rel.title} />
                      <p>{rel.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className='modal-footer'>
              <button className={`modal-favorite-btn ${isFavorite ? 'is-favorite' : ''}`} onClick={() => addFavorite(movie)}>
                <FaHeart /> {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              {movieDetails?.imdb_id && (
                <a href={`https://www.imdb.com/title/${movieDetails.imdb_id}`} target="_blank" rel="noopener noreferrer" className="imdb-link">
                  View on IMDb
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;
  return createPortal(modalContent, modalRoot);
}
