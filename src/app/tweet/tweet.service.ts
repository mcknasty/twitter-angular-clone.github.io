import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AbstractHttpService,
  ServiceHttpError
} from '../abstracts/AbstractHttpService';
import { TweetRecord } from '../model/Tweet';

type GetTweetResponse = TweetRecord | ServiceHttpError;
type GetTweetsResponse = TweetRecord[] | ServiceHttpError;

@Injectable({
  providedIn: 'root'
})
export class TweetService extends AbstractHttpService {
  private tweetUrl = 'api/tweets'; // URL to web api

  constructor() {
    super('TweetService encountered an error');
  }

  /** GET tweets from the server */
  getTweets(): Observable<GetTweetsResponse> {
    return this.httpGet<GetTweetsResponse>(this.tweetUrl);
  }

  /** POST: add a new tweet to the server */
  addTweet(tweet: TweetRecord): Observable<GetTweetResponse> {
    return this.httpPost<GetTweetResponse, TweetRecord>(this.tweetUrl, tweet);
  }

  /** Not Currently Implemented  ** /
  getTweet(id: string): Observable<TweetRecord> {
    const url = `${this.tweetUrl}/${id}`;
    return this.http.get<TweetRecord>(url).pipe(
      catchError(this.handleError<TweetRecord>(`getTweet id=${id}`, new TweetRecord()))
    );
  }
  /**   **/
}
