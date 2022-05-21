import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tweet } from '../model/tweet';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private tweetUrl = 'api/tweets';  // URL to web api

  constructor(private http: HttpClient) {
    this.getTweets();
  }

  /** GET tweets from the server */
  getTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(this.tweetUrl)
      .pipe(
        catchError(this.handleError<Tweet[]>('getTweet', [])())
      );
  }

  /** GET tweet by id. Will 404 if id not found * /
  getTweet(id: string): Observable<Tweet> {
    const url = `${this.tweetUrl}/${id}`;
    return this.http.get<Tweet>(url).pipe(
      catchError(this.handleError<Tweet>(`getTweet id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new tweet to the server */
  addTweet(tweet: Tweet): Observable<Tweet> {
    return this.http.post<Tweet>(this.tweetUrl, tweet, httpOptions);
    //How does this line throw and error?
    /**
    return this.http.post<Tweet>(this.tweetUrl, tweet, httpOptions).pipe(
      catchError(this.handleError<Tweet>('addTweet'))
    );
    **/
  }

  public throwError<T>(service: string, error?: any) :Function {
    let func: Function;
    if (error !== undefined) {
      func = this.handleError<T>(service, error);
    }
    else {
      func = this.handleError<T>(service);
    }
    return func;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */


  private handleError<T>(operation: String, result?: T) :Function {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      if (typeof error === 'string') {
        console.error(error); // log to console instead
      }
      else if (typeof error === 'object' && 'message' in error ){
        console.error(error);
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
        return of(error as T);
      }

      return of(result as T);
    };
  }

  /** Log a TweetService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
