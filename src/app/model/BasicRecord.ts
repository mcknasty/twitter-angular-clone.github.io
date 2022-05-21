interface BasicRecordInterFace {
  id: string;
  created: number;
  updated: number;
}

class BasicRecord {
  public id: string;
  public created: number;
  public updated: number;
  protected keys: Array<string>

  constructor (data: Partial<BasicRecordInterFace> = null) {
    this.keys = BasicRecord.getKeys();
    if ( data ) {
      if ( BasicRecord.isBasicRecord(data) ) {
        Object.assign(this, data);
      }
      else if ( Object.keys(data).length < 3 ) {
        //throw some catch
        const dString = JSON.stringify(data);
        throw new Error(`Attempted to initialize a BasicRecord with a malformed object: ${dString}`);
      }
    }
    else {
      Object.assign(this, this.initEmptyRecord());
    }
  }

  protected initEmptyRecord(): BasicRecordInterFace {
    const record = {
      id: BasicRecord.generateId(),
      created: Date.now(),
      updated: Date.now()
    };
    return record;
  }

  public static generateId(len: number = 0): string {
    const dec2hex = (dec: number) => {
      return ('0' + dec.toString(16)).substr(-2);
    };
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }

  public static impInterface(keys: Array<string>, data: any): boolean {
    return keys.every((key) => Object.keys(data).includes(key));
  }

  public static isBasicRecord(data: any): boolean {
    const keys = BasicRecord.getKeys();
    return BasicRecord.impInterface(keys, data);
  }

  protected assign(data: any) {
    Object.assign(this, data);
  }

  protected static getKeys(): Array<string> {
    //Todo:  Is there a function to return a list of variables from an interface?
    return [ 'id', 'created', 'updated' ];
  }
}

export { BasicRecord, BasicRecordInterFace }
