import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { LibraryMoviesService } from './library_movies.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/types/AuthenticatedRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/files/multer-config';

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

  // @Get(':movie_id/recording')
  // findOne(
  //   @Req() req: AuthenticatedRequest,
  //   @Param('movie_id') movie_id: string,
  // ) {
  //   return this.libraryMoviesService.findOne(req.current_user.id, movie_id);
  // }
  //

  @UseInterceptors(FileInterceptor('file', multerConfig))
  @Post(':movie_id/recording')
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 128 * 1024 * 60 * 10 }), // ~ 10 mins of 128Kbps .mp3
          new FileTypeValidator({ fileType: 'audio/mpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
