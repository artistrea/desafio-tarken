import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { LibraryMoviesModule } from './library_movies/library_movies.module';
import { Movie } from './movies/movies.entity';
import { LibraryMovie } from './library_movies/entities/library_movie.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'movies_library_user',
      password: 'movies_library_password',
      database: 'movies_library_db',
      entities: [User, Movie, LibraryMovie],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    MoviesModule,
    LibraryMoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
