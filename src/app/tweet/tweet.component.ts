import { Component, Input, OnInit } from '@angular/core';
import { DATE_PIPES } from 'ngx-pipes';

import { TweetRecord } from '../model/Tweet';
import { UserRecord } from '../model/User';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
  providers: [DATE_PIPES]
})
export class TweetComponent implements OnInit {
  @Input() tweet: TweetRecord = new TweetRecord();
  protected user: UserRecord = new UserRecord();
  protected now: number = Date.now();
  created!: Date;

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.getUser();
    this.created = new Date(this.tweet.created);
  }

  async getUser(): Promise<void> {
    const { userId } = this.tweet;
    if (userId) {
      await this.userService.getUser(userId, (user: UserRecord) => {
        this.user = user;
      });
    }
  }
}
