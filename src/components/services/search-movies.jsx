const BASE_URL = 'https://recipe-backend-d4dq.onrender.com';

export const SearchMovies = async (query, page = 1) => {
  const response = await fetch(`${BASE_URL}/api/search?query=${encodeURIComponent(query)}&page=${page}`);
  if (!response.ok) {
    throw new Error(`HTTP Error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
