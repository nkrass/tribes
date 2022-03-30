import { Injectable } from '@angular/core';
import {  pluck  } from 'rxjs';
import { CreateFeedbackGQL, FeedbackType } from '@tribes/data-access';

@Injectable()
export class FeedbackService {

  constructor(
    private feedbackGql: CreateFeedbackGQL){
  }
  public sendFeedback(name: string, purpose: FeedbackType, text: string, email: string){
    return this.feedbackGql.mutate({input: { name, purpose, text, email }}).pipe(pluck('data', 'createFeedback'))
  }
}