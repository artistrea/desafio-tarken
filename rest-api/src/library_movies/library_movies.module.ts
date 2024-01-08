import { Module } from '@nestjs/common';
import { LibraryMoviesService } from './library_movies.service';
import { LibraryMoviesController } from './library_movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryMovie } from './entities/library_movie.entity';

@Module({
  controllers: [LibraryMoviesController],
  providers: [LibraryMoviesService],
  imports: [TypeOrmModule.forFeature([LibraryMovie])],
})
export class LibraryMoviesModule {}
