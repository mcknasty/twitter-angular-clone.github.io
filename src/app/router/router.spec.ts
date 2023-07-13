// For more examples:
//   https://github.com/angular/angular/blob/master/modules/@angular/router/test/integration.spec.ts

import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { DebugElement, Type } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppRoutes } from './routes';
import { AppComponent } from '../app/app.component';
import { AppModule } from '../app/app.module';
import { declarations } from '../app/declarations';
import { imports } from '../app/imports';
import { TweetService } from '../tweet/tweet.service';
import { TweetFeedComponent } from '../tweet-feed/tweet-feed.component';
import { UserComponent } from '../user/user.component';
import { UserService } from '../user/user.service';

let fixture: ComponentFixture<AppComponent>;
let location: SpyLocation;

let TweetFeed: ComponentFixture<TweetFeedComponent>;

describe('Router Testing Module:', () => {
  const user1Id = '71ab267fc37caa55b9d8de7280daee18';
  const user2Id = '20a35644b18ae7998da37847e387d11d';
  const userNameText = 'Nissa Dagless';
  const userHandleText = '@BrindledGnu';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...imports,
        AppModule,
        RouterTestingModule.withRoutes(AppRoutes)
      ],
      declarations: [...declarations],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: UserService },
        { provide: TweetService }
      ]
    }).compileComponents();
  }));

  it("The App should redirect to an arbitrary user's page on loading", waitForAsync(() => {
    initializeFeedTestCase(() => {
      expectPathToBe(`/user/${user1Id}`, 'after initialNavigation()');
      expectElementOf(UserComponent);
    });
  }));

  it("The App should be able to navigate to another user's profile from their username link", waitForAsync(() => {
    initializeFeedTestCase(() => {
      const debug = fixture.debugElement;
      const tweetUsers = debug.query(By.css('.profile-link'));
      const link = tweetUsers.nativeElement;
      link.click();
      advance();
      fixture.whenStable().then(() => {
        expectPathToBe(`/user/${user2Id}`);
        expectElementOf(UserComponent);
        //Check that username and handle has changed too!
        const userNameNode: DebugElement = debug.query(By.css('.name'));
        const userHandleNode: DebugElement = debug.query(By.css('.handle'));
        const userName = userNameNode.nativeNode.innerHTML.trim();
        const userHandle = userHandleNode.nativeNode.innerHTML.trim();
        expect(userName).toEqual(userNameText);
        expect(userHandle).toEqual(userHandleText);
      });
    });
  }));

  //Todo need to come back to this one.  Not picking up id in URL.  Not sure why.
  it('The App should be to add a new tweet utilizing the user id in the url', waitForAsync(() => {
    initializeFeedTestCase(() => {
      //Open the Drawer
      const debug = TweetFeed.debugElement;
      const linkDes = debug.query(By.css('.feed-header .button'));
      linkDes.triggerEventHandler('click', null);
      TweetFeed.detectChanges();

      TweetFeed.whenStable().then(() => {
        const newTweetText = 'New Tweet! 123';
        const drawerClosed = debug.query(By.css('.display-none'));
        expect(drawerClosed).toBeNull();

        //Add some text to the compose tweet text area
        const textBox = debug.query(By.css('#new-tweet'));
        textBox.nativeElement.value = newTweetText;
        textBox.nativeElement.innerHTML = newTweetText;
        textBox.nativeElement.dispatchEvent(new Event('input'));
        TweetFeed.detectChanges();

        //Click the submit button
        const submit = debug.query(By.css('#submit-tweet'));
        submit.nativeElement.dispatchEvent(new Event('click'));
        TweetFeed.detectChanges();
        TweetFeed.whenStable().then(() => {
          const tweetFeed = debug.queryAll(By.css('.tweet-text'));
          const insertedTweetText = tweetFeed[0].nativeNode.innerHTML.trim();
          // Debug Code
          // console.log(tweetFeed.length, insertedTweetText, newTweetText, tweetFeed[0]);
          expect(tweetFeed.length).toBeGreaterThan(0);
          expect(insertedTweetText).toContain(newTweetText);
        });
      });
    });
  }));
  // End describe
});

////// Helpers /////////

// eslint-disable-next-line @typescript-eslint/ban-types
const initializeTestCase = (callback: Function) => {
  fixture = TestBed.createComponent(AppComponent);
  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  const router = injector.get(Router);
  injector.get(UserService);
  injector.get(TweetService);
  router.initialNavigation();
  advance();

  fixture.whenStable().then(() => {
    callback();
  });
};

// eslint-disable-next-line @typescript-eslint/ban-types
const initializeFeedTestCase = (callback: Function) => {
  initializeTestCase(() => {
    TestBed.inject(UserService);
    TestBed.inject(TweetService);
    TweetFeed = TestBed.createComponent(TweetFeedComponent);
    TweetFeed.detectChanges();
    TweetFeed.whenStable().then(() => {
      callback();
    });
  });
};

/**
 * Advance to the routed page
 * Wait a tick, then detect changes, and tick again
 */
function advance(): void {
  fixture.detectChanges(); // update view
}

function expectPathToBe(path: string, expectationFailOutput?: string) {
  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  expect(location.path())
    .withContext(expectationFailOutput || 'location.path()')
    .toEqual(path);
}

function expectElementOf(type: Type<unknown>): unknown {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).withContext(`expected an element for ${type.name}`).toBeTruthy();
  return el;
}
