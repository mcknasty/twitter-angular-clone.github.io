import { Record } from './Record'
import { BasicRecordInterface } from '../types/BasicRecordInterface'
import { UserSchema } from '../types/UserSchema'
import { BasicRecordSchema } from '../types/BasicRecordSchema'

class UserRecord extends Record implements BasicRecordInterface {
  public name = '';
  public handle = '';
  public userName = '';
  public email = '';
  public plainPass = '';
  public token = '';
  public password = '';
  public lastLogin = 0;

  protected static override MemberVariablesNames: Array<string> = [
    'name',
    'handle',
    'userName',
    'email',
    'plainPass',
    'token',
    'password',
    'lastLogin'
  ];

  constructor(data?: Partial<UserSchema>) {
    super();
    if (data) {
      if (UserRecord.instanceOf(data)) {
        Object.assign(this, data);
      } else if (UserRecord.partialInstanceOf(data)) {
        const record = { ...this.initEmptyRecord(), ...data };
        Object.assign(this, record);
      } else if (Object.keys(data).length < 8) {
        const dString = JSON.stringify(data);
        throw new Error(
          `Attempted to initialize a User Record with a malformed object: ${dString}`
        );
      }
    } else {
      Object.assign(this, this.initEmptyRecord());
    }
  }

  public override initEmptyRecord(): Partial<BasicRecordSchema> {
    const blank: { [key: string]: unknown } = {};
    // for (const e: key of UserRecord of UserRecord.getKeys()) blank[e] = null;
    UserRecord.getKeys().forEach((key: string) => {
      blank[key] = null;
    });
    const basicRecord = super.initEmptyRecord();
    const record = {
      ...basicRecord,
      ...blank
    };
    return record;
  }
}

export { UserRecord };