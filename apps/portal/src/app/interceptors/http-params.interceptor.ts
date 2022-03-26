import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Strip out any `undefined` parameters in the query string.
 */
@Injectable()
export class StripUndefinedParams implements HttpInterceptor {

    /**
     * Iterate through query parameters and remove all those that are `undefined`.
     *
     * @param request The incoming request.
     * @param next The next handler.
     * @returns The handled request.
     */
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let params = request.params;
        for (const key of request.params.keys()) {
            if (params.get(key) === undefined) {
                params = params.delete(key, undefined);
            }
        }
        request = request.clone({ params });
        return next.handle(request);
    }
}