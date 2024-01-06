import { Button, Grid, Input, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useMoviesQuery } from "../api/useMoviesQuery";
import { MovieCard } from "../components/MovieCard";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const { movies, setMovies, sendQuery } = useMoviesQuery();

  return (
    <div
      style={{
        display: "contents",
      }}
    >
      <Stack display={"flex"} flexDirection={"row"}>
        <h1 style={{ margin: 0 }}>
          <Typography fontSize={26}>Search</Typography>
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendQuery(query);
          }}
          style={{
            background: "#fff",
            borderRadius: "999vmax",
            display: "flex",
            alignItems: "center",
            padding: 0,
            overflow: "hidden",
            marginLeft: "auto",
          }}
        >
          <Input
            disableUnderline
            style={{
              paddingInline: 20,
              marginTop: "auto",
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" color="info" style={{ height: "100%" }}>
            <SearchIcon color="action" />
          </Button>
        </form>
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
                  onRemoveFromLibrary={() =>
                    setMovies((ms) =>
                      ms.map((mv) =>
                        mv.id === m.id
                          ? { ...mv, hasAlreadyBeenAdded: false }
                          : mv
                      )
                    )
                  }
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
              We couldn't find the movies you were looking for :(
            </Typography>
          </div>
        )}
      </main>
    </div>
  );
}
