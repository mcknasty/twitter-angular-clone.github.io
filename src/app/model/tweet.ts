import { BasicRecord, BasicRecordInterFace } from './BasicRecord';
import { TweetBasic } from './tweetBasic';

interface TweetPartial {
  tweetText: string | null;
  userId: string | null;
}

type TweetRecord = TweetPartial & BasicRecordInterFace;

class Tweet extends BasicRecord {
  public tweetText: string;
  public userId: string;

  constructor (data: TweetRecord = null) {
    super();
    this.keys = Tweet.getKeys();
    //const dataFlag = (data === null || data === undefined)
    if (data) {
      if ( Tweet.isTweetRecord(data) ) {
        super(data);
        Object.assign(this, data);
      }
      else if ( Object.keys(data).length < 2 ) {
        //Throw an error
        let t = false;
      }
    }
    else {
      Object.assign(this, this.initEmptyRecord());
    }
  }

  protected initEmptyRecord(userId = null, tweetText = null): TweetRecord {
    const basicRecord = super.initEmptyRecord();
    const record = {
      ...basicRecord,
      tweetText,
      userId
    };
    return record;
  }

  public static isTweetPartial(data: any): boolean {
    const keys = Tweet.getKeys();
    return BasicRecord.impInterface(keys, data);
  }

  public static isTweetRecord(data: any): boolean {
    return Tweet.isTweetPartial(data) && BasicRecord.isBasicRecord(data);
  }

  public assign(data: TweetPartial) {
    super.assign(data);
  }

  public static getKeys(): Array<string> {
    //Todo:  Is there a function to return a list of variables from an interface?
    return [ 'tweetText', 'userId' ];
  }

}

export { Tweet, TweetPartial, TweetRecord }
