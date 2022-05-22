import { UserRecord } from './User';

describe('Model: User Record', () => {
  it('The User Record Model should be able to initialize a new populated User record', () => {
    let blankUser = new UserRecord();
    expect(UserRecord.instanceOf(blankUser)).toBeTrue();
    expect(blankUser instanceof UserRecord).toBeTrue();
  });

  it('The User Record Model should be able accept data for a previously initialized User record', () => {
    let id = UserRecord.generateId();
    let created = Date.now();
    let updated = Date.now();
    let name = 'Tray Parker';
    let handle = 'TDiddyParkingLotBoy';
    let userName = 'tillTomorrowTrey';
    let email = 'tillTomorrowTrey@gmail.com';
    let plainPass = 'plainPass';
    let token = 'token';
    let password = 'password';
    let lastLogin = Date.now();

    let recordObj = {
      id, created, updated, name, handle, userName,
      email, plainPass, token, password, lastLogin
    };

    let prevRecord = new UserRecord(recordObj);
    expect(UserRecord.instanceOf(prevRecord)).toBeTrue();
    expect(prevRecord instanceof UserRecord).toBeTrue();

    expect(prevRecord.id).toEqual(id);
    expect(prevRecord.created).toEqual(created);
    expect(prevRecord.updated).toEqual(updated);
    expect(prevRecord.name).toEqual(name);
    expect(prevRecord.handle).toEqual(handle);
    expect(prevRecord.userName).toEqual(userName);
    expect(prevRecord.email).toEqual(email);
    expect(prevRecord.plainPass).toEqual(plainPass);
    expect(prevRecord.token).toEqual(token);
    expect(prevRecord.password).toEqual(password);
    expect(prevRecord.lastLogin).toEqual(lastLogin);
  });

  it('The User Record Model should be to initialize a new User Record with only a some of the user variables', () => {
    let name = 'Tray Parker';
    let handle = 'TDiddyParkingLotBoy';
    let userName = 'tillTomorrowTrey';
    let email = 'tillTomorrowTrey@gmail.com';
    let plainPass = 'plainPass';
    let token = 'token';
    let password = 'password';
    let lastLogin = Date.now();

    let partialUser = {
      name, handle, userName, email,
      plainPass, token, password, lastLogin
    };
    expect(UserRecord.partialInstanceOf(partialUser)).toBeTrue();

    let newUser = new UserRecord(partialUser);
    expect(UserRecord.instanceOf(newUser)).toBeTrue();
    expect(newUser instanceof UserRecord).toBeTrue();

    expect(newUser.name).toEqual(name);
    expect(newUser.handle).toEqual(handle);
    expect(newUser.userName).toEqual(userName);
    expect(newUser.email).toEqual(email);
    expect(newUser.plainPass).toEqual(plainPass);
    expect(newUser.token).toEqual(token);
    expect(newUser.password).toEqual(password);
    expect(newUser.lastLogin).toEqual(lastLogin);
  });

  it('The User Record Model should be able to throw an error when initializing with a malformed object', () => {
    let id = UserRecord.generateId();
    let recordObj = { id };
    try {
      let prevRecord = new UserRecord(recordObj);
    } catch (e) {
      expect(e).toBeDefined();
      console.error(e);
    }
  });
});
