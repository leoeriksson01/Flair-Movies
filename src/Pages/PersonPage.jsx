import React from "react";
import Alert from "react-bootstrap/Alert";
import "../styles/PersonPage.css";
import { getPersonById } from "../services/API";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

function PersonPage() {
  const history = useHistory();
  const { id } = useParams();

  const { data, error, isError, isLoading } = useQuery(["person", id], () => {
    return getPersonById(id);
  });

  return (
    <div className="background">
      {/* Visa Loading... om sidan laddas */}
      {isLoading && <p>Loading...</p>}
      {/* Visa Error i en Alert om fel uppstår */}
      {isError && <Alert variant="info">Error: {error.message}</Alert>}
      {/* Visa Datan när den har laddats */}
      {data?.results && (
        <div className="personContainer">
          <div className="topContainer">
            <div className="personImgName">
              <div
                className="personPoster"
                style={{
                  backgroundImage: data.results.profile_path
                    ? `url('https://image.tmdb.org/t/p/original/${data?.results.profile_path}')`
                    : "url(https://www.corepixel.se/pub_images/original/No-image-available.jpg)",
                }}
                alt={data.results.name}
              />

              <p className="personName"> {data.results.name}</p>
            </div>

            <div className="personInfo">
              <p>
                Birthday:{" "}
                {data.results.birthday ? data.results.birthday : "Unknown"}
              </p>
              <p>Known for: {data.results.known_for_department}</p>
              <p>Gender: {data.results.gender === 1 ? "Female" : "Male"}</p>
            </div>
          </div>
          <div className="personBiography">
            <p>{data.results.biography ? data.results.biography : ""}</p>
          </div>

          <h2> Features In </h2>

          <div className="personMovies">
            {data.results.credits.cast.map((movie, i) => (
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
      )}{" "}
    </div>
  );
}

export default PersonPage;
