import "./App.css";
import MovieCards from "./components/movie-cards/movie-cards";
import Header from "./components/header/header";
import { fetchMovies } from "./components/services/movie-service";
import { useState, useEffect, useCallback } from "react";
import HomePage from "./components/homepage/homepage";
import Toolbar from "./components/toolbar/toolbar";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [currentSearch, setCurrentSearch] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [modalStack, setModalStack] = useState([]);
  const [showHomePage, setShowHomePage] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");

  const loadMovies = useCallback(async (pageNum = 1, append = false) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const data = await fetchMovies({
        query: currentSearch,
        page: pageNum,
        genre: selectedGenre,
        sortBy: sortBy
      });
      
      const results = data.results || [];
      
      setMovies(prev => {
        if (!append) return results;
        const existingIds = new Set(prev.map(m => m.id));
        const uniqueResults = results.filter(m => !existingIds.has(m.id));
        return [...prev, ...uniqueResults];
      });
      
      setHasMore(pageNum < data.total_pages);
    } catch (error) {
      console.error("Failed to load movies:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [currentSearch, selectedGenre, sortBy]);

  // Initial load and whenever filters change
  useEffect(() => {
    if (!showHomePage && !showFavorites) {
      loadMovies(1, false);
      setPage(1);
    }
  }, [selectedGenre, sortBy, currentSearch, showHomePage, showFavorites, loadMovies]);

  // Handle local storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(movie) {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.id === movie.id);
      if (isAlreadyFavorite) {
        return prev.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  }

  function toggleShowFavorites() {
    setShowFavorites((prev) => !prev);
    setShowHomePage(false);
    setHasMore(false);
  }

  function returnHome() {
    setShowFavorites(false);
    const searchInput = document.querySelector(".search-input");
    if (searchInput) searchInput.value = "";
    setCurrentSearch("");
    setMovies([]);
    setShowHomePage(true);
    setLoading(false);
    setSelectedGenre(null);
    setSortBy("popularity");
    setPage(1);
    setHasMore(true);
  }

  function returnToPopular() {
    setShowFavorites(false);
    const searchInput = document.querySelector(".search-input");
    if (searchInput) searchInput.value = "";
    setCurrentSearch("");
    setShowHomePage(false);
    setSelectedGenre(null);
    setSortBy("popularity");
    setPage(1);
  }

  async function updateSearch(e) {
    setCurrentSearch(e);
    if (e) setShowHomePage(false);
    setPage(1);
  }

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore || showFavorites || showHomePage) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadMovies(nextPage, true);
  }, [loadingMore, hasMore, page, showFavorites, showHomePage, loadMovies]);

  function openModal(movie) {
    setModalStack([movie]);
  }

  function navigateModal(movie) {
    setModalStack((prev) => [movie, ...prev]);
  }

  function goBackModal() {
    setModalStack((prev) => prev.slice(1));
  }

  function closeModal() {
    setModalStack([]);
  }

  return (
    <div className="App">
      <Header
        toggleShowFavorites={toggleShowFavorites}
        returnHome={returnHome}
        returnToPopular={returnToPopular}
        updateSearch={updateSearch}
        showFavorites={showFavorites}
      />
      <main className="main-content">
        {loading && <h1 className="loading-insert">Loading Movies...</h1>}
        
        {showHomePage && !currentSearch ? <HomePage currentSearch={currentSearch} /> : null}
        
        {(!showHomePage || currentSearch) && (
          <Toolbar 
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            sortBy={sortBy}
            setSortBy={setSortBy}
            isVisible={!loading}
          />
        )}

        <MovieCards
          movies={movies}
          addFavorite={toggleFavorite}
          favorites={favorites}
          showFavorites={showFavorites}
          currentSearch={currentSearch}
          openModal={openModal}
          closeModal={closeModal}
          modalStack={modalStack}
          navigateModal={navigateModal}
          goBackModal={goBackModal}
          selectedGenre={selectedGenre}
          sortBy={sortBy}
          loadMore={loadMore}
          hasMore={hasMore}
          loadingMore={loadingMore}
        />
      </main>
    </div>
  );
}

export default App;
