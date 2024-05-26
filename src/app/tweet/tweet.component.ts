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
  user: UserRecord = new UserRecord();
  now: number = Date.now();
  created!: Date;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUser();
    this.created = new Date(this.tweet.created);
  }

  getUser(): void {
    this.userService.getUser(this.tweet.userId).subscribe((user) => {
      if (user instanceof UserRecord) {
        this.user = user;
      } else if (typeof user === 'string') {
        throw user;
      }
    });
  }
}
