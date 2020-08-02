import { TestBed } from '@angular/core/testing';
import { declarations } from '../declarations';
import { imports } from '../imports';
import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({declarations, imports}));

  it('should be created', () => {
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeDefined();
  });
});
