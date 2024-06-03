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
import { RouterTestingHarness } from '@angular/router/testing';

import { AppModule } from '../app/app.module';
import { declarations } from '../app/declarations';
import { imports } from '../app/imports';
import { TweetService } from '../tweet/tweet.service';
import { UserComponent } from '../user/user.component';
import { UserService } from '../user/user.service';

let fixture: ComponentFixture<UserComponent>;
let location: SpyLocation;

describe('Router Testing Module:', () => {
  const user1Id = '71ab267fc37caa55b9d8de7280daee18';
  const user2Id = '20a35644b18ae7998da37847e387d11d';
  const userNameText = 'Nissa Dagless';
  const userHandleText = '@BrindledGnu';

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [...imports, AppModule],
      declarations: [...declarations],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: UserService },
        { provide: TweetService },
        { provide: Location, useClass: SpyLocation }
      ]
    }).compileComponents();
  }));

  it("The App should redirect to an arbitrary user's page on loading", waitForAsync(async () => {
    await initializeTestCase(() => {
      expectPathToBe(`/user/${user1Id}`, 'after initialNavigation()');
      expectElementOf(UserComponent);
    });
  }));

  it("The App should be able to navigate to another user's profile from their username link", waitForAsync(async () => {
    await initializeTestCase(() => {
      const debug = fixture.debugElement;
      const tweetUsers = debug.query(By.css('.profile-link'));
      const link = tweetUsers.nativeElement;
      link.click();

      fixture.detectChanges();
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
  it('The App should be to add a new tweet utilizing the user id in the url', waitForAsync(async () => {
    await initializeTestCase(() => {
      //Open the Drawer
      let debug = fixture.debugElement;
      const linkDes = debug.query(By.css('.feed-header .button'));
      linkDes.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        debug = fixture.debugElement;
        const newTweetText = 'New Tweet! 123';
        const drawerClosed = debug.query(By.css('.display-none'));
        expect(drawerClosed).toBeNull();

        //Add some text to the compose tweet text area
        const textBox = debug.nativeElement.querySelector('#new-tweet');
        textBox.innerHTML = newTweetText;
        textBox.dispatchEvent(new Event('onchange'));

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          //Click the submit button
          const submit = debug.nativeElement.querySelector('#submit-tweet');
          submit.dispatchEvent(new Event('click'));
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            // Wait for the animation
            fixture.detectChanges();
            fixture.whenStable().then(() => {
              debug = fixture.debugElement;
              const tweetFeed = debug.queryAll(By.css('.tweet-text'));
              const tweetText = tweetFeed.map((v) =>
                v.nativeNode.innerHTML.trim()
              );
              expect(tweetFeed.length).toBeGreaterThan(0);
              expect(tweetText[0]).toContain(newTweetText);
            });
          });
        });
      });
    });
  }));
  // End describe
});

////// Helpers /////////

// eslint-disable-next-line @typescript-eslint/ban-types
const initializeTestCase = async (callback: Function) => {
  const UserId = '71ab267fc37caa55b9d8de7280daee18';
  const router = await RouterTestingHarness.create();
  await router.navigateByUrl(`user/${UserId}`, UserComponent);
  const Fixture = router.fixture;
  if (Fixture instanceof ComponentFixture) {
    fixture = Fixture as ComponentFixture<UserComponent>;
    fixture.detectChanges();
    fixture.whenStable().then(async () => {
      await callback();
    });
  }
};

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
