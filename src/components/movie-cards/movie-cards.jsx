import { GetPopular } from "../services/get-popular";
import React, { useEffect, useState } from 'react';
import './movie-cards.css';
import { FaHeart } from "react-icons/fa";
import Modals from "../modals/modals";


export default function MovieCards({movies, addFavorite, favorites, showFavorites, currentSearch, openModal, closeModal, modalOpen, openDialog}) {

  function showCard(movie) {
    return (
      <div 
        className='movie-card-container' 
        key={movie.id} 
        id={movie.id}
      >
        <div 
          className='movie-card-header'
          style={{filter: modalOpen !== '' ? 'blur(5px) grayscale(1)' : ''}}
        >
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt='Movie Poster' 
            className='movie-poster'
            data-ignore='true'
            onClick={() => {openModal(movie.id)}}
          />
          <FaHeart 
            className='like-button' 
            onClick={() => addFavorite(movie)}
            style={{
              color: favorites.some((fav) => fav.id === movie.id) ? 'red' : 'white',
            }}
          />
        </div>
        <div
          className='movie-card-body'
          style={{filter: modalOpen !== '' ? 'blur(5px) grayscale(1)' : ''}}
        >
          <p>{`${movie.original_title} (${movie.release_date && movie.release_date.substring(0, 4)})`}</p>
          <p>{movie.vote_average} / 10 <strong>{`(${movie.vote_count} votes)`}</strong></p>
        </div>
        <Modals 
          movie={movie} 
          openModal={openModal} 
          closeModal={closeModal}
          scaleState={{scale: modalOpen === movie.id ? 1 : 0}}
          addFavorite={addFavorite}
          favorites={favorites}
        />
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
    <div 
      className='movie-card-grid'
    >
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