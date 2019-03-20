import { Component, OnInit } from '@angular/core';
import { Tweet } from '../tweet/tweet';
import { TweetBasic } from '../tweet/tweetBasic';
import { TweetService } from '../tweet/tweet.service';

@Component({
  selector: 'app-tweet-feed',
  templateUrl: './tweet-feed.component.html',
  styleUrls: ['./tweet-feed.component.scss']
})
export class TweetFeedComponent implements OnInit {
  tweets: Tweet[];

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
    this.getTweets();
  }

  getTweets(): void {
    this.tweetService.getTweets()
      .subscribe(tweets => this.tweets = tweets);
  }

  //Todo: comeback to
  add(name: string): void {
    // name = name.trim();
    // if (!name) { return; }
    // this.heroService.addHero({ name } as Hero)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);
    //   });
  }

  delete(tweet: Tweet): void {
    this.tweets = this.tweets.filter(t => t !== tweet);
    this.tweetService.deleteTweet(tweet).subscribe();
  }
}
