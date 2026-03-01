import './header.css';
import { MdLocalMovies, MdSearch } from "react-icons/md";
import { FaHeart, FaHome } from "react-icons/fa";

export default function Header({
  toggleShowFavorites,
  returnToPopular,
  returnHome,
  showFavorites,
  updateSearch
}) {
  return (
    <header className='header-container'>
      <div className='header-logo' onClick={returnHome}>
        <MdLocalMovies className='logo-image' style={{ color: 'var(--accent-color)' }} />
        <h1 className='title'>Movie Library</h1>
      </div>

      <div className='nav-actions'>
        <div className='search-container'>
          <MdSearch className='search-icon' size={20} />
          <input 
            type='text' 
            placeholder='Search movies...' 
            className='search-input' 
            onChange={(e) => updateSearch(e.target.value)}
          />
        </div>

        <div className='nav-icons'>
          <button className='icon-button' onClick={returnHome}>
            <FaHome size={20} />
            <span className='tooltip'>Home</span>
          </button>
          
          <button className='icon-button' onClick={returnToPopular}>
            <MdLocalMovies size={20} />
            <span className='tooltip'>Popular</span>
          </button>
          
          <button 
            className={`icon-button ${showFavorites ? 'active' : ''}`} 
            onClick={toggleShowFavorites}
          >
            <FaHeart size={20} style={{ color: showFavorites ? 'var(--danger-color)' : 'inherit' }} />
            <span className='tooltip'>Favorites</span>
          </button>
        </div>
      </div>
    </header>
  );
}
