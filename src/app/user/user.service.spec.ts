import { TestBed, waitForAsync } from '@angular/core/testing';

import { UserService } from './user.service';
import { declarations } from '../app/declarations';
import { imports } from '../app/imports';
import { UserRecord } from '../model/User';

describe('Service: UserService', () => {
  it('getUsers should return an array of populated User Record objects', waitForAsync(async () => {
    TestBed.configureTestingModule({ declarations, imports });
    const service: UserService = TestBed.inject(UserService);

    expect(service).toBeDefined();
    service.getUsers()?.subscribe((users) => {
      const Users = users as UserRecord[]

      const isCorrectType: boolean = Users
        .every(user => UserRecord.instanceOf(user));
      expect(isCorrectType).toBeTrue();

      const isPopulated: boolean = Users.map(v => v.name)
        .every(name => typeof name == 'string');
      expect(isPopulated).toBeTrue()

      expect(Users).toHaveSize(10);
    });
  }));

  it('getUser should return the correct populated UserRecord object', waitForAsync(async () => {
    TestBed.configureTestingModule({ declarations, imports });
    const service: UserService = TestBed.inject(UserService);
    const userId = '71ab267fc37caa55b9d8de7280daee18';

    expect(service).toBeDefined();
    service.getUser(userId)?.subscribe((user) => {
      const u = user as UserRecord;
      expect(u.id).toEqual(userId);
    });
  }));

  it('The User Service should throw an error due to a bad parameter', waitForAsync(async () => {
    TestBed.configureTestingModule({ declarations, imports });
    const service: UserService = TestBed.inject(UserService);
    expect(service).toBeDefined();

    const message1 =
      'Something Went Wrong Test Harness: Just a test ;-) It will be ok. This was suppose to happen';
    const message2 =
      'Something Went Wrong Test Harness: Just a test ;-) It will be ok.  This was suppose to happen again';

    service.throwError(message1).subscribe((message) => {
      expect(typeof message === 'string').toBeTrue();
      expect(message).toMatch('This was suppose to happen');
    });

    service.throwError(message2).subscribe((message) => {
      expect(typeof message === 'string').toBeTrue();
      expect(message).toMatch('This was suppose to happen again');
    });
  }));

  it('The User Service should throw an error due to mock api 404 failure', waitForAsync(async () => {
    const modImports = imports.filter((value) => {
      return !Array.isArray(value) &&
        value instanceof Object &&
        Object.keys(value).includes('ngModule')
        ? false
        : true;
    });

    TestBed.configureTestingModule({ declarations, imports: modImports });
    const service: UserService = TestBed.inject(UserService);

    service.getUsers().subscribe((message) => {
      expect(typeof message === 'string').toBeTrue();
      expect(Array.isArray(message)).toBeFalse();
    });

    const userId = '71ab267fc37caa55b9d8de7280daee18';
    service.getUser(userId).subscribe((message) => {
      expect(typeof message === 'string').toBeTrue();
      expect(message instanceof UserRecord).toBeFalse();
    });
  }));
});
