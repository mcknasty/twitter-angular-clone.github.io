import { TestBed } from '@angular/core/testing';

import { TweetService } from './tweets.service';

describe('TweetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TweetService = TestBed.get(TweetService);
    expect(service).toBeTruthy();
  });
});
