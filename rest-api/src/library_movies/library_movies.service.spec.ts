import { Test, TestingModule } from '@nestjs/testing';
import { LibraryMoviesService } from './library_movies.service';

describe('LibraryMoviesService', () => {
  let service: LibraryMoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibraryMoviesService],
    }).compile();

    service = module.get<LibraryMoviesService>(LibraryMoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
