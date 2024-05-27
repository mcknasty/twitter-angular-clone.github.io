import { TestBed, waitForAsync } from '@angular/core/testing';

import { TweetService } from './tweet.service';
import { declarations } from '../app/declarations';
import { imports } from '../app/imports';
import { TweetRecord } from '../model/Tweet';

describe('Service: TweetService', () => {
  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations,
      imports
    }).compileComponents();
  }));

  it('getTweets should return an array of populated Tweet Record objects', waitForAsync(async () => {
    const service = TestBed.inject(TweetService);
    expect(service).toBeDefined();

    service.getTweets().subscribe((tweets) => {
      const Tweets = tweets as TweetRecord[];

      const isCorrectType: boolean = Tweets.every((tweet) =>
        TweetRecord.instanceOf(tweet)
      );
      expect(isCorrectType).toBeTrue();

      const isPopulated: boolean = Tweets.map((v) => v.tweetText).every(
        (tweetText) => typeof tweetText == 'string'
      );
      expect(isPopulated).toBeTrue();

      // console.info(Tweets.length)
      expect(Tweets).toHaveSize(100);
    });
  }));

  it('addTweet should be able to add a tweet', waitForAsync(async () => {
    const service = TestBed.inject(TweetService);
    expect(service).toBeDefined();

    const newTweetText = 'test test test';
    const tweet = new TweetRecord({
      userId: TweetRecord.generateId(),
      tweetText: newTweetText
    });

    service.addTweet(tweet).subscribe((tweet) => {
      const Tweet = tweet as TweetRecord;
      expect(Tweet).toBeDefined();
      expect(Tweet.tweetText).toEqual(newTweetText);
    });
  }));

  it('should throw an error due to a bad parameter', waitForAsync(async () => {
    const service = TestBed.inject(TweetService);
    expect(service).toBeDefined();

    const message1 =
      'Something Went Wrong Test Harness: Just a test ;-) It will be ok. This was suppose to happen';
    const message2 =
      'Something Went Wrong Test Harness: Just a test ;-) It will be ok.  This was suppose to happen again';

    service.throwError(message1).subscribe((message) => {
      expect(typeof message === 'string').toBeTrue();
      expect(message).toMatch('This was suppose to happen');
    });

    service.throwError(message2).subscribe((message) => {
      expect(typeof message === 'string').toBeTrue();
      expect(message).toMatch('This was suppose to happen again');
    });
  }));

  it('should throw an error due to mock api 404 failure', waitForAsync(async () => {
    const modImports = imports.filter((value) => {
      return !Array.isArray(value) &&
        value instanceof Object &&
        Object.keys(value).includes('ngModule')
        ? false
        : true;
    });

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ declarations, imports: modImports });
    const service = TestBed.inject(TweetService);

    service.getTweets().subscribe((message) => {
      expect(typeof message === 'string').toBeTrue();
      expect(Array.isArray(message)).toBeFalse();
    });

    const newTweetText = 'test test test';
    const tweet = new TweetRecord({
      userId: TweetRecord.generateId(),
      tweetText: newTweetText
    });
    service.addTweet(tweet).subscribe((message) => {
      expect(typeof message === 'string').toBeTrue();
      expect(message instanceof TweetRecord).toBeFalse();
    });
  }));
});
