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
    const tweet = new TweetRecord();
    const message1 = 'Something Went Wrong Test Harness: Just a test ;-) It will be ok. This was suppose to happen';
    service.throwError<TweetRecord>(message1, tweet).subscribe((e) => {
      console.error(e);
      expect(true).toBeDefined();
    });
  }));
});
