
import { ComponentRef, provideZoneChangeDetection } from '@angular/core';

import {
  TestBed,
  waitForAsync,
  ComponentFixtureAutoDetect,
  ComponentFixture
} from '@angular/core/testing';

import { 
  provideHttpClient, 
  withFetch, 
} from '@angular/common/http';

import { Router, provideRouter } from '@angular/router';
/** * /
import { 
  RouterTestingModule,
 } from '@angular/router/testing';
/** */

import { RouterTestingHarness } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
// import { declarations } from './declarations';
import { imports } from './imports';

import { UserComponent } from '../user/user.component';

/**
     TestBed.configureTestingModule(
      Object.assign({}, appConfig, {
        imports: [DashboardComponent],
        providers: [
          provideRouter([{path: '**', component: DashboardComponent}]),
          provideHttpClient(),
          provideHttpClientTesting(),
          HeroService,
        ],
      }),
    )
      .compileComponents()
      .then(async () => {
        harness = await RouterTestingHarness.create();
        comp = await harness.navigateByUrl('/', DashboardComponent);
        TestBed.inject(HttpTestingController).expectOne('api/heroes').flush(getTestHeroes());
      });
 */
const getTestBed = (callback: Function) => {
  //Per: https://angular.dev/guide/testing/components-scenarios#example-61
  TestBed.configureTestingModule({
    /** */
    imports: [
      ...imports
    ],
    /** */
    declarations: [
      AppComponent,
      UserComponent
    ],
    
    providers: [
      // { provide: provideZoneChangeDetection({ ignoreChangesOutsideZone: true }) },
      { provide: ComponentFixtureAutoDetect, useValue: true },
      
      // { provide: provideHttpClient(withFetch()) },
      // { provide: provideHttpClientTesting() },
      { provide: provideRouter([
        { path: '', redirectTo: '/user/71ab267fc37caa55b9d8de7280daee18', pathMatch: 'full' },
        { path: 'user/:id', component: UserComponent, runGuardsAndResolvers: 'always'}
      ])}
      /** * /
      /** */
    ]
  
  }).compileComponents()
  .then(async () => {
    callback()
  })
}

describe('Component: AppComponent', () => {
/** */
  it('The App Component should be initialized', async (done) => {
    getTestBed(async () => {
      const harness = await RouterTestingHarness.create();
      const url = '/user/71ab267fc37caa55b9d8de7280daee18';

      await harness.navigateByUrl(url, UserComponent);
      const fixture: ComponentFixture<unknown> = harness.fixture
      
      await fixture.whenStable().then(() => {
        const component = fixture.nativeElement;
        expect(component).toBeDefined();
      })
    })
  });
/** */
/** * /
  it('The App Component render a bird icon in the header of the page', (done) => {
    const url = '/user/71ab267fc37caa55b9d8de7280daee18';
    const router = TestBed.inject(Router);
    router.initialNavigation();
    router.setUpLocationChangeListener();
    const p = router.navigateByUrl(url);
    p.then(
      (success) => {
        if (success) {
          const fixture = TestBed.createComponent(AppComponent);
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            const component = fixture.nativeElement;
            const icon = component.querySelector('i.fab.fa-twitter');
            expect(icon).toBeDefined();
            done();
          });
        } else {
          expect(false).toBeTrue();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });
/** */
});
