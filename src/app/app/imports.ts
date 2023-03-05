import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPipesModule } from 'ngx-pipes';

import { InMemoryService } from '../in-memory-data.service';
import { AppRoutingModule } from '../router/routing.module';

const imports = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  InMemoryService,
  NgPipesModule,
  BrowserAnimationsModule,
  CommonModule
];

export { imports };
