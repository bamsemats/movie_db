import './modals.css';
import { genres } from './data';
import { useEffect, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWU5YTk3N2U4MWVmNWFkOTlkNTU0Zjc5NGIxYzczZSIsIm5iZiI6MTc0NTQxMjMyNS42NzUsInN1YiI6IjY4MDhlMGU1Yzk2ZTBkY2MwNWVlNDUyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mxa7Zq4VX5ZBG6pM7ha0nxKjkFo8o80yPTh8PpkB6Ao'
  }
};

export default function Modals({movie, openModal, closeModal, modalOpen, scaleState, addFavorite, favorites, openDialog}) {
  const [actors, setActors] = useState([]);
  
  const getMovieActors = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`, options);
      const result = await response.json();
      setActors([
        result.cast[0].name, result.cast[1].name, result.cast[2].name]);
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  useEffect(() => {
    getMovieActors();
  }, []);

  const movieGenres = movie.genre_ids?.map((id) => genres.map((genre) => {
    return (
      genre.id === id ? `${genre.name} ` : null
    )
  })
  )
  
  return (
    <div className='movie-modal-card' id={`modal-${movie.id}`} key={`modal-${movie.id}`} style={scaleState}>
      <div className='modal-info-div'>
         <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='Movie Poster' className='modal-poster'/>
        <div className='modal-info'>
          <h3>{`${movie.original_title} (${movie.release_date && movie.release_date.substring(0, 4)})`}</h3>
          <i>{movieGenres}</i>
          <p>{`${actors[0]}, ${actors[1]}, ${actors[2]}`}</p>
          <p>{`${movie.overview}`}</p>
          <p>{movie.vote_average} / 10 <strong>{`(${movie.vote_count} votes)`}</strong></p>
        </div>
      </div>
      <RxCross1 className='modal-close-button' onClick={() => {closeModal(movie.id)}}/>
      <FaHeart 
        className='like-button' 
        onClick={() => addFavorite(movie)}
        style={{
          color: favorites.some((fav) => fav.id === movie.id) ? 'red' : 'white',
        }}
      />
    </div>
  )
}