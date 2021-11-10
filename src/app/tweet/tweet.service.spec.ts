import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { declarations } from '../declarations';
import { imports } from '../imports';
import { TweetService } from './tweet.service';
import { Tweet } from '../tweet/tweet';

describe('Service: TweetService', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({declarations, imports});
  }));

  it('The Tweet Service should be dependancy injected', inject([TweetService], (service: TweetService) => {
    expect(service).toBeDefined();
  }));

  it('The Tweet Service should be able to get a feed of tweets', inject([TweetService], async (service: TweetService) => {
    expect(service).toBeDefined();
    service.getTweets().subscribe((tweets: Tweet[]) => {
      expect(tweets.length).toBeGreaterThan(0);
    });
  }));

  it('The Tweet Service should be able to add a tweet', inject([TweetService], async (service: TweetService) => {
    const tweet = {
      id: generateId(),
      created: Date.now(),
      updated: Date.now(),
      tweetText: 'test test test',
      userId: generateId()
    };
    expect(service).toBeDefined();
    service.addTweet(tweet).subscribe((tweet) => {
      expect(tweet).toBeDefined();
      expect(tweet.tweetText).toEqual('test test test');
    });
  }));
  it('The Tweet Service should throw an error', inject([TweetService], async (service: TweetService) => {
    expect(service).toBeDefined();
    await service.getTweet('adfdsa').subscribe((tweet: any) => {
      expect(tweet).toBeUndefined();
    });
  }));
});

function generateId(len: number = 0): string {
  const dec2hex = (dec: number) => {
    return ('0' + dec.toString(16)).substr(-2);
  };
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}
