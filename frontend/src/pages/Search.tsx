import { Button, Grid, Input, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { MovieCard } from "../components/MovieCard";
import { useSearchQuery } from "../clientApi/movies/useSearchQuery";
import { useRemoveFromLibraryMutation } from "../clientApi/libraryMovies/useRemoveFromLibraryMutation";
import { useAddToLibraryMutation } from "../clientApi/libraryMovies/useAddToLibraryMutation";
import { useLibraryQuery } from "../clientApi/libraryMovies/useLibraryQuery";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchingFor, setSearchingFor] = useState("");
  const {
    data: moviePages,
    fetchNextPage,
    isFetching,
    isLoading,
  } = useSearchQuery(searchingFor);

  const ref = useRef<HTMLDivElement>(null);

  const { mutateAsync: removeFromLib } = useRemoveFromLibraryMutation();
  const { mutateAsync: addToLib } = useAddToLibraryMutation();
  const { data: library } = useLibraryQuery();

  const idsAdded = library?.map((m) => m.id) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isSearching = !!searchingFor;
        const isAlmostToTheEnd = entry.isIntersecting;
        const lastPageHasMovies =
          moviePages?.pages &&
          moviePages.pages[moviePages.pages.length - 1].movies.length > 0;

        if (
          !isFetching &&
          isSearching &&
          isAlmostToTheEnd &&
          lastPageHasMovies
        ) {
          fetchNextPage();
        }
      },
      { rootMargin: "1000px" }
    );

    ref.current && observer.observe(ref.current);
    return () => observer.disconnect();
  }, [searchingFor, fetchNextPage, isFetching, moviePages?.pages]);

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
            setSearchingFor(query);
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
        {moviePages?.pages.flatMap((m) => m.movies).length ? (
          <Grid container spacing={2}>
            {moviePages?.pages.map(({ movies }) =>
              movies.map((m) => (
                <Grid item key={m.id}>
                  <MovieCard
                    onAddToLibrary={() => {
                      // usando update pessimista só por simplicidade pra evitar bugs
                      addToLib(m.id);
                    }}
                    onRemoveFromLibrary={() => {
                      removeFromLib(m.id);
                    }}
                    movie={{
                      ...m,
                      hasAlreadyBeenAdded: idsAdded.includes(m.id),
                    }}
                  />
                </Grid>
              ))
            )}
            <div style={{ display: "hidden" }} ref={ref}></div>

            {isFetching &&
              Array.from({ length: 9 }).map((_, i) => (
                <Grid item key={i}>
                  <MovieCard
                    onAddToLibrary={() => {}}
                    onRemoveFromLibrary={() => {}}
                    movie={"skeleton"}
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
            {isLoading ? (
              <div className="spinner" style={{ color: "black" }} />
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
