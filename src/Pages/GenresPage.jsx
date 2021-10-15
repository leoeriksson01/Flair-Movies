import React from "react";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import "../styles/MoviePage.css";
import { useState } from "react";
import { getGenres } from "../services/API";
import { useQuery } from "react-query";

function GenresPage() {

  const history = useHistory();

  // Query för att hantera hämtningen av data samt error tillsammans med sidan
  const { data, error, isError, isLoading } = useQuery(
    ["genreMovies"],
    () => getGenres()
  );
    console.log(data);

     

  return (
    <div className="background">
      <p className="pageHeader">Categories</p>

      {/* Visa Loading... om sidan laddas */}
      {isLoading && <p>Loading...</p>}

      {/* Visa Error i en Alert om fel uppstår */}
      {isError && <Alert variant="info">Error: {error.message}</Alert>}

      {/* Visa Datan när den har laddats */}

      {data?.results && (
       
        <div className="movieContainer">
          <div className="categoryContainer">
            {data.results.genres.map((genre) => (
              <div
                className="categoryCard"
                key={genre.id}
                onClick={() => history.push(`/genre/${genre.id}/1`)}
              >
               

                <p className="categoryTitle">
                  {genre.name}
                </p>
               
              </div>
            ))}
          </div>
        </div>
      )}

       
    </div>
   
  );
}

export default GenresPage;
