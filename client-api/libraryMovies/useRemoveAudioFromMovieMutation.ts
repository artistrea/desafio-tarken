import { useMutation } from "@tanstack/react-query";
import { api, queryClient } from "../instance";

export function useRemoveAudioFromMovieMutation() {
  return useMutation({
    mutationFn: (movieId: string) => {
      return api
        .delete<{ movieId: string }>(`/library-movies/${movieId}/recording`)
        .then((r) => {
          queryClient.invalidateQueries({ queryKey: ["library-movies"] });
          return r;
        });
    },
  });
}
