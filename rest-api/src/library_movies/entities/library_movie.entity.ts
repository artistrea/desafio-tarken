import { Movie } from 'src/movies/movies.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class LibraryMovie {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  movieId: string;

  @ManyToOne(() => User, (user) => user.libraryMovies)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.libraryMovies)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column({ nullable: true })
  audio_url: string;
}
