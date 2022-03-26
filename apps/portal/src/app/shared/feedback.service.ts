import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { FeedbackResponse } from '../../../api/components/feedback/feedback.interface';
import { environment } from '../../../src/environments/environment';
import { retry, switchMap, catchError, throwError, of  } from 'rxjs';

@Injectable()
export class FeedbackService {

  constructor(
    private http: HttpClient,
    private handleError: HttpErrorHandler){
  }
  public sendFeedback(customer_name: string, contact_purpose: string, feedback: string, email: string){
    return this.http.post<FeedbackResponse>(environment.apiUrl + "feedback", {
      customer_name, contact_purpose, feedback, email, date: new Date().toString()
    }).pipe(
      retry(3), 
      switchMap( (p) => {
        if (!p.data) return throwError(p.errors)
        return of(p.data)
      }),
      catchError(this.handleError.handleError<FeedbackResponse>('sendFeedback'))
    );
  }
}