import { Controller, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Movie } from './movies.entity';
import { MoviesService } from './movies.service';

type SearchParams = {
  query: string;
  page: number;
};

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @UseGuards(AuthGuard)
  @Get('search')
  async search(@Body() searchParams: SearchParams): Promise<Movie[]> {
    const search = new URLSearchParams({
      type: 'movie',
      apikey: process.env.API_KEY,
      s: searchParams.query,
      page: searchParams.page.toString(),
    });

    const response: SearchResult = await fetch(
      `http://www.omdbapi.com/?${search}`,
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));

    if (response.Response !== 'True') {
      return [] as Movie[];
    }

    const movies: Movie[] = await Promise.all(
      response.Search.map(async ({ imdbID }) => {
        {
          let movie = await this.moviesService.findOne(imdbID);

          const movieInDatabase = movie != null;

          if (movieInDatabase) return movie;

          movie = await fetch(
            `http://www.omdbapi.com/?${new URLSearchParams({
              apikey: process.env.API_KEY,
              i: imdbID,
            })}`,
          )
            .then((res) => res.json())
            .then((m: MovieResult) => ({
              id: m.imdbID,
              title: m.Title,
              rating: m.imdbRating,
              poster: m.Poster,
            }));

          this.moviesService.createMovie(movie);

          return movie;
        }
      }),
    );

    return movies;
  }
}

type SearchResult = {
  Search: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
  totalResults: string;
  Response: 'True' | 'False';
};

const movieExampleResult = {
  Title: 'The Rock',
  Year: '1996',
  Rated: 'R',
  Released: '07 Jun 1996',
  Runtime: '136 min',
  Genre: 'Action, Adventure, Thriller',
  Director: 'Michael Bay',
  Writer: 'David Weisberg, Douglas Cook, Mark Rosner',
  Actors: 'Sean Connery, Nicolas Cage, Ed Harris',
  Plot: 'A mild-mannered chemist and an ex-con must lead the counterstrike when a rogue group of military men, led by a renegade general, threaten a nerve gas attack from Alcatraz against San Francisco.',
  Language: 'English',
  Country: 'United States',
  Awards: 'Nominated for 1 Oscar. 9 wins & 9 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BZDJjOTE0N2EtMmRlZS00NzU0LWE0ZWQtM2Q3MWMxNjcwZjBhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '7.4/10' },
    { Source: 'Rotten Tomatoes', Value: '67%' },
    { Source: 'Metacritic', Value: '58/100' },
  ],
  Metascore: '58',
  imdbRating: '7.4',
  imdbVotes: '353,906',
  imdbID: 'tt0117500',
  Type: 'movie',
  DVD: '01 Jan 2016',
  BoxOffice: '$134,069,511',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};

type MovieResult = typeof movieExampleResult;
