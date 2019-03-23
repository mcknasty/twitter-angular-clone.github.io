import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from './tweet';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet = new Tweet();
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
