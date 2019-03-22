import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Tweet } from './tweet';
import { TweetBasic } from './tweetBasic';
import { TweetService } from './tweet.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet;
  user: User;
  now: number = Date.now();

  constructor(private tweetService: TweetService, private userService: UserService) {}

  /** Todo: Need to get time string correct! */
  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.tweet.userId)
      .subscribe(user => this.user = user);
  }

  /** Todo: Complete
  formatAgo(time) {

  }
  **/
}
