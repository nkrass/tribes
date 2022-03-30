import {HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable, PLATFORM_ID} from '@angular/core';
import { BaseMemoryStorage } from '../shared/storage/storages/base-memory.storage';
import { BaseSessionStorage } from '../shared/storage/storages/base-session.storage';

// export const CachableRoutePatterns = {
// 	'/api/person/:id': true,
// 	'https://pokeapi.co/api/v2/pokemon': false
// };

abstract class HttpCache {
	abstract get(req: HttpRequest<any>): HttpResponse<any> | null;
	abstract put(req: HttpRequest<any>, res: HttpResponse<any>): void;
	abstract delete(req: HttpRequest<any>): boolean;
}

@Injectable({
	providedIn: 'root'
})
export class HttpCacheService implements HttpCache {
	// cachableRoutes = CachableRoutePatterns;
  baseStorage = new BaseSessionStorage(new BaseMemoryStorage(), PLATFORM_ID)
	constructor() {}

	/**
	 * Get an item from the cache
	 * @param req
	 */
	get(req: HttpRequest<any>) {
		const cachedItem = this.baseStorage.getItem(req.urlWithParams)
	  //this.cache[req.urlWithParams];
		if (cachedItem) {
			return JSON.parse(cachedItem);
		}
	}

	/**
	 * Put an item in the cache
	 * @param req
	 * @param res
	 */
	put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    this.baseStorage.setItem(req.urlWithParams, JSON.stringify(res))
    // setTimeout(() => { this.baseStorage.removeItem(req.urlWithParams) }, 1000 * 60 * 5)
		// const shouldCache = this.shouldCache(req.urlWithParams);

		// if (shouldCache && shouldCacheToSessionStorage) {
			// this.cacheToSessionStorage(req.urlWithParams, res);
		// }else if (shouldCache) {
			// this.cacheToLocal(req.urlWithParams, res);
		// }
	}

	/**
	 * Delete an item from the cache
	 * @param req
	 */
	delete(req: HttpRequest<any>): boolean {
		// const cachedRequest = this.get(req);
		// const shouldCacheToSessionStorage = this.shouldCacheToSessionStorage(req.urlWithParams);
		// let returnVal = false;
		// if (shouldCacheToSessionStorage && cachedRequest) {
		// 	LocalStorageService.removeItem(LocalStorageTypes.SESSION, req.urlWithParams);
		// 	returnVal = true;
		// }else if (cachedRequest) {
		// 	delete this.cache[req.urlWithParams];
		// 	returnVal = true;
		// }
		// return returnVal;
    this.baseStorage.removeItem(req.urlWithParams)
    return true
	}

	/**
	 * Determine if a url SHOULD be cached or not. It must match a route pattern provided in
	 * @link(CachableRoutePatterns)
	 *
	 * @param urlWithParams
	 */
	// shouldCache(urlWithParams: string) {
	// 	let shouldCache = false;
	// 	Object.keys(this.cachableRoutes).forEach((pattern) => {
	// 		const route = new Route(pattern);
	// 		const routeMatch = route.match(urlWithParams);
	// 		if (routeMatch) {
	// 			shouldCache = !!routeMatch;
	// 		}
	// 	});
	// 	return shouldCache;
	// }

	/**
	 * Place the response in the local `cache` variable
	 *
	 * @param urlWithParams
	 * @param res
	 */
	// cacheToLocal(urlWithParams: string, res: HttpResponse<any>) {
	// 	this.cache[urlWithParams] = res;
	// }
}