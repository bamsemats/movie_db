import './header.css';
import { MdLocalMovies } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

export default function Header({toggleShowFavorites, returnHome, searchUpdate, showFavorites, updateSearch}) {

  function handleMouseEnter(prop) {
    const tooltip = document.querySelector(`.${prop}`);
    tooltip.style.opacity = '1';
  };

  function handleMouseLeave(prop) {
    const tooltip = document.querySelector(`.${prop}`);
    tooltip.style.opacity = '0';
  };
  return (
    <header className='header-container'>
      <div className='header-logo'>
        <MdLocalMovies 
          className='logo-image' 
          onMouseEnter={() => handleMouseEnter('movies-tooltip')}
          onMouseLeave={() => handleMouseLeave('movies-tooltip')}
          onClick={returnHome}
        />
        <span className='movies-tooltip'>Popular</span>
        <FaHeart 
          className='heart-image'
          onMouseEnter={() => handleMouseEnter('favorites-tooltip')}
          onMouseLeave={() => handleMouseLeave('favorites-tooltip')}
          onClick={toggleShowFavorites}
          style={{color: showFavorites ? 'red' : 'white'}}
        />
        <span className='favorites-tooltip'>Favorites</span>
      </div>
      <h1 className='title'>Movie Library</h1>
      <div className='search-bar'>
        <input type='text' placeholder='Search...' className='search-input' id='search-input' onChange={(e) => {updateSearch(e.target.value)}}/>
      </div>
    </header>
  )
}