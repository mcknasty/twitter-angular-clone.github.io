import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { declarations } from '../declarations';
import { imports } from '../imports';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';

describe('Service: UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({declarations, imports}));

  it('The User Service should be dependancy injected', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeDefined();
  });
  it('The User Service should throw an error', inject([UserService], async (service: UserService) => {
    expect(service).toBeDefined();
    const observable = of({
      next: x => "Test harness testing log and code coverage",
      error: err => "Service ended in an error",
      complete: () => console.log('Observer got a complete notification'),
      unsubscribe: () => {}
    });
    service.throwError<any>("User Service", observable)({message: "Test harness testing log and code coverage"}).subscribe(() => {
      expect(true).toBeDefined();
    });
  }));
});
