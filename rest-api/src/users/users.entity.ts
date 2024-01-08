import { LibraryMovie } from 'src/library_movies/entities/library_movie.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 320 })
  email: string;

  @Column()
  hashed_password: string;

  @OneToMany(() => LibraryMovie, (libraryMovie) => libraryMovie.user)
  libraryMovies: LibraryMovie[];
}
