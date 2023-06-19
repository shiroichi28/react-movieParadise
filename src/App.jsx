import React, { useState, useEffect } from "react";

import MovieCard from "./movieCard";
import SearchIcon from "./assets/search.svg";

const API_URL = "http://www.omdbapi.com?apikey=75d6c475";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("One Piece");
  }, []);

  const searchMovies = async (title) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Replace '*' with the actual domain if possible
      },
    };

    const response = await fetch(`${API_URL}&s=${title}`, requestOptions);

    const data = await response.json();

    setMovies(data.Search);
  };
  const searchEnterKey = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };
  return (
    <div className="app">
      <h1>Movie Paradise</h1>

      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          onKeyDown={searchEnterKey}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
