import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { UserRecord } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'api/users'; // URL to web api

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  /** GET users from the server */
  getUsers(): Observable<UserRecord[] | string | HttpErrorResponse> {
    return this.http.get<UserRecord[]>(this.userUrl).pipe(
      catchError((error) => {
        return this.handleError(error);
      })
    );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: string): Observable<UserRecord | string | HttpErrorResponse> {
    const url = `${this.userUrl}/${id}`;

    return this.http.get<UserRecord | string>(url).pipe(
      catchError((error) => {
        return this.handleError(error);
      })
    );
  }

  public throwError(message: HttpErrorResponse | string) {
    return this.handleError(message);
  }

  private handleError(message: HttpErrorResponse | string) {
    let errorMessage;
    if (message instanceof HttpErrorResponse) {
      errorMessage = `UserService encountered an error: ${JSON.stringify(message)}`;
    } else {
      errorMessage = 'UserService encountered an error: '.concat(
        JSON.stringify(message)
      );
    }
    // When logging is setup, need to print this message to screen and the log.
    // console.info(errorMessage);
    return of(errorMessage);
  }
}
