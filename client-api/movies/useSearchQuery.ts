import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../instance";
import { Movie } from "./Movie";

export function useSearchQuery(searchFor: string) {
  return useInfiniteQuery({
    queryKey: ["/movies/search", searchFor],
    queryFn: async ({ pageParam, queryKey }) => {
      return api
        .post<{ movies: Movie[]; page: number }>("/movies/search", {
          query: queryKey[1],
          page: pageParam,
        })
        .then((res) => res.data);
    },
    getNextPageParam: (lastPage) => lastPage.page + 1,
    initialPageParam: 1,
  });
}
