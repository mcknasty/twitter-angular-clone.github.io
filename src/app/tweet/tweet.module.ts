import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

import { TweetComponent } from './tweet.component';
import { TweetService } from './tweet.service';

@NgModule({
  declarations: [TweetComponent],
  exports: [TweetComponent],
  imports: [RouterModule, NgPipesModule],
  providers: [TweetService, provideHttpClient(withFetch())]
})
export class TweetModule {}
