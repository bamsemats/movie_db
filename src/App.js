import logo from "./logo.svg";
import "./App.css";
import MovieCards from "./components/movie-cards/movie-cards";
import Header from "./components/header/header";
import { GetPopular } from "./components/services/get-popular";
import { SearchMovies } from "./components/services/search-movies";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentSearch, setCurrentSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  const loadPopular = async () => {
    if (currentSearch === "") {
      setLoading(true);
      try {
        const popular = await GetPopular();
        setMovies(popular);
      } catch (error) {
        console.log(error);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadPopular();
  }, [currentSearch]);

  useEffect(() => {
    if (showFavorites) {
      document.querySelector(".search-input").value = "";
      setCurrentSearch((prev) => "");
    } else if (!showFavorites) {
      loadPopular();
    }
  }, [showFavorites]);

  function toggleFavorite(movie) {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.id === movie.id);
      if (isAlreadyFavorite) {
        // Remove the movie if it's already in favorites
        return prev.filter((fav) => fav.id !== movie.id);
      } else {
        // Add the movie if it's not in favorites
        return [...prev, movie];
      }
    });
  }

  function toggleShowFavorites() {
    setShowFavorites((prev) => !prev);
  }

  function returnHome() {
    setShowFavorites(false);
    document.querySelector(".search-input").value = "";
    setCurrentSearch("");
  }

  function searchUpdate(e) {
    setCurrentSearch((prev) => e);
  }

  async function updateSearch(e) {
    try {
      const results = await SearchMovies(e);
      setCurrentSearch((prev) => e);
      setMovies((prev) => results);
    } catch (error) {
      console.error(error);
      console.log("Error...", error);
    }
  }
  // console.log("Movies: ", movies);
  // console.log("Favorites: ", favorites);
  // console.log(showFavorites);
  // console.log(currentSearch);

  return (
    <div className="App">
      <Header
        toggleShowFavorites={toggleShowFavorites}
        returnHome={returnHome}
        searchUpdate={searchUpdate}
        updateSearch={updateSearch}
        showFavorites={showFavorites}
      />
      {loading ? <h1 className="loading-insert">Loading...</h1> : null}
      <MovieCards
        movies={movies}
        addFavorite={toggleFavorite}
        favorites={favorites}
        showFavorites={showFavorites}
        currentSearch={currentSearch}
      />
    </div>
  );
}

export default App;
