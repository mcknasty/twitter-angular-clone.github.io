import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryService } from '../in-memory-data.service'
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { AppRoutingModule } from '../router/routing.module';
import { CommonModule } from '@angular/common';

const imports = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  /**  ** /
  HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
  ),
  /**  **/
  InMemoryService,
  MomentModule.forRoot({
    relativeTimeThresholdOptions: {
      m: 59
    }
  }),
  BrowserAnimationsModule,
  CommonModule
];

export { imports };
