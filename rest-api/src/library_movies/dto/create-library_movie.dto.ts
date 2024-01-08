import { IsNumber, IsString } from 'class-validator';

export class CreateLibraryMovieDto {
  @IsString()
  movieId: string;

  @IsNumber()
  userId: number;
}
