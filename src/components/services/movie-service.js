const BASE_URL = 'https://api.themoviedb.org/3';

const getOptions = () => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`
  }
});

export const fetchMovies = async ({ type = 'popular', query = '', page = 1, genre = null, sortBy = 'popularity.desc' }) => {
  let url = `${BASE_URL}/movie/popular?page=${page}&language=en-US`;

  // If we have a genre or a specific sort, we use the 'discover' endpoint
  if (genre || sortBy !== 'popularity.desc') {
    const sortMap = {
      'popularity': 'popularity.desc',
      'rating': 'vote_average.desc',
      'date': 'primary_release_date.desc',
      'title': 'original_title.asc'
    };
    
    const tmdbSort = sortMap[sortBy] || 'popularity.desc';
    url = `${BASE_URL}/discover/movie?page=${page}&sort_by=${tmdbSort}&with_genres=${genre || ''}&language=en-US&vote_count.gte=100`; // vote_count filter for better quality
  }

  // If we have a search query, search takes precedence
  if (query) {
    url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=en-US`;
  }

  const response = await fetch(url, getOptions());
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};
