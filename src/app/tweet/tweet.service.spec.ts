import { TestBed } from '@angular/core/testing';
import { declarations } from '../declarations';
import { imports } from '../imports';
import { TweetService } from './tweet.service';

describe('Service: TweetService', () => {
  beforeEach(() => TestBed.configureTestingModule({declarations, imports}));

  it('should be created', () => {
    const service: TweetService = TestBed.inject(TweetService);
    expect(service).toBeDefined();
  });
});
