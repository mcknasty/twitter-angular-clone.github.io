import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { AppRoutingModule } from './app-routing.module';

const imports = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
  ),
  MomentModule.forRoot({
    relativeTimeThresholdOptions: {
      m: 59
    }
  }),
  BrowserAnimationsModule
];

export { imports };
