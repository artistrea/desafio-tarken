import { useState } from "react";

const moviesMock = [
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117500",
    rating: "7.4",
    hasAlreadyBeenAdded: true,
  },
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117501",
    rating: "7.4",
    hasAlreadyBeenAdded: true,
  },
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117502",
    rating: "7.4",
    hasAlreadyBeenAdded: true,
  },
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117503",
    rating: "7.4",
    hasAlreadyBeenAdded: true,
  },
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117504",
    rating: "7.4",
    hasAlreadyBeenAdded: true,
  },
  {
    title: "The Rock",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
    id: "tt0117505",
    rating: "7.4",
    hasAlreadyBeenAdded: true,
  },
] satisfies Movie[];

export function useMoviesLibrary() {
  const [movies, setMovies] = useState<Movie[]>(moviesMock);

  return { movies, setMovies };
}
