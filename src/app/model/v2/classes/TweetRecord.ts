import { Record } from './Record'
import { BasicRecordInterface } from '../types/BasicRecordInterface'
import { TweetSchema } from '../types/TweetSchema'
import { BasicRecordSchema } from '../types/BasicRecordSchema'

class TweetRecord extends Record implements BasicRecordInterface {
  public tweetText!: string;
  public userId!: string;
  // eslint-disable-next-line prettier/prettier
  protected static override MemberVariablesNames: Array<string> = ['tweetText', 'userId'];

  constructor(data?: Partial<TweetSchema>) {
    super();
    if (data) {
      if (TweetRecord.instanceOf(data)) {
        Object.assign(this, data);
      } else if (TweetRecord.partialInstanceOf(data)) {
        const record = { ...this.initEmptyRecord(), ...data };
        Object.assign(this, record);
      } else if (Object.keys(data).length < 2) {
        const dString = JSON.stringify(data);
        throw new Error(
          `Attempted to initialize a Tweet Record with a malformed object: ${dString}`
        );
      }
    } else {
      Object.assign(this, this.initEmptyRecord());
    }
  }

  // eslint-disable-next-line prettier/prettier
  public override initEmptyRecord(userId = null, tweetText = null): Partial<BasicRecordSchema> {
    const basicRecord = super.initEmptyRecord();
    const record = {
      ...basicRecord,
      tweetText,
      userId
    };
    return record;
  }
}

export { TweetRecord }
