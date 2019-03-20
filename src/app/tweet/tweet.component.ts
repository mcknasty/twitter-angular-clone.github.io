import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Tweet } from './tweet';
import { TweetBasic } from './tweetBasic';
import { TweetService } from './tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet;
  @Input() now: number = Date.now();

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
    //this.getTweets();
  }

  // getTweets(): void {
  //   this.tweetService.getTweets()
  //     .subscribe(tweets => this.tweets = tweets);
  // }
  //
  // //Todo: comeback to
  // add(name: string): void {
  //   // name = name.trim();
  //   // if (!name) { return; }
  //   // this.heroService.addHero({ name } as Hero)
  //   //   .subscribe(hero => {
  //   //     this.heroes.push(hero);
  //   //   });
  // }
  //
  // delete(tweet: Tweet): void {
  //   this.tweets = this.tweets.filter(t => t !== tweet);
  //   this.tweetService.deleteTweet(tweet).subscribe();
  // }

}
