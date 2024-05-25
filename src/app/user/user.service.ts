import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserRecord } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'api/users'; // URL to web api

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  initUser(): UserRecord {
    return new UserRecord();
  }

  /** GET users from the server */
  getUsers(): Observable<UserRecord[]> {
    return this.http.get<UserRecord[]>(this.userUrl).pipe(
      // Look up this function in rsjx docs.  Need to return a observable that is an error
      catchError(this.handleError<UserRecord[]>('function: getUsers', []))
    );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: string): Observable<UserRecord> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<UserRecord>(url).pipe(
      // Look up this function in rsjx docs.  Need to return a observable that is an error
      catchError(
        this.handleError<UserRecord>(
          `getUser function: id=${id}`,
          this.initUser()
        )
      )
    );
  }

  public throwError<T>(message: HttpErrorResponse | string, result: T) {
    return this.handleError<T>(message, result);
  }

  private handleError<T>(message: HttpErrorResponse | string, result: T) {
    return (): Observable<T> => {
      let errorMessage;
      if (message instanceof HttpErrorResponse) {
        errorMessage = `UserService encountered an error: ${JSON.stringify(message)}`;
      } else {
        errorMessage = 'UserService encountered an error: '.concat(message);
      }
      // Need to return an observable error here.
      console.error(errorMessage);
      return of(result as T);
    };
  }
}
