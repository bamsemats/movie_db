const BASE_URL = 'https://recipe-backend-d4dq.onrender.com';

export const SearchMovies = async (query) => {
  const response = await fetch(`${BASE_URL}/api/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`HTTP Error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};