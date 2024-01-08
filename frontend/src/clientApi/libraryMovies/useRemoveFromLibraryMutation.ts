import { useMutation } from "@tanstack/react-query";
import { api, queryClient } from "../instance";

export function useRemoveFromLibraryMutation() {
  return useMutation({
    mutationFn: async (movieId: string) => {
      return api.delete(`/library-movies/${movieId}`).then((r) => {
        queryClient.invalidateQueries({ queryKey: ["library-movies"] });
        return r;
      });
    },
  });
}
