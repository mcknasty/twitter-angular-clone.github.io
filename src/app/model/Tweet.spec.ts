import { TweetRecord } from './Tweet'

describe('Model: Tweet Record', () => {
  it('The Tweet Record Model should be able to initialize a new populated Tweet record', () => {
    let blankTweet = new TweetRecord();
    expect(TweetRecord.instanceOf(blankTweet)).toBeTrue();
    expect(blankTweet instanceof TweetRecord).toBeTrue();
  });

  it('The Tweet Record Model should be able accept data for a previously initialized Tweet record', () => {
    let id = TweetRecord.generateId();
    let created = Date.now();
    let updated = Date.now();
    let userId = TweetRecord.generateId();
    let tweetText = 'Testing attention please!';
    let recordObj = { id, created, updated, userId, tweetText };
    let prevRecord = new TweetRecord(recordObj);
    expect(TweetRecord.instanceOf(prevRecord)).toBeTrue();
    expect(prevRecord instanceof TweetRecord).toBeTrue();
    expect(prevRecord.id).toEqual(id);
    expect(prevRecord.created).toEqual(created);
    expect(prevRecord.updated).toEqual(updated);
    expect(prevRecord.userId).toEqual(userId);
    expect(prevRecord.tweetText).toEqual(tweetText);
  });

  it('The Tweeet Record Model should be to initialize a new Tweet Record with only the user id and the text of the tweet', () => {
    let userId = TweetRecord.generateId();
    let tweetText = 'Testing once again!'
    let partialTweet = { userId, tweetText };
    expect(TweetRecord.instanceOf(partialTweet, true)).toBeTrue();
    let newTweet = new TweetRecord(partialTweet);
    expect(TweetRecord.instanceOf(newTweet)).toBeTrue();
    expect(newTweet instanceof TweetRecord).toBeTrue();
  });

  it('The Tweeet Record Model should be able to throw an error when initializing with a malformed object', () => {
    let id = TweetRecord.generateId();
    let recordObj = { id };
    try {
      let prevRecord = new TweetRecord(recordObj);
    } catch (e) {
      expect(e).toBeDefined();
      console.error(e);
    }
  });
});
