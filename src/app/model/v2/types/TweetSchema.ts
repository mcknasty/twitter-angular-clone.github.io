import { BasicRecordSchema } from './BasicRecordSchema'

interface TweetPartialSchema {
  tweetText: string | null;
  userId: string | null;
}

type TweetSchema = TweetPartialSchema & BasicRecordSchema;

export { TweetPartialSchema, TweetSchema }