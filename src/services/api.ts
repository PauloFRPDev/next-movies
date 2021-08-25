import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: "Bearer " + process.env.REACT_APP_AUTH_API_KEY,
  },
});

const imageApi = axios.create({
  baseURL: "https://image.tmdb.org/t/p/original",
  headers: {
    Authorization: "Bearer " + process.env.REACT_APP_AUTH_API_KEY,
  },
});

export { api, imageApi };
