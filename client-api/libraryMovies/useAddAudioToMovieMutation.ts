import { useMutation } from "@tanstack/react-query";
import { api, queryClient } from "../instance";

export function useAddAudioToMovieMutation() {
  return useMutation({
    mutationFn: ({ movieId, file }: { movieId: string; file: File }) => {
      const data = new FormData();
      data.append("file", file);

      return api
        .post<{ movieId: string }>(
          `/library-movies/${movieId}/recording`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((r) => {
          queryClient.invalidateQueries({ queryKey: ["library-movies"] });
          return r;
        });
    },
  });
}
