import { TestBed, async } from '@angular/core/testing';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {Router} from '@angular/router';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { declarations } from './declarations';
import { imports } from './imports';

describe('AppComponent', () => {
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...imports,
        RouterTestingModule.withRoutes([
          { path: 'user/:id', component: UserComponent, runGuardsAndResolvers: 'always' },
          { path: '', redirectTo: '/user/71ab267fc37caa55b9d8de7280daee18', pathMatch: 'full' }
        ])
      ],
      declarations,
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();

  }));

  it('should create the app', () => {
    router = TestBed.inject(Router);
    router.initialNavigation();
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.nativeElement;
    expect(component).toBeDefined();
  });

  it('should render bird icon', async(() => {
    router = TestBed.inject(Router);
    router.initialNavigation();
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const component = fixture.nativeElement;
      const icon = component.querySelector('i.fab.fa-twitter');
      expect(icon).toBeDefined();
    });
  }));
});
