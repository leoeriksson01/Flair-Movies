import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const get = async (endpoint) => {
  const response = await axios.get(endpoint);

  // return content
  return {
    results: response.data,
  };
};

export const getPopularMovies = async (page) => {
  return await get(
    `/movie/popular?api_key=2bb7ef370c6b66ee73f2d6df84dca7f3&page=${page}`
  );
};

export const getLatestMovies = async (page) => {
  return await get(
    `/movie/now_playing?api_key=2bb7ef370c6b66ee73f2d6df84dca7f3&page=${page}`
  );
};

export const getTopRatedMovies = async (page) => {
  return await get(
    `/movie/top_rated?api_key=2bb7ef370c6b66ee73f2d6df84dca7f3&page=${page}`
  );
};

export const getMovieById = async (id) => {
  return await get(
    `/movie/${id}?api_key=2bb7ef370c6b66ee73f2d6df84dca7f3&language=en-US&append_to_response=credits,images,similar_movies`
  );
};

export const getPersonById = async (id) => {
  return await get(
    `/person/${id}?api_key=2bb7ef370c6b66ee73f2d6df84dca7f3&append_to_response=credits`
  );
};

export const getMoviesByGenreId = async (id, page) => {
  return await get(
    `/discover/movie?api_key=2bb7ef370c6b66ee73f2d6df84dca7f3&sort_by_popularity&with_genre=${id}&page=${page}`
  );
};

export const getMoviesBySearch = async (page, searchText) => {
  return await get(
    `/search/movie?api_key=2bb7ef370c6b66ee73f2d6df84dca7f3&language=en-US&query=${searchText}&page=${page}`
  );
};

export const getGenres = async (page, id) => {
  return await get(
    `/genre/movie/list?api_key=2bb7ef370c6b66ee73f2d6df84dca7f3`
  );
};

export default {
  getPopularMovies,
  getLatestMovies,
  getPersonById,
  getMovieById,
  getMoviesByGenreId,
  getMoviesBySearch,
};
