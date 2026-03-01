import './homepage.css';

export default function HomePage({ currentSearch }) {
  // If there's a search query, we hide the homepage content
  if (currentSearch !== '') return null;

  return (
    <div className='home-page-container fade-in'>
      <div className='home-page-div'>
        <h1 className='home-page-title'>
          Explore Your Favorite Movies
        </h1>
        <p className='home-page-article'>
          Welcome to the Movie Library. This project is a showcase of modern web development 
          practices using React. Browse through popular titles, search for your favorites, 
          and build your own personal collection.
        </p>
        <p className='home-page-article'>
          Data provided by <a href='https://www.themoviedb.org/' target="_blank" rel="noopener noreferrer">The Movie Database (TMDB)</a>.
        </p>
      </div>
    </div>
  );
}
