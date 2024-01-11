export type Movie = {
  id: string;
  title: string;
  poster: string;
  rating: string;
  hasAlreadyBeenAdded?: boolean;
  audio?: {
    url: string;
  };
};
