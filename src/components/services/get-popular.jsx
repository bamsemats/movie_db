const BASE_URL = 'https://recipe-backend-d4dq.onrender.com';

export const GetPopular = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/api/popular?page=${page}`);
  if (!response.ok) {
    throw new Error(`HTTP Error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
