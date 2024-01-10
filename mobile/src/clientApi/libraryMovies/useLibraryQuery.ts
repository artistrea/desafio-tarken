import { useQuery } from "@tanstack/react-query";
import { api } from "../instance";
import { Movie } from "../movies/Movie";

export function useLibraryQuery() {
  return useQuery({
    queryKey: ["library-movies"],
    queryFn: async () => {
      return api
        .get<Movie[]>("/library-movies")
        .then((res) =>
          res.data.map((m) => ({ ...m, hasAlreadyBeenAdded: true }))
        );
    },
  });
}
