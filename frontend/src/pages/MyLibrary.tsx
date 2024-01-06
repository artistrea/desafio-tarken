import { Alert, Grid, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useMoviesLibrary } from "../api/useMoviesLibrary";
import { MovieCard } from "../components/MovieCard";
import { useState } from "react";
import { Movie } from "../api/useMoviesQuery";

export function MyLibraryPage() {
  const { movies, setMovies } = useMoviesLibrary();
  const [lastDeleted, setLastDeleted] = useState<Movie | undefined>(undefined);

  return (
    <div
      style={{
        display: "contents",
      }}
    >
      <Stack display={"flex"} flexDirection={"row"}>
        <h1 style={{ margin: 0, paddingBlock: 6 }}>
          <Typography fontSize={26}>My Library</Typography>
        </h1>
        {lastDeleted && (
          <Alert
            onClose={() => setLastDeleted(undefined)}
            sx={{ marginLeft: "auto" }}
          >
            {lastDeleted.title} deleted from your watchlist
          </Alert>
        )}
      </Stack>
      <main
        style={{
          padding: 16,
          height: "100%",
        }}
      >
        {movies?.length ? (
          <Grid container spacing={2}>
            {movies.map((m) => (
              <Grid item key={m.id}>
                <MovieCard
                  onAddToLibrary={() =>
                    setMovies((ms) =>
                      ms.map((mv) =>
                        mv.id === m.id
                          ? { ...mv, hasAlreadyBeenAdded: true }
                          : mv
                      )
                    )
                  }
                  onRemoveFromLibrary={() => {
                    setLastDeleted(m);
                    setMovies((ms) => ms.filter((mv) => mv.id !== m.id));
                  }}
                  movie={m}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <SearchIcon
              color="action"
              sx={{
                width: 300,
                height: 300,
                stroke: "var(--clr-bg)",
                strokeWidth: 1.5,
              }}
            />
            <Typography color="GrayText">
              It looks like there are no movies in your library! Search for a
              movie you have watched and add it here!
            </Typography>
          </div>
        )}
      </main>
    </div>
  );
}
