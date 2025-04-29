const BASE_URL = 'https://recipe-backend-d4dq.onrender.com';

export const GetPopular = async () => {
  const response = await fetch(`${BASE_URL}/api/popular`);
  if (!response.ok) {
    throw new Error(`HTTP Error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};