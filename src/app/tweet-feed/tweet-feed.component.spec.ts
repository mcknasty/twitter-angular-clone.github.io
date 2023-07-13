import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
  waitForAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { TweetFeedComponent } from './tweet-feed.component';
import { imports } from '../app/imports';
import { TweetComponent } from '../tweet/tweet.component';
import { TweetService } from '../tweet/tweet.service';
import { UserComponent } from '../user/user.component';
import { UserService } from '../user/user.service';

describe('Component: TweetFeedComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...imports,
        RouterTestingModule.withRoutes([
          {
            path: 'user/:id',
            component: UserComponent,
            runGuardsAndResolvers: 'always'
          },
          {
            path: '',
            redirectTo: '/user/71ab267fc37caa55b9d8de7280daee18',
            pathMatch: 'full'
          }
        ])
      ],
      declarations: [MockTweetFeedComponent, TweetComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: UserService },
        { provide: TweetService }
      ]
    }).compileComponents();
  }));

  it('The Tweet Feed Component should be initialized.', (done) => {
    TestBed.inject(UserService);
    TestBed.inject(TweetService);
    const fixture: ComponentFixture<TweetFeedComponent> =
      TestBed.createComponent(MockTweetFeedComponent);
    const native: HTMLElement = fixture.nativeElement;
    fixture.debugElement;
    expect(native).toBeInstanceOf(HTMLElement);
    done();
  });

  it("The Tweet Feed Component's textarea should toggle open and close.", (done) => {
    TestBed.inject(UserService);
    TestBed.inject(TweetService);
    const fixture: ComponentFixture<TweetFeedComponent> =
      TestBed.createComponent(MockTweetFeedComponent);
    const native: HTMLElement = fixture.nativeElement;
    const debug = fixture.debugElement;
    //Start with the new Tweet Drawer Closed
    expect(native).toBeInstanceOf(HTMLElement);
    let drawerClosed = debug.query(By.css('.display-none'));
    expect(drawerClosed).toBeInstanceOf(DebugElement);

    //Open the Drawer
    const linkDes = debug.query(By.css('.feed-header .button'));
    linkDes.triggerEventHandler('click', null);
    fixture.detectChanges();
    drawerClosed = debug.query(By.css('.display-none'));
    expect(drawerClosed).toBeNull();

    //Close the Drawer
    linkDes.triggerEventHandler('click', null);
    fixture.detectChanges();
    drawerClosed = debug.query(By.css('.display-none'));
    expect(drawerClosed).toBeInstanceOf(DebugElement);
    done();
  });

  //it("The Tweet Feed Component should be able to add a new tweet.", waitForAsync(() => {
  it('The Tweet Feed Component should be able to add a new tweet.', (done) => {
    TestBed.inject(UserService);
    TestBed.inject(TweetService);
    const fixture: ComponentFixture<TweetFeedComponent> =
      TestBed.createComponent(MockTweetFeedComponent);
    const debug = fixture.debugElement;
    //Open the Drawer
    const linkDes = debug.query(By.css('.feed-header .button'));
    linkDes.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const newTweetText = 'New Tweet! 123';
      const drawerClosed = debug.query(By.css('.display-none'));
      expect(drawerClosed).toBeNull();

      //Add some text to the compose tweet text area
      const textBox = debug.query(By.css('#new-tweet'));
      textBox.nativeElement.value = newTweetText;
      textBox.nativeElement.innerHTML = newTweetText;
      textBox.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      //Click the submit button
      const submit = debug.query(By.css('#submit-tweet'));
      submit.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const tweetFeed = fixture.debugElement.queryAll(
          By.css('.feed .tweet-text')
        );
        const tweetsArray = fixture.componentInstance.tweets;
        expect(
          tweetsArray.findIndex((e) => e.tweetText === newTweetText)
        ).toBeGreaterThan(-1);
        expect(tweetFeed[0].nativeElement.innerHTML).toContain(newTweetText);
        expect(tweetsArray[0].tweetText).toContain(newTweetText);
        done();
      });
    });
  });
});

class MockTweetFeedComponent extends TweetFeedComponent {
  override getTweets(): void {
    const id = '71ab267fc37caa55b9d8de7280daee18';
    super.filterTweets(id);
  }
  override add(tweetText: string) {
    const id = '71ab267fc37caa55b9d8de7280daee18';
    super.add(tweetText, id);
  }
}
