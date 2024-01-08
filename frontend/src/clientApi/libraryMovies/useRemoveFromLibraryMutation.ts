import { useMutation } from "@tanstack/react-query";
import { api } from "../instance";

export function useRemoveFromLibraryMutation() {
  return useMutation({
    mutationFn: (movieId: string) => {
      return api.delete(`/library-movies/${movieId}`);
    },
  });
}
