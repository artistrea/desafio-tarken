import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Bookmark, Star } from "@mui/icons-material";
import { Movie } from "../api/useMoviesQuery";

type MovieCardProps = {
  movie: Movie;
  onRemoveFromLibrary: (m: Movie) => void;
  onAddToLibrary: (m: Movie) => void;
};

export function MovieCard({
  movie,
  onRemoveFromLibrary,
  onAddToLibrary,
}: MovieCardProps) {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        component="img"
        height="444"
        sx={{ padding: 1, maxWidth: "100%", borderRadius: 3 }}
        image={movie.poster}
      />
      <CardContent sx={{ paddingY: 1, paddingX: 3 }}>
        <Stack direction="row" display="flex" alignItems="center">
          <Typography
            lineHeight={1}
            variant="body2"
            color="text.primary"
            fontSize="large"
            mr="auto"
          >
            {movie.title}
          </Typography>
          <Star color="warning" />
          <Typography
            lineHeight={1}
            variant="body2"
            color="text.secondary"
            fontSize="large"
            ml={1}
          >
            {movie.rating}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ paddingX: 3, paddingBottom: 2, paddingTop: 0 }}>
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
      </CardActions>
    </Card>
  );
}
