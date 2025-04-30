import "./App.css";
import MovieCards from "./components/movie-cards/movie-cards";
import Header from "./components/header/header";
import { GetPopular } from "./components/services/get-popular";
import { SearchMovies } from "./components/services/search-movies";
import { useState, useEffect, useRef } from "react";
import HomePage from "./components/homepage/homepage";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [currentSearch, setCurrentSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [modalOpen, setModalOpen] = useState("");
  const [showHomePage, setShowHomePage] = useState(true);
  const closeHandlerRef = useRef(null);

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

  // useEffect(() => {
  //   loadPopular();
  // }, [currentSearch]);

  // useEffect(() => {
  //   if (showFavorites) {
  //     document.querySelector(".search-input").value = "";
  //     setCurrentSearch((prev) => "");
  //   } else if (!showFavorites) {
  //     loadPopular();
  //   }
  // }, [showFavorites]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

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
    setShowHomePage(false);
  }

  function returnHome() {
    setShowFavorites(false);
    document.querySelector(".search-input").value = "";
    setMovies([]);
    setShowHomePage(true);
    setLoading(false);
  }

  function returnToPopular() {
    setShowFavorites(false);
    document.querySelector(".search-input").value = "";
    setCurrentSearch("");
    setShowHomePage(false);
    loadPopular();
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

  function openDialog(id) {
    const dialog = document.getElementById(`modal-${id}`);
    dialog.showModal();
  }

  function openModal(id) {
    setModalOpen((prev) => id);

    if (closeHandlerRef.current) {
      window.removeEventListener("click", closeHandlerRef.current);
    }

    closeHandlerRef.current = (e) => {
      const modalElement = document.getElementById(`modal-${id}`);
      if (modalElement && !modalElement.contains(e.target)) {
        closeModal();
      }
    };

    setTimeout(() => {
      window.addEventListener("click", closeHandlerRef.current);
    }, 0);
  }

  function closeModal() {
    setModalOpen((prev) => "");
    if (closeHandlerRef.current) {
      window.removeEventListener("click", closeHandlerRef.current);
      closeHandlerRef.current = null;
    }
  }

  // console.log("Movies: ", movies);
  // console.log("Favorites: ", favorites);
  // console.log(showFavorites);
  console.log(currentSearch);
  console.log(typeof currentSearch);
  // console.log(JSON.parse(localStorage.getItem("favorites")));
  // console.log(modalOpen);

  return (
    <div className="App">
      <Header
        toggleShowFavorites={toggleShowFavorites}
        returnHome={returnHome}
        returnToPopular={returnToPopular}
        searchUpdate={searchUpdate}
        updateSearch={updateSearch}
        showFavorites={showFavorites}
      />
      {loading ? <h1 className="loading-insert">Loading...</h1> : null}
      {showHomePage ? <HomePage currentSearch={currentSearch} /> : null}
      <MovieCards
        movies={movies}
        addFavorite={toggleFavorite}
        favorites={favorites}
        showFavorites={showFavorites}
        currentSearch={currentSearch}
        openModal={openModal}
        closeModal={closeModal}
        modalOpen={modalOpen}
        openDialog={openDialog}
      />
    </div>
  );
}

export default App;
