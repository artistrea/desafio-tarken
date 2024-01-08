import { useMutation } from "@tanstack/react-query";
import { api } from "../instance";

export function useAddToLibraryMutation() {
  return useMutation({
    mutationFn: (movieId: string) => {
      return api.post<{ movieId: string }>(`/library-movies/${movieId}`);
    },
  });
}
