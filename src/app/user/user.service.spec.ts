import { TestBed, waitForAsync } from '@angular/core/testing';

import { UserService } from './user.service';
import { declarations } from '../app/declarations';
import { imports } from '../app/imports';
import { UserRecord } from '../model/User';

describe('Service: UserService', () => {
  it('The User Service should be dependency injected', waitForAsync(() => {
    console.info(imports);
    TestBed.configureTestingModule({ declarations, imports });
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeDefined();
    service.getUsers().subscribe((users: UserRecord[]) => {
      expect(users).toHaveSize(10);
    });
  }));

  it('The User Service should throw an error due to a bad parameter', waitForAsync(() => {
    TestBed.configureTestingModule({ declarations, imports });
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeDefined();
    const user = new UserRecord();
    const userArr = [user, user];
    const message1 =
      'Something Went Wrong Test Harness: Just a test ;-) It will be ok. This was suppose to happen';
    const message2 =
      'Something Went Wrong Test Harness: Just a test ;-) It will be ok.  This was suppose to happen again';

    service
      .throwError<UserRecord>(message1, user)()
      .subscribe((e) => {
        expect(e instanceof UserRecord).toBeTrue();
      });

    service
      .throwError<UserRecord[]>(message2, userArr)()
      .subscribe((e) => {
        expect(e instanceof Array).toBeTrue();
      });
  }));

  it('The User Service should throw an error due to mock api 404 failure', waitForAsync(() => {
    const modImports = imports.filter((value) => {
      return !Array.isArray(value) &&
        value instanceof Object &&
        Object.keys(value).includes('ngModule')
        ? false
        : true;
    });

    TestBed.configureTestingModule({ declarations, imports: modImports });
    const service: UserService = TestBed.inject(UserService);

    service.getUsers().subscribe((users) => {
      expect(users).toHaveSize(0);
    });
  }));
});
