import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { MessageService } from '../messages/message.service';
import { Router } from '@angular/router';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(private messageService: MessageService, private router: Router,) { }
  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (serviceName = '', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      let message;
      if (error.error instanceof HttpErrorResponse) {
        message = error.message? error.message : error.error? error.error.message : 'Unknown error'
      }
      // else {
      //   `server returned code ${error[0]?.error_code}  ("${error[0]?.error_message})"`
      // }

      // TODO: better job of transforming error for user consumption
      this.messageService.add(`${serviceName} failed: ${message}`);

      // Let the app keep running by returning a safe result.
      this.router.navigate(['/404-product-not-found']);
      return of(result)
    };

  }
}