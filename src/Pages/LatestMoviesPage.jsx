import React from "react";
import Alert from "react-bootstrap/Alert";
import "../styles/MoviePage.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { getLatestMovies } from "../services/API";
import { useQuery } from "react-query";
import PagePagination from "../components/PagePagination";

function LatestMoviesPage() {
  const history = useHistory();
  // Skapa page state som börjar på sida 1 som sedan går att uppdatera
  const [page, setPage] = useState(1);

  // Query för att hantera hämtningen av data samt error tillsammans med sidan
  const { data, error, isError, isLoading } = useQuery(
    ["latestMovies", page],
    () => getLatestMovies(page)
  );

  return (
    <div className="background">
      <p className="pageHeader">Latest Movies</p>

      {/* Visa Loading... om sidan laddas */}
      {isLoading && <p>Loading...</p>}

      {/* Visa Error i en Alert om fel uppstår */}
      {isError && <Alert variant="info">Error: {error.message}</Alert>}

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
                    backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
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

export default LatestMoviesPage;
