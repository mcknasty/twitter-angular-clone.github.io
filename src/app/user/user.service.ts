import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AbstractHttpService,
  ServiceHttpError
} from '../abstracts/AbstractHttpService';
import { UserRecord } from '../model/User';

type GetUserResponse = UserRecord | ServiceHttpError;
type GetUsersResponse = UserRecord[] | ServiceHttpError;

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractHttpService {
  private userUrl = 'api/users'; // URL to web api

  constructor(http: HttpClient) {
    super(http, 'UserService encountered an error');
    this.getUsers();
  }

  /** GET users from the server */
  getUsers(): Observable<GetUsersResponse> {
    return this.httpGet<GetUsersResponse>(this.userUrl);
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: string): Observable<GetUserResponse> {
    const url = `${this.userUrl}/${id}`;
    return this.httpGet<GetUserResponse>(url);
  }
}
