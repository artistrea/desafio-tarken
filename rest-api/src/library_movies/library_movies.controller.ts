import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LibraryMoviesService } from './library_movies.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/types/AuthenticatedRequest';

@Controller('library-movies')
@UseGuards(AuthGuard)
export class LibraryMoviesController {
  constructor(private readonly libraryMoviesService: LibraryMoviesService) {}

  @Post(':movie_id')
  async create(
    @Req() req: AuthenticatedRequest,
    @Param('movie_id') movie_id: string,
  ) {
    return this.libraryMoviesService.create({
      movieId: movie_id,
      userId: req.current_user.id,
    });
  }

  @Get()
  async findUserLibrary(@Req() req: AuthenticatedRequest) {
    return this.libraryMoviesService
      .findUserLibrary(req.current_user.id)
      .then((library) => library.map((libraryMovie) => libraryMovie.movie));
  }

  @Delete(':movie_id')
  remove(
    @Req() req: AuthenticatedRequest,
    @Param('movie_id') movie_id: string,
  ) {
    return this.libraryMoviesService.remove(req.current_user.id, movie_id);
  }

  // @Get('recording/:movie_id')
  // findOne(
  //   @Req() req: AuthenticatedRequest,
  //   @Param('movie_id') movie_id: string,
  // ) {
  //   return this.libraryMoviesService.findOne(req.current_user.id, movie_id);
  // }
  //
  // @Post('recording/:movie_id')
  // async create(
  //   @Req() req: AuthenticatedRequest,
  //   @Param('movie_id') movie_id: string,
  // ) {
  //   return this.libraryMoviesService.create({
  //     movieId: movie_id,
  //     userId: req.current_user.id,
  //   });
  // }
}
