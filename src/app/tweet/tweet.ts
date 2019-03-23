import { BasicRecord } from '../BasicRecord';
import { TweetBasic } from './tweetBasic';

export class Tweet implements TweetBasic, BasicRecord {
  tweetText = '';
  userId = '';
  id = '';
  created = 0;
  updated = 0;
}
