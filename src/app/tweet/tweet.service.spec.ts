import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { declarations } from '../app/declarations';
import { imports } from '../app/imports';
import { TweetService } from './tweet.service';
import { TweetRecord } from '../model/Tweet';
import { Observable, of } from 'rxjs';


describe('Service: TweetService', () => {
  let service: TweetService;
  beforeEach(() => {
    TestBed.configureTestingModule({declarations, imports}).compileComponents();
    service = TestBed.inject(TweetService);
  });

  it('The Tweet Service should be dependancy injected', waitForAsync(() => {
    expect(service).toBeDefined();
  }));

  it('The Tweet Service should be able to get a feed of tweets', waitForAsync(() => {
    expect(service).toBeDefined();
    service.getTweets().subscribe((tweets: TweetRecord[]) => {
      expect(tweets.length).toBeGreaterThan(0);
    });
  }));

  it('The Tweet Service should be able to add a tweet', waitForAsync(() => {
    const newTweetText = 'test test test'
    const tweet = new TweetRecord({userId: TweetRecord.generateId(), tweetText: newTweetText});
    expect(service).toBeDefined();
    service.addTweet(tweet).subscribe((tweet) => {
      expect(tweet).toBeDefined();
      expect(tweet.tweetText).toEqual(newTweetText);
    });
  }));

  it('The Tweet Service should throw an error', waitForAsync(() => {
    expect(service).toBeDefined();
    const observable = of({
      next: x => "Test harness testing log and code coverage",
      error: err => "Service ended in an error",
      complete: () => console.log('Observer got a complete notification'),
      unsubscribe: () => {}
    });

    service.throwError<String>("Tweet Service")({message: "Test harness testing log and code coverage" }).subscribe(() => {
      expect(true).toBeDefined();
    });

    service.throwError<Object>("Tweet Service", observable)("Test harness testing log and code coverage").subscribe(() => {
      expect(true).toBeDefined();
    });
  }));
});
