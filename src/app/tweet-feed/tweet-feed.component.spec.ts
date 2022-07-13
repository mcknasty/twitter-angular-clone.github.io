import { TestBed, waitForAsync, ComponentFixtureAutoDetect,  ComponentFixture, inject, async, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { AppComponent } from '../app/app.component';
import { declarations } from '../app/declarations';
import { imports } from '../app/imports';
import { TweetFeedComponent } from './tweet-feed.component';
import { TweetComponent } from '../tweet/tweet.component';
import { UserService } from '../user/user.service';
import { TweetService } from '../tweet/tweet.service';
import { UserRecord } from '../model/User';
import { TweetRecord } from '../model/Tweet';
import { DebugElement } from '@angular/core';

describe('Component: TweetFeedComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ...imports,
        RouterTestingModule.withRoutes([
          { path: 'user/:id', component: UserComponent, runGuardsAndResolvers: 'always' },
          { path: '', redirectTo: '/user/71ab267fc37caa55b9d8de7280daee18', pathMatch: 'full' }
        ])
      ],
      declarations: [ MockTweetFeedComponent, TweetComponent ] ,
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: UserService },
        { provide: TweetService }
      ]
    }).compileComponents();
  }));

  it('The Tweet Feed Component should be initialized.', (done) => {
    let users: UserService = TestBed.inject(UserService);
    let tweets: TweetService = TestBed.inject(TweetService);
    let fixture: ComponentFixture<TweetFeedComponent> = TestBed.createComponent(MockTweetFeedComponent);
    let native: HTMLElement = fixture.nativeElement;
    let debug = fixture.debugElement;
    expect(native).toBeInstanceOf(HTMLElement);
    done();
  });

  it("The Tweet Feed Component's textarea should toggle open and close.", (done) => {
    let users: UserService = TestBed.inject(UserService);
    let tweets: TweetService = TestBed.inject(TweetService);
    let fixture: ComponentFixture<TweetFeedComponent> = TestBed.createComponent(MockTweetFeedComponent);
    let native: HTMLElement = fixture.nativeElement;
    let debug = fixture.debugElement;
    //Start with the new Tweet Drawer Closed
    expect(native).toBeInstanceOf(HTMLElement);
    let drawerClosed = debug.query(By.css('.display-none'));
    expect(drawerClosed).toBeInstanceOf(DebugElement);

    //Open the Drawer
    let linkDes = debug.query(By.css('.feed-header .button'));
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
  it("The Tweet Feed Component should be able to add a new tweet.", (done) => {
    let users: UserService = TestBed.inject(UserService);
    let tweets: TweetService = TestBed.inject(TweetService);
    let fixture: ComponentFixture<TweetFeedComponent> = TestBed.createComponent(MockTweetFeedComponent);
    let native: HTMLElement = fixture.nativeElement;
    let debug = fixture.debugElement;
    //Open the Drawer
    let linkDes = debug.query(By.css('.feed-header .button'));
    linkDes.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let newTweetText: string = 'New Tweet! 123';
      let drawerClosed = debug.query(By.css('.display-none'));
      expect(drawerClosed).toBeNull();

      //Add some text to the compose tweet text area
      let textBox = debug.query(By.css('#new-tweet'));
      textBox.nativeElement.value = newTweetText;
      textBox.nativeElement.innerHTML = newTweetText;
      textBox.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      //Click the submit button
      let submit = debug.query(By.css('#submit-tweet'));
      submit.nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let tweetFeed = fixture.debugElement.queryAll(By.css('.feed .tweet-text'));
        let tweetsArray = fixture.componentInstance.tweets;
        expect(tweetsArray.findIndex((e) => e.tweetText === newTweetText)).toBeGreaterThan(-1);
        expect(tweetFeed[0].nativeElement.innerHTML).toContain(newTweetText);
        expect(tweetsArray[0].tweetText).toContain(newTweetText);
        done();
      });
    });
  });
});

class MockTweetFeedComponent extends TweetFeedComponent {
  getTweets(): void {
    const id: string = '71ab267fc37caa55b9d8de7280daee18';
    super.filterTweets(id);
  }
  add(tweetText: string) {
    const id: string = '71ab267fc37caa55b9d8de7280daee18';
    super.add(tweetText, id);
  }
}
