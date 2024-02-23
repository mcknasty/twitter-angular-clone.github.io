import { BasicRecordInterface } from '../types/BasicRecordInterface'
import { BasicRecordSchema } from '../types/BasicRecordSchema'
import { AbstractBasicRecord } from '../classes/AbstractBasicRecord'

class BasicRecord extends AbstractBasicRecord implements BasicRecordInterface {
  // These can't be null or undefined
  public id!: string;
  public created!: number;
  public updated!: number;

  // Either we are populating this instance with some data or 
  // We are initializing a new one.
  constructor(data: Partial<BasicRecordSchema> | null = null) {
    super();
    if (data) {
      // This says that it needs all the member variables of
      // BasicRecord or it's throwing an error.
      if (BasicRecord.instanceOf(data)) {
        Object.assign(this, data);
      } else if (Object.keys(data).length < 3) {
        //throw some catch
        const dString = JSON.stringify(data);
        throw new Error(
          `Attempted to initialize a BasicRecord with a malformed object: ${dString}`
        );
      }
    } else {
      Object.assign(this, this.initEmptyRecord());
    }
  }

  // Initialize the record
  public initEmptyRecord(): Partial<BasicRecordSchema> {
    const record = {
      id: BasicRecord.generateId(),
      created: Date.now(),
      updated: Date.now()
    };
    return record;
  }

  public static generateId(len = 0): string {
    const dec2hex = (dec: number) => {
      return ('0' + dec.toString(16)).substring(-2);
    };
    const arr = new Uint8Array((len || 40) / 2);
    crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }
}

export { BasicRecord }