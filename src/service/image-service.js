import axios from 'axios';

const API_KEY = 'BqXlnvnKtVKobo1V976wjKGLgqOaBqBEP7rGbIuBUN3cuFKTOUOXA7go';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  query: '',
};

export const getImages = async (query, page) => {
  const result = await axios.get(`search?query=${query}&page=${page}`)
  return result.data;
};


