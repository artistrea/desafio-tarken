import { useMutation } from "@tanstack/react-query";
import { api, queryClient } from "../instance";

export function useAddToLibraryMutation() {
  return useMutation({
    mutationFn: (movieId: string) => {
      return api
        .post<{ movieId: string }>(`/library-movies/${movieId}`)
        .then((r) => {
          queryClient.invalidateQueries({ queryKey: ["library-movies"] });
          return r;
        });
    },
  });
}
