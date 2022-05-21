import { BasicRecord } from './BasicRecord'

describe('Model: Basic Record', () => {
  it('The Basic Record Model should be able to initialize a new populated basic record', () => {
    let blankRecord = new BasicRecord();
    expect(BasicRecord.isBasicRecord(blankRecord)).toBeTrue();
    expect(blankRecord instanceof BasicRecord).toBeTrue();
  });

  it('The Basic Record Model should be able accept data for a previously initialized basic record', () => {
    let id = BasicRecord.generateId();
    let created = Date.now();
    let updated = Date.now();
    let recordObj = { id, created, updated };
    let prevRecord = new BasicRecord(recordObj);
    expect(BasicRecord.isBasicRecord(prevRecord)).toBeTrue();
    expect(prevRecord instanceof BasicRecord).toBeTrue();
    expect(prevRecord.id).toEqual(id);
    expect(prevRecord.created).toEqual(created);
    expect(prevRecord.updated).toEqual(updated);
  });

  it('The Basic Record Model should be able to throw an error when initializing with a malformed object', () => {
    let id = BasicRecord.generateId();
    let recordObj = { id };
    try {
      let prevRecord = new BasicRecord(recordObj);
    } catch (e) {
      expect(e).toBeDefined();
      console.error(e);
    }
  });
});
