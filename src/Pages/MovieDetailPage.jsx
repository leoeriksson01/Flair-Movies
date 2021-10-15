import React from "react";
import Alert from "react-bootstrap/Alert";
import "../styles/DetailPage.css";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/API";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

function MovieDetailPage() {
  const history = useHistory();
  const { id } = useParams();

  const { data, error, isError, isLoading } = useQuery(["movie", id], () => {
    return getMovieById(id);
  });

  return (
    <div className="background">
      {/* Visa Loading... om sidan laddas */}
      {isLoading && <p>Loading...</p>}
      {/* Visa Error i en Alert om fel uppstår */}
      {isError && <Alert variant="info">Error{error.message}</Alert>}
      {/* Visa Datan när den har laddats */}
      {data?.results && (
        <div className="detailContainer">
          <div className="posterContainer">
            <div
              className="detailPoster"
              style={{
                backgroundImage: data.results.backdrop_path
                  ? `url('https://image.tmdb.org/t/p/original/${data.results?.backdrop_path}')`
                  : "url(https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg)",
              }}
              alt={data.results.title}
            />
            <span className="detailHeader">{data.results.title}</span>
          </div>

          <div className="detailInfo">
            <div className="detailMainInfo">
              <p> {data.results.overview}</p>
            </div>

            <div className="detailExtraInfo">
              <p> Runtime: {data.results.runtime} min</p>

              <p>
                Spoken Languages:
                {data.results.spoken_languages.map((language, i) => (
                  <div key={i}>{language.name}</div>
                ))}
              </p>

              <p> Average Rating: {data.results.vote_average}</p>
            </div>

            <div className="categories">
              <p> Categories: </p>
              {data.results.genres.map((genre, i) => (
                <div key={i} onClick={() => history.push(`/genre/${genre.id}/1`)}>
                  <p>{genre.name}</p>
                </div>
              ))}
            </div>
          </div>

          <h2 className="pageHeader"> Cast </h2>
          <div className="actors">
            {data.results.credits.cast.map((actor, i) => (
              <div
                className="actorCard"
                key={i}
                onClick={() => history.push(`/person/${actor.id}`)}
              >
                <div
                  className="actorPoster"
                  style={{
                    backgroundImage: actor.profile_path
                      ? `url('https://image.tmdb.org/t/p/original/${actor?.profile_path}')`
                      : "url(https://www.corepixel.se/pub_images/original/No-image-available.jpg)",
                  }}
                  alt={actor.name}
                />
                <p className="actorName">{actor.name}</p>
                <p> As: {actor.character}</p>
              </div>
            ))}
          </div>

          <h2 className="pageHeader"> Similar Movies </h2>
          <div className="personMovies">
            {data.results.similar_movies.results.map((movie, i) => (
              <div
                className="personMovieCard"
                key={i}
                onClick={() => history.push(`/movies/${movie.id}`)}
              >
                <div
                  className="personMoviePoster"
                  style={{
                    backgroundImage: movie?.backdrop_path
                      ? `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`
                      : "url(https://www.corepixel.se/pub_images/original/No-image-available.jpg)",
                  }}
                  alt={movie.name}
                />
                <p> {movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetailPage;
