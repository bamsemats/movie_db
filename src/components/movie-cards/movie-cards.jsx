import { GetPopular } from "../services/get-popular";
import React, { useEffect, useState } from 'react';
import './movie-cards.css';
import { FaHeart } from "react-icons/fa";

export default function MovieCards({movies, addFavorite, favorites, showFavorites, currentSearch}) {

  function showCard(movie) {
    return (
      <div className='movie-card-container' key={movie.id}>
        <div className='movie-card-header'>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='Movie Poster' className='movie-poster'/>
          <FaHeart 
            className='like-button' 
            onClick={() => addFavorite(movie)}
            style={{
              color: favorites.some((fav) => fav.id === movie.id) ? 'red' : 'white',
            }}
          />
        </div>
        <div className='movie-card-body'>
          <p>{`${movie.original_title} (${movie.release_date && movie.release_date.substring(0, 4)})`}</p>
          <p>{movie.vote_average} / 10 <strong>{`(${movie.vote_count} votes)`}</strong></p>
        </div>
      </div>
    )
  }

  // ** THIS WAS THE ORIGINAL CODE **
  // return (
  //   <div className='movie-card-grid'>
  //   {(showFavorites ? favorites : movies).map((movie) => {
  //     if (!showFavorites && currentSearch === '') {
  //     return (
  //       showCard(movie)
  //     )
  //     } else if (showFavorites && currentSearch === '' && favorites.some((fav) => fav.id === movie.id)) {
  //       return (
  //         showCard(movie)
  //       )
  //     } else if (!showFavorites && movie.original_title.toUpperCase().includes(currentSearch.toUpperCase())) {
  //       return (
  //         showCard(movie)
  //       )
  //     } else if (showFavorites && movie.original_title.toUpperCase().includes(currentSearch.toUpperCase()) && favorites.some((fav) => fav.id === movie.id)) {
  //       return (
  //         showCard(movie)
  //       )
  //     }
  //     else {
  //       return null
  //     }
  //   })}
  //   </div>
  // )


  // ** THIS CODE WAS 'OPTIMIZED' BY COPILOT I.E. 'CHEATING' **
  return (
    <div>
    <div className='movie-card-grid'>
      {(showFavorites ? favorites : movies)
        .filter((movie) =>
          currentSearch === '' ||
          movie.original_title.toUpperCase().includes(currentSearch.toUpperCase())
        )
        .map((movie) => showCard(movie))}
        
    </div>
    {showFavorites && favorites.length < 1 ? <div className='empty-favorites'>No favorites added {`:(`}</div> : null}
    </div>
  );
}