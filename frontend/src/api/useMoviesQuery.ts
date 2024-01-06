import { useState } from "react";

export type Movie = {
  id: string;
  title: string;
  poster: string;
  rating: string;
  hasAlreadyBeenAdded?: boolean;
};

const moviesMock = [
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117500",
    rating: "7.4",
  },
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117501",
    rating: "7.4",
  },
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117502",
    rating: "7.4",
  },
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117503",
    rating: "7.4",
  },
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117504",
    rating: "7.4",
  },
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117505",
    rating: "7.4",
  },
] satisfies Movie[];

export function useMoviesQuery() {
  const [movies, setMovies] = useState<Movie[]>([]);

  function sendQuery(query: string) {
    query;
    // send query to api
    // .then
    setMovies(moviesMock);
  }

  return { movies, sendQuery, setMovies };
}
