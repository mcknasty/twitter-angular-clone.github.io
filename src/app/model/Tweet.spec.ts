import { Tweet } from './Tweet'

describe('Model: Tweet Record', () => {
  it('The Tweet Record Model should be able to initialize a new populated Tweet record', () => {
    let blankTweet = new Tweet();
    expect(Tweet.isTweetRecord(blankTweet)).toBeTrue();
    expect(blankTweet instanceof Tweet).toBeTrue();
  });

  it('The Tweet Record Model should be able accept data for a previously initialized Tweet record', () => {
    let id = Tweet.generateId();
    let created = Date.now();
    let updated = Date.now();
    let userId = Tweet.generateId();
    let tweetText = 'Testing attention please!';
    let recordObj = { id, created, updated, userId, tweetText };
    let prevRecord = new Tweet(recordObj);
    expect(Tweet.isTweetRecord(prevRecord)).toBeTrue();
    expect(prevRecord instanceof Tweet).toBeTrue();
    expect(prevRecord.id).toEqual(id);
    expect(prevRecord.created).toEqual(created);
    expect(prevRecord.updated).toEqual(updated);
    expect(prevRecord.userId).toEqual(userId);
    expect(prevRecord.tweetText).toEqual(tweetText);
  });

  it('The Tweeet Record Model should be to initialize a new Tweet Record with only the user id and the text of the tweet', () => {
    let userId = Tweet.generateId();
    let tweetText = 'Testing once again!'
    let partialTweet = { userId, tweetText };
    expect(Tweet.isTweetPartial(partialTweet)).toBeTrue();
    let newTweet = new Tweet(partialTweet);
    expect(Tweet.isTweetRecord(newTweet)).toBeTrue();
    expect(newTweet instanceof Tweet).toBeTrue();
  });

  it('The Tweeet Record Model should be able to throw an error when initializing with a malformed object', () => {
    let id = Tweet.generateId();
    let recordObj = { id };
    try {
      let prevRecord = new Tweet(recordObj);
    } catch (e) {
      expect(e).toBeDefined();
      console.error(e);
    }
  });
});
