import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InMemoryService } from '../in-memory-data.service';
import { AppRoutingModule } from '../router/routing.module';
import { UserModule } from '../user/user.module';

const imports = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  InMemoryService,
  BrowserAnimationsModule,
  CommonModule,
  UserModule
];

export { imports };
