import React from 'react'
import axios from "axios";
import Papa from "papaparse";
import Row from './Row';
import { useState, useEffect } from "react";

const Recommendations = ({ titleHead ,movieName }) => {
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    // Make the API call and retrieve the movie recommendations
    axios
      .post(
        "https://aryan29-movie-recommender-system.hf.space/run/predict",
        {
          data: [movieName],
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        
        const movieTitles = response.data.data[0].split("\n");

        // Load the CSV file that contains the movie titles and IDs
        axios.get("/watchwise/movies.csv").then((csvResponse) => {
          const movies = [];

          // Parse the CSV data into an array of movie objects
          Papa.parse(csvResponse.data, {
            header: true,
            complete: (results) => {
              results.data.forEach((row) => {
                // Check if the movie title is in the recommendations
                if (movieTitles.includes(row.title)) {
                  movies.push({
                    id: row.id,
                    title: row.title,
                  });
                }
              });
              setMovies(movies);
            },
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieName]);
 


  return (
   
    <Row title={titleHead} movieIds={movies.map((movie) => movie.id)} />

  
    
  )
 
}
export default Recommendations;

