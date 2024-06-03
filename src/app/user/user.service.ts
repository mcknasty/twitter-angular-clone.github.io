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

  constructor() {
    super('UserService encountered an error');
  }

  /** GET users from the server */
  getUsers(): Observable<GetUsersResponse> {
    return this.httpGet<GetUsersResponse>(this.userUrl);
  }

  /** GET user by id. Will 404 if id not found */
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getUser(id: string, success: Function): Promise<void> {
    const url = `${this.userUrl}/${id}`;
    this.httpGet<GetUserResponse>(url).subscribe((user) => {
      const User = user as UserRecord;
      if (UserRecord.instanceOf(User)) {
        success(User);
      }
      /** * /
      else if (typeof user === 'string') {
        // Todo: Something like this is what I want
        // throw new Error(JSON.stringify(User));
        // Settling for something like this
        console.error(User)
      }
      /** */
    });
  }
}
