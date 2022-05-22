import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UserRecord } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'api/users';  // URL to web api

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  initUser(): UserRecord {
    return new UserRecord();
  }

  /** GET users from the server */
  getUsers(): Observable<UserRecord[]> {
    return this.http.get<UserRecord[]>(this.userUrl)
      .pipe(
        catchError(this.handleError<UserRecord[]>('getUser', []))
      );
  }

  /** GET user by id. Return `undefined` when id not found * /
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.userUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} user id=${id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: string): Observable<UserRecord> {
    if ( id ) {
      const url = `${this.userUrl}/${id}`;
      return this.http.get<UserRecord>(url).pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<UserRecord>(`getUser id=${id}`))
      );
    }
    return of ( this.initUser() );
  }

  public throwError<T>(service: string, error) {
    return this.handleError<T>(service, error);
  }

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

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    // console.log(message);
  }
}
