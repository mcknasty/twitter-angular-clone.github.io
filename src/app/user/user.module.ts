import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { TweetFeedModule } from '../tweet-feed/tweet-feed.module';

@NgModule({
  declarations: [UserComponent],
  exports: [UserComponent],
  providers: [UserService, provideHttpClient(withFetch())],
  imports: [TweetFeedModule]
})
export class UserModule {}
