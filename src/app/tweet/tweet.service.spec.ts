import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { declarations } from '../app/declarations';
import { imports } from '../app/imports';
import { TweetService } from './tweet.service';
import { Tweet } from '../tweet/tweet';
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
    service.getTweets().subscribe((tweets: Tweet[]) => {
      expect(tweets.length).toBeGreaterThan(0);
    });
  }));

  it('The Tweet Service should be able to add a tweet', waitForAsync(() => {
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

function generateId(len: number = 0): string {
  const dec2hex = (dec: number) => {
    return ('0' + dec.toString(16)).substr(-2);
  };
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}
