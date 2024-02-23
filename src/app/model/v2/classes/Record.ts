import { BasicRecord } from './BasicRecord'
import { AbstractBasicRecord } from './AbstractBasicRecord'

class Record extends BasicRecord {
  // eslint-disable-next-line prettier/prettier
  public static override instanceOf(data: AbstractBasicRecord, partial = false) {
    return partial
      ? this.implements(this.getKeys(), data)
      : this.implements(this.getKeys(true), data);
  }

  public static partialInstanceOf(data: AbstractBasicRecord) {
    return this.instanceOf(data, true);
  }

  // I don't care for this callParent parameter.
  // 
  protected static override getKeys(callParent = false): Array<string> {
    //Todo:  Is there a function to return a list of variables from an interface?
    return callParent
      ? [...super.MemberVariablesNames, ...this.MemberVariablesNames]
      : [...this.MemberVariablesNames];
  }
}

export { Record }
