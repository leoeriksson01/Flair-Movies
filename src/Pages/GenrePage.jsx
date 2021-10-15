import React from "react";
import Alert from "react-bootstrap/Alert";
import { useHistory, useParams, Link } from "react-router-dom";
import "../styles/MoviePage.css";
import { useQuery } from "react-query";
import { getGenrePages } from "../services/Pagination";

function CategoryPage() {

  const history = useHistory();

  let { page, id, name } = useParams();


  // Query för att hantera hämtningen av data samt error tillsammans med sidan
  const { data, error, isError, isLoading } = useQuery(
    [`getMoviesByGenreId${id}`, page],
    () => {
      return getGenrePages(id, page);
    }
  );

  return (
    <div className="background">
      

      {/* Visa Loading... om sidan laddas */}
      {isLoading && <p>Loading...</p>}

      {/* Visa Error i en Alert om fel uppstår */}
      {isError && <Alert variant="info">Error: {error.message}</Alert>}

      {/* Visa Datan när den har laddats */}

      {data?.results && (

        
       
        <div className="movieContainer">
          <p className="pageHeader">Popular Movies for category {name}</p>
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

        <div className="genrePagination">
          {/* If current page is 1, don't show the previous page button */}
            {parseInt(page) !== 1 &&  (
              <Link
                to={`/genre/${id}/${parseInt(page) - 1}`}
              >
                Previous Page
              </Link>
            )}
            <span className="currentPage">Page:{page}</span>
            {/* If page is less than total_pages, show next page button */}
            {parseInt(page) < (`${data?.results.total_results}`) && (
              <Link
                to={`/genre/${id}/${parseInt(page) + 1}`}
              >
                Next Page
              </Link>
            )}
          </div>
    </div>
  );
}

export default CategoryPage;
