
import { Injectable } from '@angular/core';
import { Observable, of, throwError, catchError, switchMap, retry } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { MessageService } from '../../messages/message.service';


import { Product, ProductResponse } from '../../../../api/components/product/product.model';

import { HttpClient, HttpParams } from '@angular/common/http';
import { ESortingBehaviour } from './ui.service';
import { HttpErrorHandler } from '../../shared/http-error-handler.service';
import { environment } from '../../../../src/environments/environment';

import { IProductsResponse, ProductsResponse } from '../../../../api/components/products/products.interface';
import { ProductReview, ProductReviewsResponse } from '../../../../api/components/reviews/review.model'

interface IProductRequest {
  page?: string|number
  limit?: string|number
  sort?: string
  category?: string 
  gender?: string
  by_model?: number
  q?: string|string[]
  [k: string]: any
}
class ProductRequest {
  page?: string|number = 1
  limit?: string|number = 12
  sort = ESortingBehaviour.date_desc
  category?: string 
  gender?: string
  by_model?: number
  q?: string
  [k: string]: any
  constructor(data: IProductRequest){
    Object.keys(data).reduce((acc, cv) => { if (data[cv]) this[cv] = data[cv]; return this }, this)
  }
  get params(){
    return Object.keys(this).reduce((params, cv) => { params = params.append(cv, this[cv]); return params}, new HttpParams())
  }
}

@Injectable()
export class ProductService {
  constructor(
    private messageService: MessageService,
    public authService: AuthService,
    private httpClient: HttpClient,
    private handleError: HttpErrorHandler
  ) {
  }

  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ProductService: ' + message);
  }
  
  public getProducts(opts: IProductRequest): Observable<IProductsResponse>{
    const options = new ProductRequest(opts)
    const params = options.params
    return this.httpClient.get<ProductsResponse>(environment.apiUrl+"products", { params })
      .pipe(
        retry(3), 
        switchMap( (p) => {
          if (!p.data) return throwError(p.errors)
          const res = (p.data)
          res.products = res.products.map(_ => new Product(_))
          return of(res)
        }),
        catchError(this.handleError.handleError<IProductsResponse>('getProducts'))
      );
  }
  public getProductReviews(sku: string){
    return this.httpClient
      .get<ProductReviewsResponse>(environment.apiUrl+"reviews/sku/" + sku)
      .pipe(
        retry(3), 
        switchMap( (p) => {
          if (!p.data) return throwError(p.errors)
          return of(p.data.map(e => new ProductReview(e)))
        }),
        catchError(this.handleError.handleError<ProductReview[]>('getProductReviews'))
      );
  }


  public getProduct(sku: string): Observable<Product> {
    return this.httpClient
      .get<ProductResponse>(environment.apiUrl+"product/" + sku)
      .pipe(
        retry(3), 
        switchMap( (p) => {
          if (!p.data) return throwError(p.errors)
          return of(new Product(p.data))
        }),
        catchError(this.handleError.handleError<Product>('getProducts'))
      );
  }

  public findProducts(q: string) {
    return this.getProducts({ q })
  }

  public updateProduct(data: { product: Product; files: FileList }) {
    if (!data.files.length) {
      return this.updateProductWithoutNewImage(data.product, '');
    }

    return of(null)
  }

  private updateProductWithoutNewImage(product: Product, url: string) {
    // const dbOperation = this.angularFireDatabase
    //   .object<Product>(url)
    //   .update(product)
    //   .then((response) => {
    //     this.log(`Updated Product ${product.name}`);
    //     return product;
    //   })
    //   .catch((error) => {
    //     this.handleError(error);
    //     return error;
    //   });
    // return fromPromise(dbOperation);
    return of(null)
  }

  public addProduct(data: { product: Product; files: FileList }) {
    // const dbOperation = this.uploadService
    //   .startUpload(data)
    //   .then((task) => {
    //     data.product.imageURLs.push(task.downloadURL);
    //     data.product.imageRefs.push(task.ref.fullPath);

    //     return this.angularFireDatabase
    //       .list('products')
    //       .set(data.product.id.toString(), data.product);
    //   }, (error) => error)
    //   .then((response) => {
    //     this.log(`Added Product ${data.product.name}`);
    //     return data.product;
    //   })
    //   .catch((error) => {
    //     this.messageService.addError(
    //       `Add Failed, Product ${data.product.name}`
    //     );
    //     this.handleError(error);
    //     return error;
    //   });
    // return fromPromise(dbOperation);
    return of(null)
  }

  public deleteProduct(product: Product) {
    // const url = `${this.productsUrl}/${product.id}`;

    // this.uploadService.deleteFile(product.imageRefs);

    // return this.angularFireDatabase
    //   .object<Product>(url)
    //   .remove()
    //   .then(() => this.log('success deleting' + product.name))
    //   .catch((error) => {
    //     this.messageService.addError('Delete failed ' + product.name);
    //     this.handleError('delete product');
    //   });
    return of(null)
  }
}
