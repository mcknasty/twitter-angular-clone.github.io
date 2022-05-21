import { Component, OnInit, Input } from '@angular/core';
import { TweetRecord } from '../model/Tweet';
import { User } from '../model/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() tweet: TweetRecord = new TweetRecord();
  user: User = new User();
  now: number = Date.now();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.tweet.userId)
      .subscribe(user => this.user = user);
  }
}
