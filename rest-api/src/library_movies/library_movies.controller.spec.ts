import { Test, TestingModule } from '@nestjs/testing';
import { LibraryMoviesController } from './library_movies.controller';
import { LibraryMoviesService } from './library_movies.service';

describe('LibraryMoviesController', () => {
  let controller: LibraryMoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibraryMoviesController],
      providers: [LibraryMoviesService],
    }).compile();

    controller = module.get<LibraryMoviesController>(LibraryMoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
