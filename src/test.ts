// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// import 'zone.js/dist/zone-testing';
import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core'

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

@NgModule({
  providers: [provideExperimentalZonelessChangeDetection()]
})

class ZonelessTestModule {}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, ZonelessTestModule],
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: false }
  }
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
