import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async createMovie(movie: {
    id: string;
    title: string;
    poster: string;
    rating: string;
  }): Promise<Movie | null> {
    const newMovie = this.moviesRepository.create(movie);

    return this.moviesRepository.save(newMovie);
  }

  async findOne(id: string): Promise<Movie | null> {
    return this.moviesRepository.findOneBy({ id });
  }
}
