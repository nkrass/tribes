import { Injectable } from '@angular/core';

import { catchError, map, Observable, of, retry, switchMap, throwError } from 'rxjs';

import { ReviewModel } from '../../models/review.model';
import { environment } from '../../../../src/environments/environment'
import { resizedImgUrl } from '../../../../api/utils';
import { ProductReview, ProductReviewsResponse } from '../../../../api/components/reviews/review.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from 'app/shared/http-error-handler.service';
const staticAssetsUrl = environment.staticAssetsUrl

@Injectable()
export class ReviewService {
  public staticAssetsUrl: string = staticAssetsUrl
  public reviews: ProductReview[] = [];
  constructor(
    private httpClient: HttpClient,
    private handleError: HttpErrorHandler
  ){}
  
  getReviews(): Observable<ProductReview[]> {
    return this.httpClient
      .get<ProductReviewsResponse>(environment.apiUrl+"reviews", {params: {take: 20, rating_min: 5 }})
      .pipe(
        retry(3), 
        switchMap( (p) => {
          if (!p.data) return throwError(p.errors)
          return of(p.data.map(e => new ProductReview(e)))
        }),
        catchError(this.handleError.handleError<ProductReview[]>('getProductReviews'))
      );
  }
}
