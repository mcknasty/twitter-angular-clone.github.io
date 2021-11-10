import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { declarations } from '../declarations';
import { imports } from '../imports';
import { TweetComponent } from './tweet.component';

describe('TweetComponent', () => {
  let component: TweetComponent;
  let fixture: ComponentFixture<TweetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ...declarations, TweetComponent ],
      imports
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('The Tweet Component should be initialized.', () => {
    expect(component).toBeTruthy();
  });
});
