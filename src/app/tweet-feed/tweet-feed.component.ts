import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { of } from 'rxjs';
import { Tweet } from '../tweet/tweet';
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
export class TweetFeedComponent implements OnInit, OnDestroy  {
  tweets: Tweet[] = [];
  isOpen = false;
  hide = true;
  user: User;
  newTweet: Tweet;
  navigationSubscription: any;

  constructor(
    public tweetService: TweetService,
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initNewTweet();
        this.getTweets();
        this.getUser();
      }
    });
  }

  ngOnInit(): void {
    this.initNewTweet();
    this.getUser();
    this.getTweets();
  }

  initNewTweet(): void {
    this.newTweet = {
      id: this.generateId(),
      created: Date.now(),
      updated: Date.now(),
      tweetText: null,
      userId: null
    };
  }

  generateId(len: number = 0): string {
    const dec2hex = (dec: number) => {
      return ('0' + dec.toString(16)).substr(-2);
    };
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }

  getTweets(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.filterTweets(id);
  }

  filterTweets(id: string) : void {
    this.tweetService.getTweets()
      .subscribe((tweets: Tweet[]) => {
        const followed: string[] = this.getUsersFollowed(id);
        followed.push(id);
        this.tweets = tweets
          .filter((tweet: Tweet) => followed.indexOf(tweet.userId) !== -1)
          .slice(0, 20)
          .sort((a, b) => {
            if (a.created < b.created) {
              return 1;
            }
            if (a.created > b.created) {
              return -1;
            }
            return 0;
          });
      });
  }

  getUsersFollowed(userId: string): string[] {
    return followers
      .filter(f => userId === f.userId)
      .map(f => f.targetId);
  }

  getUser(): void {
    const idKey = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(idKey)
      .subscribe(user => {
        this.user = user;
      });
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.hide = !this.hide;
  }

  add(tweetText: string, id?: string) {
    const userId: string = (id !== undefined) ? id : this.user.id;
    this.initNewTweet();
    this.newTweet = { ...this.newTweet, userId, tweetText };
    this.tweetService
      .addTweet(this.newTweet)
      .subscribe((tweet) => this.tweets.unshift(tweet));
  }

  ngOnDestroy(): void {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  /**
   * Todo: Implement later
   */
  // delete(tweet: Tweet): void {
  //   this.tweets = this.tweets.filter(t => t !== tweet);
  //   this.tweetService.deleteTweet(tweet).subscribe();
  // }

  // ngOnDestroy(): void {
  //   // avoid memory leaks here by cleaning up after ourselves. If we
  //   // don't then we will continue to run our initialiseInvites()
  //   // method on every navigationEnd event.
  //   if (this.navigationSubscription) {
  //     this.navigationSubscription.unsubscribe();
  //   }
  // }
}
