import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

import { Tweet } from '../tweet/tweet';
import { TweetBasic } from '../tweet/tweetBasic';
import { TweetService } from '../tweet/tweet.service';

import { UserService } from '../user/user.service';
import { User } from '../user/user';

import followers from '../../assets/mock-followers.json';

@Component({
  selector: 'app-tweet-feed',
  templateUrl: './tweet-feed.component.html',
  styleUrls: ['./tweet-feed.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0,
      })),
      transition('open => closed', [
        animate('2s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ]),
  ]
})
export class TweetFeedComponent implements OnInit {
  tweets: Tweet[];
  isOpen = false;
  hide = true;
  user: User;
  newTweet: Tweet;

  constructor(private tweetService: TweetService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initNewTweet();
    this.getTweets();
    this.getUser();
  }

  initNewTweet() {
    this.newTweet = {
      id: this.generateId(),
      created: Date.now(),
      updated: Date.now(),
      tweetText: null,
      userId: null
    };
  }

  generateId (len: number = 0) {
    const dec2hex = (dec) => {
      return ('0' + dec.toString(16)).substr(-2)
    }
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }

  getTweets(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.tweetService.getTweets()
      .subscribe((tweets: Tweet[]) => {
        const followed: string[] = this.getUsersFollowed(id);
        followed.push(id);
        console.log(tweets.length);
        this.tweets = tweets
          .filter((tweet: Tweet) => followed.indexOf(tweet.userId) !== -1);
          //Todo: fix sorting
          // .sort((a, b) => {
          //   console.log('got here', a.updated, b.updated);
          //   if(a.updated < b.updated) {
          //     console.log('less than!');
          //     return -1;
          //   }
          //   if(a.updated > b.updated) {
          //     console.log('greater than!');
          //     return 1;
          //   }
          //   return 0;
          // })
      });
  }

  getUsersFollowed(userId): string[] {
    return followers
      .filter(f => userId === f.userId)
      .map(f => f.targetId);
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
      });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.hide = !this.hide;
  }

  //Todo: comeback to
  add(tweetText: string): void {
    this.newTweet = { ...this.newTweet, userId: this.user.id, tweetText };
    this.tweetService.addTweet(this.newTweet).subscribe((tweet) => this.tweets.unshift(tweet));
  }

  /**
  // Todo: Implement later
  delete(tweet: Tweet): void {
    this.tweets = this.tweets.filter(t => t !== tweet);
    this.tweetService.deleteTweet(tweet).subscribe();
  }
  **/
}
