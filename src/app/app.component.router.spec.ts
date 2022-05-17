/ For more examples:
//   https://github.com/angular/angular/blob/master/modules/@angular/router/test/integration.spec.ts

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';

import { Router, RouterLinkWithHref } from '@angular/router';

import { By } from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';
import { Location } from '@angular/common';

import { routes } from './app-routing.module';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroService, TestHeroService } from './model/testing/test-hero.service';
import { TwainService } from './twain/twain.service';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let page: Page;
let router: Router;
let location: SpyLocation;

describe('AppComponent & RouterTestingModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed
        .configureTestingModule({
          imports: [
            AppModule,
            RouterTestingModule.withRoutes(routes),
          ],
          providers: [{provide: HeroService, useClass: TestHeroService}]
        })
        .compileComponents();
  }));

  it("The App should rediect to an arbitary user's page on loading", fakeAsync(() => {
       createComponent();
       tick();  // wait for async data to arrive
       expectPathToBe('/dashboard', 'after initialNavigation()');
       expectElementOf(DashboardComponent);
     }));

  it('should navigate to "About" on click', fakeAsync(() => {
       createComponent();
       click(page.aboutLinkDe);
       // page.aboutLinkDe.nativeElement.click(); // ok but fails in phantom

       advance();
       expectPathToBe('/about');
       expectElementOf(AboutComponent);
     }));
});

////// Helpers /////////

/**
 * Advance to the routed page
 * Wait a tick, then detect changes, and tick again
 */
function advance(): void {
  tick();                   // wait while navigating
  fixture.detectChanges();  // update view
  tick();                   // wait for async data to arrive
}

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  router = injector.get(Router);
  router.initialNavigation();
  advance();

  page = new Page();
}

class Page {
  aboutLinkDe: DebugElement;
  dashboardLinkDe: DebugElement;
  heroesLinkDe: DebugElement;

  // for debugging
  comp: AppComponent;
  router: Router;
  fixture: ComponentFixture<AppComponent>;

  constructor() {
    const links = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    this.aboutLinkDe = links[2];
    this.dashboardLinkDe = links[0];
    this.heroesLinkDe = links[1];

    // for debugging
    this.comp = comp;
    this.fixture = fixture;
    this.router = router;
  }
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  expect(location.path())
  .withContext(expectationFailOutput || 'location.path()')
  .toEqual(path);
}

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el)
    .withContext(`expected an element for ${type.name}`)
    .toBeTruthy();
  return el;
}
