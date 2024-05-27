import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

type ServiceHttpError = HttpErrorResponse | string;

class AbstractHttpService {
  private appendableErrorString: string;
  private http: HttpClient;

  constructor(http: HttpClient, errorPrefix: string) {
    this.http = http;
    this.appendableErrorString = errorPrefix;
  }

  protected setAppendableErrorString(error: string) {
    this.appendableErrorString = error;
  }

  public httpGet<T>(url: string): Observable<T | ServiceHttpError> {
    return this.http.get<T>(url).pipe(
      catchError((error) => {
        return this.handleError(error);
      })
    );
  }

  public httpPost<T, U>(url: string, obj: U): Observable<T | ServiceHttpError> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content Type': 'application/json' })
    };

    return this.http.post<T>(url, obj, httpOptions).pipe(
      catchError((error) => {
        return this.handleError(error);
      })
    );
  }

  public throwError(message: ServiceHttpError) {
    return this.handleError(message);
  }

  private handleError(message: ServiceHttpError) {
    let errorMessage: string;
    if (message instanceof HttpErrorResponse) {
      errorMessage = `${this.appendableErrorString}: ${JSON.stringify(message)}`;
    } else {
      errorMessage = `${this.appendableErrorString}: `.concat(
        JSON.stringify(message)
      );
    }
    // When logging is setup, need to print this message to screen and the log.
    return of(errorMessage);
  }
}

export { AbstractHttpService, ServiceHttpError };
