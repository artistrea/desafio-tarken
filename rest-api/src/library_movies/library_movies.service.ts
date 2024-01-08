import { Injectable } from '@nestjs/common';
import { CreateLibraryMovieDto } from './dto/create-library_movie.dto';
import { LibraryMovie } from './entities/library_movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LibraryMoviesService {
  constructor(
    @InjectRepository(LibraryMovie)
    private readonly libraryMoviesRepository: Repository<LibraryMovie>,
  ) {}

  create(createLibraryMovieDto: CreateLibraryMovieDto): Promise<LibraryMovie> {
    const libraryMovie = this.libraryMoviesRepository.create(
      createLibraryMovieDto,
    );

    return this.libraryMoviesRepository.save(libraryMovie);
  }

  findUserLibrary(userId: number) {
    return this.libraryMoviesRepository.find({
      where: {
        userId,
      },
      relations: {
        movie: true,
      },
    });
  }

  remove(userId: number, movieId: string) {
    return this.libraryMoviesRepository.delete({
      userId,
      movieId,
    });
  }

  findOne(userId: number, movieId: string) {
    return this.libraryMoviesRepository.find({
      where: {
        userId,
        movieId,
      },
    });
  }
}
