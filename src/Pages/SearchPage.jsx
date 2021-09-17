import React from "react";
import "../styles/Search.css";
import { useState } from "react";
import { useQuery } from "react-query";
import PagePagination from "../components/PagePagination";
import { getMoviesBySearch } from "../services/API";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [searchInputText, setSearchInputText] = useState("");

  const history = useHistory();
  // Skapa page state som börjar på sida 1 som sedan går att uppdatera
  const [page, setPage] = useState(1);

  // Query för att hantera hämtningen av data samt error tillsammans med sidan
  const { data, isLoading } = useQuery(
    ["searchedMovies", searchText, page],
    () => getMoviesBySearch(page, searchText)
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setSearchText(searchInputText);
  };

  const handleInputChange = (e) => {
    setSearchInputText(e.target.value);
  };

  return (
    <div className="background">
      <p className="pageHeader">Search for movies </p>
      <div className="search">
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeHolder="Enter Text Here..."
            value={searchInputText}
            onChange={handleInputChange}
          />
        </form>
      </div>
      {/* Visa Loading... om sidan laddas */}
      {isLoading && <p>Waiting for input...</p>}

      {/* Visa Datan när den har laddats */}

      {data?.results && (
        <div className="movieContainer">
          <div className="movies">
            {data.results.results.map((movie) => (
              <div
                className="movieCard"
                key={movie.id}
                onClick={() => history.push(`/movies/${movie.id}`)}
              >
                <div
                  className="poster"
                  style={{
                    backgroundImage: movie.backdrop_path
                      ? `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`
                      : "url(https://www.corepixel.se/pub_images/original/No-image-available.jpg)",
                  }}
                  alt={movie.title}
                />
                <p className="title">
                  {movie.title} {movie.name}
                </p>
                <span className="subTitle">
                  {movie.media_type === "tv" ? "TV Series" : "Movie"}{" "}
                </span>
                <span className="subTitle">
                  {movie.first_air_date} {movie.release_date}{" "}
                </span>
                <span className="rating">
                  {" "}
                  Average Rating: {movie.vote_average}{" "}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <PagePagination setPage={setPage} />
    </div>
  );
}

export default SearchPage;
