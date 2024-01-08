import { LibraryMovie } from 'src/library_movies/entities/library_movie.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  poster: string;

  @Column()
  rating: string;

  @OneToMany(() => LibraryMovie, (libraryMovie) => libraryMovie.movie, {
    onDelete: 'CASCADE',
  })
  libraryMovies: LibraryMovie[];
}
