import { Module } from '@nestjs/common';
import { Movie } from './movies.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService],
  exports: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
