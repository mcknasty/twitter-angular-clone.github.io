abstract class AbstractBasicRecord {
  // This looks like a way to hold member data
  // I am not sure why I did this.
  protected static MemberVariablesNames: Array<string> = [
    'id',
    'created',
    'updated'
  ];

  // This looks like a way to see if a key is associated
  // data parameter passed of AbstractBasicRecord
  protected static implements(
    keys: Array<string>,
    data: AbstractBasicRecord
  ): boolean {
    return keys.every((key) => Object.keys(data).includes(key));
  }

  // Ensure that the data object has all the variables of a AbstractBasicRecord
  public static instanceOf(data: AbstractBasicRecord): boolean {
    return this.implements(this.getKeys(), data);
  }

  // Get all protect variable names
  protected static getKeys(): Array<string> {
    //Todo:  Is there a function to return a list of variables from an interface?
    return [...this.MemberVariablesNames];
  }
}


export { AbstractBasicRecord }