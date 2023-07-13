import { NgClass, NgForOf } from '@angular/common';
import { NgModule } from '@angular/core';

import { TweetFeedComponent } from './tweet-feed.component';
import { TweetModule } from '../tweet/tweet.module';

@NgModule({
  declarations: [TweetFeedComponent],
  exports: [TweetFeedComponent],
  imports: [TweetModule, NgClass, NgForOf]
})
export class TweetFeedModule {}
