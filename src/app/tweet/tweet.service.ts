import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Tweet } from './tweet';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TweetService implements OnInit {
  private tweetUrl = 'api/tweets';  // URL to web api

  ngOnInit() {
    this.getTweets();
  }

  constructor(private http: HttpClient) { }

  /** GET tweets from the server */
  getTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.tweetUrl)
      .pipe(tap(_ => {
          //this.log('fetched tweets');
        }),
        catchError(this.handleError<Tweet[]>('getTweet', []))
      );
  }

  /** GET tweet by id. Return `undefined` when id not found */
  getTweetNo404<Data>(id: number): Observable<Tweet> {
    const url = `${this.tweetUrl}/?id=${id}`;
    return this.http.get<Tweet[]>(url)
      .pipe(
        map(tweets => tweets[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} tweet id=${id}`);
        }),
        catchError(this.handleError<Tweet>(`getTweet id=${id}`))
      );
  }

  /** GET tweet by id. Will 404 if id not found */
  getTweet(id: number): Observable<Tweet> {
    const url = `${this.tweetUrl}/${id}`;
    return this.http.get<Tweet>(url).pipe(
      tap(_ => this.log(`fetched tweet id=${id}`)),
      catchError(this.handleError<Tweet>(`getTweet id=${id}`))
    );
  }

  /* GET tweets whose name contains search term */
  searchTweet(term: string): Observable<Tweet[]> {
    if (!term.trim()) {
      // if not search term, return empty tweet array.
      return of([]);
    }
    return this.http.get<Tweet[]>(`${this.tweetUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found tweets matching "${term}"`)),
      catchError(this.handleError<Tweet[]>('searchTweet', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new tweet to the server */
  addTweet(tweet: Tweet): Observable<Tweet> {
    return this.http.post<Tweet>(this.tweetUrl, tweet, httpOptions).pipe(
      tap((newTweet: Tweet) => this.log(`added tweet w/ id=${newTweet.id}`)),
      catchError(this.handleError<Tweet>('addTweet'))
    );
  }

  /** DELETE: delete the tweet from the server */
  deleteTweet(tweet: Tweet | number): Observable<Tweet> {
    const id = typeof tweet === 'number' ? tweet : tweet.id;
    const url = `${this.tweetUrl}/${id}`;

    return this.http.delete<Tweet>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted tweet id=${id}`)),
      catchError(this.handleError<Tweet>('deleteTweet'))
    );
  }

  /** PUT: update the tweet on the server */
  updateTweet(tweet: Tweet): Observable<any> {
    return this.http.put(this.tweetUrl, tweet, httpOptions).pipe(
      tap(_ => this.log(`updated tweet id=${tweet.id}`)),
      catchError(this.handleError<any>('updateTweet'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TweetService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
