import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Bookmark, Star } from "@mui/icons-material";
import type { Movie } from "client-api";

type MovieCardProps = {
  movie: Movie | "skeleton";
  onRemoveFromLibrary: (m: Movie) => void;
  onAddToLibrary: (m: Movie) => void;
};

export function MovieCard({
  movie,
  onRemoveFromLibrary,
  onAddToLibrary,
}: MovieCardProps) {
  return (
    <Card
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {movie !== "skeleton" && movie.poster !== "N/A" ? (
        <CardMedia
          component={"img"}
          height="444"
          sx={{ padding: 1, maxWidth: "100%", borderRadius: 3 }}
          image={movie.poster}
        />
      ) : (
        <CardMedia
          component={Skeleton}
          variant="rectangular"
          height={427}
          sx={{
            margin: 1,
            maxWidth: "100%",
            borderRadius: 1,
          }}
          {...(movie === "skeleton" ? {} : { animation: false })}
        />
      )}
      <CardContent sx={{ paddingY: 1, paddingX: 3 }}>
        <Stack direction="row" display="flex" alignItems="center">
          <Typography
            lineHeight={1}
            variant="body2"
            color="text.primary"
            fontSize="large"
            mr="auto"
          >
            {movie === "skeleton" ? (
              <Skeleton
                variant="rectangular"
                sx={{ minHeight: "100%", minWidth: 150 }}
              />
            ) : (
              movie.title
            )}
          </Typography>
          <Star color={movie === "skeleton" ? "disabled" : "warning"} />
          <Typography
            lineHeight={1}
            variant="body2"
            color="text.secondary"
            fontSize="large"
            ml={1}
          >
            {movie === "skeleton" ? (
              <Skeleton
                variant="rectangular"
                sx={{ minHeight: "100%", minWidth: 30 }}
              />
            ) : (
              movie.rating
            )}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions
        sx={{ paddingX: 3, paddingBottom: 2, paddingTop: 0, marginTop: "auto" }}
      >
        {movie === "skeleton" ? (
          <Skeleton variant="text" sx={{ minHeight: 50, minWidth: "100%" }} />
        ) : (
          <Button
            onClick={() => {
              if (movie.hasAlreadyBeenAdded) onRemoveFromLibrary(movie);
              else onAddToLibrary(movie);
            }}
            fullWidth
            color={movie.hasAlreadyBeenAdded ? "error" : "success"}
            variant="contained"
            startIcon={<Bookmark fontSize="inherit" />}
          >
            <Typography textTransform={"none"}>
              {movie.hasAlreadyBeenAdded ? "Remove" : "Add to My Library"}
            </Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
