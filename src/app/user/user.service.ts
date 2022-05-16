import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'api/users';  // URL to web api

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  initUser(): User {
    return {
      id: this.generateId(),
      created: Date.now(),
      updated: Date.now(),
      name: '',
      handle: '',
      userName: '',
      email: '',
      plainPass: '',
      token: '',
      password: '',
      lastLogin: 0
    };
  }

  generateId(len: number = 0): string {
    const dec2hex = (dec: number) => {
      return ('0' + dec.toString(16)).substr(-2);
    };
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUser', []))
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
  getUser(id: string): Observable<User> {
    if ( id ) {
      const url = `${this.userUrl}/${id}`;
      return this.http.get<User>(url).pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
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
