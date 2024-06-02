import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import followers from '../../assets/data/mock-followers.json';
import { TweetRecord, TweetSchema } from '../model/Tweet';
import { UserRecord } from '../model/User';
import { TweetService } from '../tweet/tweet.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-tweet-feed',
  templateUrl: './tweet-feed.component.html',
  styleUrls: ['./tweet-feed.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state(
        'open',
        style({
          opacity: 1
        })
      ),
      state(
        'closed',
        style({
          opacity: 0
        })
      ),
      transition('open => closed', [animate('2s')]),
      transition('closed => open', [animate('1s')])
    ])
  ]
})
export class TweetFeedComponent implements OnInit {
  tweets: TweetRecord[] = [];
  isOpen = false;
  hide = true;
  user!: UserRecord;
  newTweet!: TweetRecord;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigationSubscription!: any;

  constructor(
    public tweetService: TweetService,
    public userService: UserService,
    public route: ActivatedRoute,
    public router: Router,
    public locationService: Location
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: unknown) => {
      // If it is a NavigationEnd event re-initialize the component
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

  initNewTweet(data?: Partial<TweetSchema>): void {
    this.newTweet = data ? new TweetRecord(data) : new TweetRecord();
  }

  getTweets(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) this.filterTweets(id);
  }

  filterTweets(id: string): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.tweetService.getTweets().subscribe((tweets: any) => {
      // Todo: Need to move this next line into the tweet service.
      // Could be a number of parameters
      const Tweets = tweets as TweetRecord[];
      const followed: string[] = this.getUsersFollowed(id);
      followed.push(id);
      this.tweets = Tweets.filter(
        (tweet: TweetRecord) => followed.indexOf(tweet.userId) !== -1
      )
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
    return followers.filter((f) => userId === f.userId).map((f) => f.targetId);
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe((user) => {
        //Todo: need to move this next line down to the service
        const User = user as UserRecord;
        if (UserRecord.instanceOf(User)) {
          this.user = User;
        } else if (typeof user === 'string') {
          throw User;
        }
      });
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.hide = !this.hide;
  }

  add(tweetText: string, id?: string) {
    const userId: string =
      typeof id === 'undefined' ? this.user.id : (id as string);
    this.initNewTweet({ userId, tweetText });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.tweetService.addTweet(this.newTweet).subscribe((tweet: any) => {
      // Todo: This isn't great.  Should move this next line into the service
      const Tweet = tweet as TweetRecord;
      this.tweets.unshift(Tweet);
    });
  }

  ngOnDestroy(): void {
    // avoid memory leaks here by cleaning up after ourselves. If we
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
}
