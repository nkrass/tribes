import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['String'];
  user?: Maybe<User>;
};

export type Barcode = {
  __typename?: 'Barcode';
  barcode: Scalars['String'];
  category?: Maybe<ProductCategory>;
  collection?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  colorGroup?: Maybe<Scalars['String']>;
  coverImage: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  crossSale?: Maybe<Array<Scalars['String']>>;
  description?: Maybe<Scalars['String']>;
  descriptionSeo?: Maybe<Scalars['String']>;
  externalId?: Maybe<Array<ExternalId>>;
  gender?: Maybe<ProductGender>;
  images?: Maybe<Array<Scalars['String']>>;
  imagesSrc: Array<Scalars['String']>;
  manufactured?: Maybe<Scalars['String']>;
  materials?: Maybe<Array<MaterialType>>;
  nomenclature?: Maybe<Nomenclature>;
  notes?: Maybe<Scalars['String']>;
  priceBase?: Maybe<Scalars['Float']>;
  priceSale?: Maybe<Scalars['Float']>;
  product: Product;
  rating: Scalars['Float'];
  reviews: Array<Review>;
  size: Scalars['String'];
  sku: Scalars['String'];
  skuFamily: Scalars['String'];
  status?: Maybe<ProductStatus>;
  stock: Scalars['Float'];
  tags?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleFull?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  videos?: Maybe<Array<Scalars['String']>>;
  videosSrc: Array<Scalars['String']>;
  wildberriesId?: Maybe<Scalars['Float']>;
};

export type BaseCartItemsInput = {
  barcode?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  exchangeRate?: InputMaybe<Scalars['Float']>;
  price?: InputMaybe<Scalars['Float']>;
  quantity?: InputMaybe<Scalars['Float']>;
};

export type BaseExternalCodeProvider = {
  code: Scalars['String'];
  provider: Scalars['String'];
};

export type BaseExternalCodeProviderInput = {
  code: Scalars['String'];
  provider: Scalars['String'];
};

export type BaseItem = {
  external?: Maybe<Array<ExternalCodeProvider>>;
  externalRusCode?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  productBarcode: Scalars['String'];
  registered?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
};

export type BaseOrder = {
  currency: Scalars['String'];
  deliveryInfo?: Maybe<Scalars['String']>;
  payment?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  productBarcode: Scalars['String'];
  promocodeId?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  status: OrderStatus;
  userId: Scalars['String'];
};

export type Cart = {
  __typename?: 'Cart';
  cartItems: Array<CartItems>;
  count?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Date']>;
  externalUserId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastKey?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  status: CartStatus;
  totalAmount: Scalars['Float'];
  totalItemsCount: Scalars['Float'];
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
};

export type CartItems = {
  __typename?: 'CartItems';
  barcode?: Maybe<Barcode>;
  currency?: Maybe<Scalars['String']>;
  exchangeRate?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Float']>;
};

export enum CartStatus {
  Closed = 'closed',
  Left = 'left',
  Open = 'open'
}

export type Category = {
  __typename?: 'Category';
  barcodesCount?: Maybe<Scalars['Float']>;
  coverImage?: Maybe<Scalars['String']>;
  gender?: Maybe<ProductGender>;
  name?: Maybe<ProductCategory>;
  products: Array<Product>;
  productsCount?: Maybe<Scalars['Float']>;
};

export type CreateBarcodeInput = {
  barcode: Scalars['String'];
  category?: InputMaybe<ProductCategory>;
  collection?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  colorGroup?: InputMaybe<Scalars['String']>;
  crossSale?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  descriptionSeo?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Array<ExternalIdInput>>;
  gender?: InputMaybe<ProductGender>;
  images?: InputMaybe<Array<Scalars['String']>>;
  manufactured?: InputMaybe<Scalars['String']>;
  materials?: InputMaybe<Array<MaterialInput>>;
  nomenclature?: InputMaybe<NomenclatureInput>;
  notes?: InputMaybe<Scalars['String']>;
  priceBase?: InputMaybe<Scalars['Float']>;
  priceSale?: InputMaybe<Scalars['Float']>;
  size: Scalars['String'];
  sku: Scalars['String'];
  skuFamily: Scalars['String'];
  status?: InputMaybe<ProductStatus>;
  stock: Scalars['Float'];
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleFull?: InputMaybe<Scalars['String']>;
  videos?: InputMaybe<Array<Scalars['String']>>;
  wildberriesId?: InputMaybe<Scalars['Float']>;
};

export type CreateCartInput = {
  externalUserId?: InputMaybe<Scalars['String']>;
  items: Array<BaseCartItemsInput>;
  status: CartStatus;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateFeedbackInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  purpose?: InputMaybe<FeedbackType>;
  text?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateItemInput = {
  external?: InputMaybe<Array<ExternalCodeProviderInput>>;
  externalRusCode?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  productBarcode: Scalars['String'];
  registered?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateOrderInput = {
  currency: Scalars['String'];
  deliveryInfo?: InputMaybe<Scalars['String']>;
  payment?: InputMaybe<Scalars['String']>;
  price: Scalars['Float'];
  productBarcode: Scalars['String'];
  promocodeId?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Float'];
  status: OrderStatus;
  userId: Scalars['String'];
};

export type CreateProductInput = {
  category?: InputMaybe<ProductCategory>;
  collection?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  colorGroup?: InputMaybe<Scalars['String']>;
  crossSale?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  descriptionSeo?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Array<ExternalIdInput>>;
  gender?: InputMaybe<ProductGender>;
  images?: InputMaybe<Array<Scalars['String']>>;
  manufactured?: InputMaybe<Scalars['String']>;
  materials?: InputMaybe<Array<MaterialInput>>;
  nomenclature?: InputMaybe<NomenclatureInput>;
  notes?: InputMaybe<Scalars['String']>;
  priceBase?: InputMaybe<Scalars['Float']>;
  priceSale?: InputMaybe<Scalars['Float']>;
  sizes?: InputMaybe<Scalars['String']>;
  sku: Scalars['String'];
  skuFamily: Scalars['String'];
  skuIndex: Scalars['Float'];
  status?: InputMaybe<ProductStatus>;
  stock?: InputMaybe<Scalars['Float']>;
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleFull?: InputMaybe<Scalars['String']>;
  videos?: InputMaybe<Array<Scalars['String']>>;
  wildberriesId?: InputMaybe<Scalars['Float']>;
};

export type CreateReviewInput = {
  promoRating?: InputMaybe<Scalars['String']>;
  reviewAnswer?: InputMaybe<Scalars['String']>;
  reviewAuthor: Scalars['String'];
  reviewDate: Scalars['Date'];
  reviewRating: Scalars['Float'];
  reviewText: Scalars['String'];
  sku: Scalars['String'];
  skuFamily: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['Int']>;
  userRole?: InputMaybe<UserRole>;
};

export type ExternalCodeProvider = BaseExternalCodeProvider & {
  __typename?: 'ExternalCodeProvider';
  code: Scalars['String'];
  provider: Scalars['String'];
};

export type ExternalCodeProviderInput = {
  code: Scalars['String'];
  provider: Scalars['String'];
};

export type ExternalId = {
  __typename?: 'ExternalId';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ExternalIdInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Feedback = {
  __typename?: 'Feedback';
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  purpose?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
};

export enum FeedbackType {
  Business = 'business',
  General = 'general',
  Marketing = 'marketing',
  Product = 'product',
  Public = 'public',
  Quality = 'quality'
}

export type FilterBarcodeInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  barcode?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<ProductCategory>;
  color?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<ProductGender>;
  inStock?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  priceMax?: InputMaybe<Scalars['Float']>;
  priceMin?: InputMaybe<Scalars['Float']>;
  size?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  skuFamily?: InputMaybe<Scalars['String']>;
  stock?: InputMaybe<Scalars['Float']>;
  wildberriesId?: InputMaybe<Scalars['Float']>;
};

export type FilterCartInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  externalUserId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  orderId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<CartStatus>;
  userId?: InputMaybe<Scalars['String']>;
};

export type FilterFeedbackInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  purpose?: InputMaybe<FeedbackType>;
};

export type FilterItemInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  externalRusCode?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  productBarcode?: InputMaybe<Scalars['String']>;
};

export type FilterOrderInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  productBarcode?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type FilterProductInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<ProductCategory>;
  collection?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<ProductGender>;
  inStock?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  priceMax?: InputMaybe<Scalars['Float']>;
  priceMin?: InputMaybe<Scalars['Float']>;
  size?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  skuFamily?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  wildberriesId?: InputMaybe<Scalars['Float']>;
};

export type FilterReviewInput = {
  all?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  promoRating?: InputMaybe<Scalars['String']>;
  reviewDate?: InputMaybe<Scalars['Date']>;
  reviewRating?: InputMaybe<Scalars['Float']>;
  sku?: InputMaybe<Scalars['String']>;
  skuFamily?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

export type GetBarcodeInput = {
  barcode: Scalars['String'];
};

export type GetCartInput = {
  id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type GetFeedbackInput = {
  id: Scalars['String'];
};

export type GetItemInput = {
  id: Scalars['String'];
};

export type GetOrderInput = {
  id: Scalars['String'];
};

export type GetProductInput = {
  sku: Scalars['String'];
};

export type Item = BaseItem & {
  __typename?: 'Item';
  barcode?: Maybe<Barcode>;
  count?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Date']>;
  external?: Maybe<Array<ExternalCodeProvider>>;
  externalRusCode?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastKey?: Maybe<Scalars['String']>;
  product?: Maybe<Product>;
  productBarcode: Scalars['String'];
  registered?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
};

export type LoginAuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MaterialInput = {
  material?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Float']>;
};

export type MaterialType = {
  __typename?: 'MaterialType';
  material?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBarcode: Barcode;
  createCart: Cart;
  createFeedback: Feedback;
  createItem: Item;
  createOrder: Order;
  createProduct: Product;
  createReview: Review;
  createUser: User;
  deleteBarcode?: Maybe<Barcode>;
  deleteCart?: Maybe<Cart>;
  deleteFeedback?: Maybe<Feedback>;
  deleteItem?: Maybe<Item>;
  deleteProduct?: Maybe<Product>;
  deleteReview?: Maybe<Review>;
  login: Auth;
  processBarcodes: Array<Barcode>;
  processProducts: Array<Product>;
  processReviews: Array<Review>;
  register: Auth;
  removeUser: User;
  updateBarcode: Barcode;
  updateCart: Cart;
  updateFeedback: Feedback;
  updateItem: Item;
  updateOrder: Order;
  updateProduct: Product;
  updateReview: Review;
  updateUser: User;
};


export type MutationCreateBarcodeArgs = {
  input: CreateBarcodeInput;
};


export type MutationCreateCartArgs = {
  input: CreateCartInput;
};


export type MutationCreateFeedbackArgs = {
  input: CreateFeedbackInput;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBarcodeArgs = {
  input: UpdateBarcodeInput;
};


export type MutationDeleteCartArgs = {
  input: UpdateCartInput;
};


export type MutationDeleteFeedbackArgs = {
  input: UpdateFeedbackInput;
};


export type MutationDeleteItemArgs = {
  input: UpdateItemInput;
};


export type MutationDeleteProductArgs = {
  input: UpdateProductInput;
};


export type MutationDeleteReviewArgs = {
  input: UpdateReviewInput;
};


export type MutationLoginArgs = {
  input: LoginAuthInput;
};


export type MutationProcessBarcodesArgs = {
  input: Scalars['Boolean'];
};


export type MutationProcessProductsArgs = {
  input: Scalars['Boolean'];
};


export type MutationProcessReviewsArgs = {
  input: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  input: RegisterAuthInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['String'];
};


export type MutationUpdateBarcodeArgs = {
  input: UpdateBarcodeInput;
};


export type MutationUpdateCartArgs = {
  input: UpdateCartInput;
};


export type MutationUpdateFeedbackArgs = {
  input: UpdateFeedbackInput;
};


export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
};


export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Nomenclature = {
  __typename?: 'Nomenclature';
  cost?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  tnvd?: Maybe<Scalars['String']>;
};

export type NomenclatureInput = {
  cost?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  tnvd?: InputMaybe<Scalars['String']>;
};

export type Order = BaseOrder & {
  __typename?: 'Order';
  barcode?: Maybe<Barcode>;
  createdAt?: Maybe<Scalars['Date']>;
  currency: Scalars['String'];
  deliveryInfo?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  payment?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  product?: Maybe<Product>;
  productBarcode: Scalars['String'];
  promocodeId?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  status: OrderStatus;
  updatedAt?: Maybe<Scalars['Date']>;
  userId: Scalars['String'];
};

export enum OrderStatus {
  Cancelled = 'cancelled',
  Confirmed = 'confirmed',
  Delivering = 'delivering',
  Done = 'done',
  New = 'new',
  Processing = 'processing',
  Returned = 'returned',
  Returning = 'returning'
}

export type Product = {
  __typename?: 'Product';
  barcodes: Array<Barcode>;
  category?: Maybe<ProductCategory>;
  collection?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  colorGroup?: Maybe<Scalars['String']>;
  coverImage: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  crossSale?: Maybe<Array<Scalars['String']>>;
  crossSaleProducts?: Maybe<Array<Product>>;
  description?: Maybe<Scalars['String']>;
  descriptionSeo?: Maybe<Scalars['String']>;
  externalId?: Maybe<Array<ExternalId>>;
  gender?: Maybe<ProductGender>;
  images?: Maybe<Array<Scalars['String']>>;
  imagesSrc: Array<Scalars['String']>;
  manufactured?: Maybe<Scalars['String']>;
  materials?: Maybe<Array<MaterialType>>;
  nomenclature?: Maybe<Nomenclature>;
  notes?: Maybe<Scalars['String']>;
  priceBase?: Maybe<Scalars['Float']>;
  priceSale?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
  reviews?: Maybe<Array<Review>>;
  sizes?: Maybe<Scalars['String']>;
  sku?: Maybe<Scalars['String']>;
  skuFamily?: Maybe<Scalars['String']>;
  skuIndex?: Maybe<Scalars['Float']>;
  status?: Maybe<ProductStatus>;
  stock?: Maybe<Scalars['Float']>;
  tags?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleFull?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  variants: Array<Product>;
  videos?: Maybe<Array<Scalars['String']>>;
  videosSrc: Array<Scalars['String']>;
  wildberriesId?: Maybe<Scalars['Float']>;
};

export enum ProductCategory {
  Blouses = 'blouses',
  Costumes = 'costumes',
  Dresses = 'dresses',
  Hoodies = 'hoodies',
  Jackets = 'jackets',
  Shorts = 'shorts',
  Skirts = 'skirts',
  Sundresses = 'sundresses',
  Sweaters = 'sweaters',
  Tops = 'tops',
  Trousers = 'trousers',
  Tshirts = 'tshirts',
  Turtlenecks = 'turtlenecks',
  Unset = 'unset'
}

export enum ProductGender {
  Men = 'men',
  Unisex = 'unisex',
  Unset = 'unset',
  Women = 'women'
}

export enum ProductStatus {
  Available = 'available',
  Deleted = 'deleted',
  Draft = 'draft',
  Soldout = 'soldout'
}

export type Query = {
  __typename?: 'Query';
  barcode: Barcode;
  barcodes: Array<Barcode>;
  cart: Cart;
  carts: Array<Cart>;
  categories: Array<Category>;
  category: Category;
  feedback: Feedback;
  feedbacks: Array<Feedback>;
  item: Item;
  items: Array<Item>;
  me: User;
  order: Order;
  orders: Array<Order>;
  product: Product;
  products: Array<Product>;
  review: Review;
  reviews: Array<Review>;
  user: User;
};


export type QueryBarcodeArgs = {
  input: GetBarcodeInput;
};


export type QueryBarcodesArgs = {
  input: FilterBarcodeInput;
};


export type QueryCartArgs = {
  input: GetCartInput;
};


export type QueryCartsArgs = {
  input: FilterCartInput;
};


export type QueryCategoriesArgs = {
  gender?: InputMaybe<ProductGender>;
};


export type QueryCategoryArgs = {
  gender?: InputMaybe<ProductGender>;
  name: ProductCategory;
};


export type QueryFeedbackArgs = {
  input: GetFeedbackInput;
};


export type QueryFeedbacksArgs = {
  input: FilterFeedbackInput;
};


export type QueryItemArgs = {
  input: GetItemInput;
};


export type QueryItemsArgs = {
  input: FilterItemInput;
};


export type QueryOrderArgs = {
  input: GetOrderInput;
};


export type QueryOrdersArgs = {
  input: FilterOrderInput;
};


export type QueryProductArgs = {
  input: GetProductInput;
};


export type QueryProductsArgs = {
  input: FilterProductInput;
};


export type QueryReviewArgs = {
  id: Scalars['String'];
};


export type QueryReviewsArgs = {
  input: FilterReviewInput;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type RegisterAuthInput = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['Int']>;
};

export type Review = {
  __typename?: 'Review';
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['String']>;
  product: Product;
  promoRating?: Maybe<Scalars['String']>;
  reviewAnswer?: Maybe<Scalars['String']>;
  reviewAuthor: Scalars['String'];
  reviewDate: Scalars['Date'];
  reviewRating: Scalars['Float'];
  reviewText: Scalars['String'];
  sku: Scalars['String'];
  skuFamily: Scalars['String'];
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
  visible?: Maybe<Scalars['Boolean']>;
};

export type UpdateBarcodeInput = {
  barcode: Scalars['String'];
  category?: InputMaybe<ProductCategory>;
  collection?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  colorGroup?: InputMaybe<Scalars['String']>;
  crossSale?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  descriptionSeo?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Array<ExternalIdInput>>;
  gender?: InputMaybe<ProductGender>;
  images?: InputMaybe<Array<Scalars['String']>>;
  manufactured?: InputMaybe<Scalars['String']>;
  materials?: InputMaybe<Array<MaterialInput>>;
  nomenclature?: InputMaybe<NomenclatureInput>;
  notes?: InputMaybe<Scalars['String']>;
  priceBase?: InputMaybe<Scalars['Float']>;
  priceSale?: InputMaybe<Scalars['Float']>;
  size: Scalars['String'];
  sku: Scalars['String'];
  skuFamily: Scalars['String'];
  status?: InputMaybe<ProductStatus>;
  stock: Scalars['Float'];
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleFull?: InputMaybe<Scalars['String']>;
  videos?: InputMaybe<Array<Scalars['String']>>;
  wildberriesId?: InputMaybe<Scalars['Float']>;
};

export type UpdateCartInput = {
  externalUserId?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  items?: InputMaybe<Array<BaseCartItemsInput>>;
  orderId?: InputMaybe<Scalars['String']>;
  status: CartStatus;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateFeedbackInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  purpose?: InputMaybe<FeedbackType>;
  text?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateItemInput = {
  external?: InputMaybe<Array<BaseExternalCodeProviderInput>>;
  externalRusCode?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  productBarcode?: InputMaybe<Scalars['String']>;
  registered?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateOrderInput = {
  currency?: InputMaybe<Scalars['String']>;
  deliveryInfo?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  payment?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  productBarcode?: InputMaybe<Scalars['String']>;
  promocodeId?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<OrderStatus>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateProductInput = {
  category?: InputMaybe<ProductCategory>;
  collection?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  colorGroup?: InputMaybe<Scalars['String']>;
  crossSale?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  descriptionSeo?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Array<ExternalIdInput>>;
  gender?: InputMaybe<ProductGender>;
  images?: InputMaybe<Array<Scalars['String']>>;
  manufactured?: InputMaybe<Scalars['String']>;
  materials?: InputMaybe<Array<MaterialInput>>;
  nomenclature: NomenclatureInput;
  notes?: InputMaybe<Scalars['String']>;
  priceBase?: InputMaybe<Scalars['Float']>;
  priceSale?: InputMaybe<Scalars['Float']>;
  sku?: InputMaybe<Scalars['String']>;
  skuFamily?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ProductStatus>;
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  titleFull?: InputMaybe<Scalars['String']>;
  videos?: InputMaybe<Array<Scalars['String']>>;
  wildberriesId?: InputMaybe<Scalars['Float']>;
};

export type UpdateReviewInput = {
  id: Scalars['String'];
  promoRating?: InputMaybe<Scalars['String']>;
  reviewAnswer?: InputMaybe<Scalars['String']>;
  reviewAuthor?: InputMaybe<Scalars['String']>;
  reviewDate?: InputMaybe<Scalars['Date']>;
  reviewRating?: InputMaybe<Scalars['Float']>;
  reviewText?: InputMaybe<Scalars['String']>;
  sku?: InputMaybe<Scalars['String']>;
  skuFamily?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  userRole?: InputMaybe<UserRole>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userRole?: Maybe<Scalars['String']>;
};

export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user'
}

export type BarcodeQueryVariables = Exact<{
  input: GetBarcodeInput;
}>;


export type BarcodeQuery = { __typename?: 'Query', barcode: { __typename?: 'Barcode', barcode: string, sku: string, stock: number, size: string, coverImage: string, category?: ProductCategory | null, product: { __typename?: 'Product', sku?: string | null, color?: string | null, title?: string | null, category?: ProductCategory | null, coverImage: string, priceBase?: number | null, priceSale?: number | null } } };

export type CartFilterQueryVariables = Exact<{
  input: GetCartInput;
}>;


export type CartFilterQuery = { __typename?: 'Query', cart: { __typename?: 'Cart', id: string, userId?: string | null, orderId?: string | null, status: CartStatus, externalUserId?: string | null, createdAt?: any | null, updatedAt?: any | null, totalAmount: number, totalItemsCount: number, cartItems: Array<{ __typename?: 'CartItems', price?: number | null, quantity?: number | null, currency?: string | null, barcode?: { __typename?: 'Barcode', barcode: string, coverImage: string, title?: string | null, sku: string, category?: ProductCategory | null, priceBase?: number | null, priceSale?: number | null, stock: number, size: string } | null }> } };

export type CartQueryVariables = Exact<{
  input: GetCartInput;
}>;


export type CartQuery = { __typename?: 'Query', cart: { __typename?: 'Cart', id: string, userId?: string | null, orderId?: string | null, status: CartStatus, externalUserId?: string | null, totalAmount: number, totalItemsCount: number, createdAt?: any | null, updatedAt?: any | null, cartItems: Array<{ __typename?: 'CartItems', price?: number | null, quantity?: number | null, currency?: string | null, barcode?: { __typename?: 'Barcode', barcode: string, coverImage: string, title?: string | null, sku: string, category?: ProductCategory | null, priceBase?: number | null, priceSale?: number | null, stock: number, size: string } | null }> } };

export type CategoriesListQueryVariables = Exact<{
  gender?: InputMaybe<ProductGender>;
}>;


export type CategoriesListQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', name?: ProductCategory | null }> };

export type CreateCartMutationVariables = Exact<{
  input: CreateCartInput;
}>;


export type CreateCartMutation = { __typename?: 'Mutation', createCart: { __typename?: 'Cart', id: string, userId?: string | null, orderId?: string | null, status: CartStatus, externalUserId?: string | null, totalAmount: number, totalItemsCount: number, createdAt?: any | null, updatedAt?: any | null, cartItems: Array<{ __typename?: 'CartItems', price?: number | null, quantity?: number | null, currency?: string | null, barcode?: { __typename?: 'Barcode', barcode: string, coverImage: string, title?: string | null, sku: string, category?: ProductCategory | null, priceBase?: number | null, priceSale?: number | null, stock: number, size: string } | null }> } };

export type CreateFeedbackMutationVariables = Exact<{
  input: CreateFeedbackInput;
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createFeedback: { __typename?: 'Feedback', id: string, text?: string | null, name?: string | null, purpose?: string | null, email?: string | null, userId?: string | null, createdAt?: any | null } };

export type CreateItemMutationVariables = Exact<{
  input: CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: string, productBarcode: string, registered?: boolean | null, barcode?: { __typename?: 'Barcode', barcode: string, stock: number, size: string, product: { __typename?: 'Product', sku?: string | null, title?: string | null, coverImage: string, imagesSrc: Array<string>, videosSrc: Array<string>, description?: string | null, sizes?: string | null, category?: ProductCategory | null, priceBase?: number | null, priceSale?: number | null, color?: string | null, rating?: number | null, reviews?: Array<{ __typename?: 'Review', sku: string, reviewText: string, reviewAuthor: string, reviewRating: number, reviewDate: any, id?: string | null }> | null, variants: Array<{ __typename?: 'Product', sku?: string | null, colorGroup?: string | null, coverImage: string, title?: string | null, priceBase?: number | null, priceSale?: number | null, color?: string | null }>, materials?: Array<{ __typename?: 'MaterialType', material?: string | null, quantity?: number | null }> | null } } | null } };

export type LoginUserMutationVariables = Exact<{
  input: LoginAuthInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', token: string, user?: { __typename?: 'User', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, userRole?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type ProductQueryVariables = Exact<{
  input: GetProductInput;
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', sku?: string | null, title?: string | null, titleFull?: string | null, description?: string | null, descriptionSeo?: string | null, color?: string | null, colorGroup?: string | null, priceBase?: number | null, priceSale?: number | null, stock?: number | null, status?: ProductStatus | null, category?: ProductCategory | null, gender?: ProductGender | null, tags?: string | null, collection?: string | null, wildberriesId?: number | null, manufactured?: string | null, notes?: string | null, rating?: number | null, createdAt?: any | null, updatedAt?: any | null, coverImage: string, imagesSrc: Array<string>, videosSrc: Array<string>, sizes?: string | null, nomenclature?: { __typename?: 'Nomenclature', tnvd?: string | null } | null, materials?: Array<{ __typename?: 'MaterialType', material?: string | null, quantity?: number | null }> | null, crossSaleProducts?: Array<{ __typename?: 'Product', sku?: string | null, coverImage: string, title?: string | null }> | null, barcodes: Array<{ __typename?: 'Barcode', barcode: string, coverImage: string, title?: string | null, sku: string, category?: ProductCategory | null, priceBase?: number | null, priceSale?: number | null, stock: number, size: string }>, variants: Array<{ __typename?: 'Product', sku?: string | null, colorGroup?: string | null, coverImage: string, title?: string | null, priceBase?: number | null, priceSale?: number | null, color?: string | null }>, reviews?: Array<{ __typename?: 'Review', sku: string, reviewText: string, reviewAuthor: string, reviewRating: number, reviewDate: any, id?: string | null, skuFamily: string, product: { __typename?: 'Product', coverImage: string } }> | null } };

export type ProductsListQueryVariables = Exact<{
  input: FilterProductInput;
}>;


export type ProductsListQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', sku?: string | null, skuFamily?: string | null, title?: string | null, titleFull?: string | null, description?: string | null, descriptionSeo?: string | null, color?: string | null, priceBase?: number | null, priceSale?: number | null, stock?: number | null, status?: ProductStatus | null, category?: ProductCategory | null, gender?: ProductGender | null, tags?: string | null, collection?: string | null, videos?: Array<string> | null, wildberriesId?: number | null, crossSale?: Array<string> | null, manufactured?: string | null, notes?: string | null, rating?: number | null, createdAt?: any | null, updatedAt?: any | null, coverImage: string, imagesSrc: Array<string>, sizes?: string | null, nomenclature?: { __typename?: 'Nomenclature', tnvd?: string | null } | null, materials?: Array<{ __typename?: 'MaterialType', material?: string | null, quantity?: number | null }> | null, barcodes: Array<{ __typename?: 'Barcode', size: string, stock: number }> }> };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterAuthInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'Auth', token: string, user?: { __typename?: 'User', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, userRole?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type ReviewsListQueryVariables = Exact<{
  input: FilterReviewInput;
}>;


export type ReviewsListQuery = { __typename?: 'Query', reviews: Array<{ __typename?: 'Review', id?: string | null, sku: string, skuFamily: string, reviewAuthor: string, reviewText: string, reviewDate: any, reviewRating: number, reviewAnswer?: string | null, createdAt?: any | null, product: { __typename?: 'Product', sku?: string | null, coverImage: string } }> };

export type UpdateCartMutationVariables = Exact<{
  input: UpdateCartInput;
}>;


export type UpdateCartMutation = { __typename?: 'Mutation', updateCart: { __typename?: 'Cart', id: string, userId?: string | null, orderId?: string | null, status: CartStatus, externalUserId?: string | null, totalAmount: number, totalItemsCount: number, createdAt?: any | null, updatedAt?: any | null, cartItems: Array<{ __typename?: 'CartItems', price?: number | null, quantity?: number | null, currency?: string | null, barcode?: { __typename?: 'Barcode', barcode: string, coverImage: string, title?: string | null, sku: string, category?: ProductCategory | null, priceBase?: number | null, priceSale?: number | null, stock: number, size: string } | null }> } };

export type UserQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, email?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, userRole?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export const BarcodeDocument = gql`
    query Barcode($input: GetBarcodeInput!) {
  barcode(input: $input) {
    barcode
    sku
    stock
    size
    coverImage
    category
    product {
      sku
      color
      title
      category
      coverImage
      priceBase
      priceSale
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BarcodeGQL extends Apollo.Query<BarcodeQuery, BarcodeQueryVariables> {
    override document = BarcodeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CartFilterDocument = gql`
    query CartFilter($input: GetCartInput!) {
  cart(input: $input) {
    id
    userId
    orderId
    status
    externalUserId
    createdAt
    updatedAt
    cartItems {
      barcode {
        barcode
        coverImage
        title
        sku
        category
        priceBase
        priceSale
        stock
        size
      }
      price
      quantity
      currency
    }
    totalAmount
    totalItemsCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CartFilterGQL extends Apollo.Query<CartFilterQuery, CartFilterQueryVariables> {
    override document = CartFilterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CartDocument = gql`
    query Cart($input: GetCartInput!) {
  cart(input: $input) {
    id
    userId
    orderId
    status
    externalUserId
    cartItems {
      barcode {
        barcode
        coverImage
        title
        sku
        category
        priceBase
        priceSale
        stock
        size
      }
      price
      quantity
      currency
    }
    totalAmount
    totalItemsCount
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CartGQL extends Apollo.Query<CartQuery, CartQueryVariables> {
    override document = CartDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CategoriesListDocument = gql`
    query CategoriesList($gender: ProductGender) {
  categories(gender: $gender) {
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CategoriesListGQL extends Apollo.Query<CategoriesListQuery, CategoriesListQueryVariables> {
    override document = CategoriesListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateCartDocument = gql`
    mutation CreateCart($input: CreateCartInput!) {
  createCart(input: $input) {
    id
    userId
    orderId
    status
    externalUserId
    cartItems {
      barcode {
        barcode
        coverImage
        title
        sku
        category
        priceBase
        priceSale
        stock
        size
      }
      price
      quantity
      currency
    }
    totalAmount
    totalItemsCount
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateCartGQL extends Apollo.Mutation<CreateCartMutation, CreateCartMutationVariables> {
    override document = CreateCartDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateFeedbackDocument = gql`
    mutation CreateFeedback($input: CreateFeedbackInput!) {
  createFeedback(input: $input) {
    id
    text
    name
    purpose
    email
    userId
    createdAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateFeedbackGQL extends Apollo.Mutation<CreateFeedbackMutation, CreateFeedbackMutationVariables> {
    override document = CreateFeedbackDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateItemDocument = gql`
    mutation CreateItem($input: CreateItemInput!) {
  createItem(input: $input) {
    id
    productBarcode
    registered
    barcode {
      barcode
      stock
      size
      product {
        sku
        title
        coverImage
        imagesSrc
        videosSrc
        description
        sizes
        category
        priceBase
        priceSale
        color
        rating
        reviews {
          sku
          reviewText
          reviewAuthor
          reviewRating
          reviewDate
          id
        }
        variants {
          sku
          colorGroup
          coverImage
          title
          priceBase
          priceSale
          color
        }
        materials {
          material
          quantity
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateItemGQL extends Apollo.Mutation<CreateItemMutation, CreateItemMutationVariables> {
    override document = CreateItemDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginUserDocument = gql`
    mutation LoginUser($input: LoginAuthInput!) {
  login(input: $input) {
    token
    user {
      id
      email
      firstName
      lastName
      phone
      userRole
      createdAt
      updatedAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginUserGQL extends Apollo.Mutation<LoginUserMutation, LoginUserMutationVariables> {
    override document = LoginUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProductDocument = gql`
    query Product($input: GetProductInput!) {
  product(input: $input) {
    sku
    nomenclature {
      tnvd
    }
    title
    titleFull
    description
    descriptionSeo
    color
    colorGroup
    materials {
      material
      quantity
    }
    priceBase
    priceSale
    stock
    status
    category
    gender
    tags
    collection
    wildberriesId
    crossSaleProducts {
      sku
      coverImage
      title
    }
    manufactured
    notes
    rating
    barcodes {
      barcode
      coverImage
      title
      sku
      category
      priceBase
      priceSale
      stock
      size
    }
    createdAt
    updatedAt
    coverImage
    imagesSrc
    videosSrc
    sizes
    variants {
      sku
      colorGroup
      coverImage
      title
      priceBase
      priceSale
      color
    }
    reviews {
      sku
      reviewText
      reviewAuthor
      reviewRating
      reviewDate
      id
      product {
        coverImage
      }
      skuFamily
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProductGQL extends Apollo.Query<ProductQuery, ProductQueryVariables> {
    override document = ProductDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProductsListDocument = gql`
    query ProductsList($input: FilterProductInput!) {
  products(input: $input) {
    sku
    skuFamily
    nomenclature {
      tnvd
    }
    title
    titleFull
    description
    descriptionSeo
    color
    materials {
      material
      quantity
    }
    priceBase
    priceSale
    stock
    status
    category
    gender
    tags
    collection
    videos
    wildberriesId
    crossSale
    manufactured
    notes
    rating
    barcodes {
      size
      stock
    }
    createdAt
    updatedAt
    coverImage
    imagesSrc
    sizes
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProductsListGQL extends Apollo.Query<ProductsListQuery, ProductsListQueryVariables> {
    override document = ProductsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: RegisterAuthInput!) {
  register(input: $input) {
    token
    user {
      id
      email
      firstName
      lastName
      phone
      userRole
      createdAt
      updatedAt
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterUserGQL extends Apollo.Mutation<RegisterUserMutation, RegisterUserMutationVariables> {
    override document = RegisterUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ReviewsListDocument = gql`
    query ReviewsList($input: FilterReviewInput!) {
  reviews(input: $input) {
    id
    sku
    skuFamily
    reviewAuthor
    reviewText
    reviewDate
    reviewRating
    reviewAnswer
    createdAt
    product {
      sku
      coverImage
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ReviewsListGQL extends Apollo.Query<ReviewsListQuery, ReviewsListQueryVariables> {
    override document = ReviewsListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateCartDocument = gql`
    mutation UpdateCart($input: UpdateCartInput!) {
  updateCart(input: $input) {
    id
    userId
    orderId
    status
    externalUserId
    cartItems {
      barcode {
        barcode
        coverImage
        title
        sku
        category
        priceBase
        priceSale
        stock
        size
      }
      price
      quantity
      currency
    }
    totalAmount
    totalItemsCount
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateCartGQL extends Apollo.Mutation<UpdateCartMutation, UpdateCartMutationVariables> {
    override document = UpdateCartDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserDocument = gql`
    query User($input: String!) {
  user(id: $input) {
    id
    email
    firstName
    lastName
    phone
    userRole
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    override document = UserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export type AuthKeySpecifier = ('token' | 'user' | AuthKeySpecifier)[];
export type AuthFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BarcodeKeySpecifier = ('barcode' | 'category' | 'collection' | 'color' | 'colorGroup' | 'coverImage' | 'createdAt' | 'crossSale' | 'description' | 'descriptionSeo' | 'externalId' | 'gender' | 'images' | 'imagesSrc' | 'manufactured' | 'materials' | 'nomenclature' | 'notes' | 'priceBase' | 'priceSale' | 'product' | 'rating' | 'reviews' | 'size' | 'sku' | 'skuFamily' | 'status' | 'stock' | 'tags' | 'title' | 'titleFull' | 'updatedAt' | 'videos' | 'videosSrc' | 'wildberriesId' | BarcodeKeySpecifier)[];
export type BarcodeFieldPolicy = {
	barcode?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	color?: FieldPolicy<any> | FieldReadFunction<any>,
	colorGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	coverImage?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	crossSale?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	descriptionSeo?: FieldPolicy<any> | FieldReadFunction<any>,
	externalId?: FieldPolicy<any> | FieldReadFunction<any>,
	gender?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>,
	imagesSrc?: FieldPolicy<any> | FieldReadFunction<any>,
	manufactured?: FieldPolicy<any> | FieldReadFunction<any>,
	materials?: FieldPolicy<any> | FieldReadFunction<any>,
	nomenclature?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	priceBase?: FieldPolicy<any> | FieldReadFunction<any>,
	priceSale?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	rating?: FieldPolicy<any> | FieldReadFunction<any>,
	reviews?: FieldPolicy<any> | FieldReadFunction<any>,
	size?: FieldPolicy<any> | FieldReadFunction<any>,
	sku?: FieldPolicy<any> | FieldReadFunction<any>,
	skuFamily?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	stock?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	titleFull?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	videos?: FieldPolicy<any> | FieldReadFunction<any>,
	videosSrc?: FieldPolicy<any> | FieldReadFunction<any>,
	wildberriesId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BaseExternalCodeProviderKeySpecifier = ('code' | 'provider' | BaseExternalCodeProviderKeySpecifier)[];
export type BaseExternalCodeProviderFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	provider?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BaseItemKeySpecifier = ('external' | 'externalRusCode' | 'id' | 'productBarcode' | 'registered' | 'userId' | BaseItemKeySpecifier)[];
export type BaseItemFieldPolicy = {
	external?: FieldPolicy<any> | FieldReadFunction<any>,
	externalRusCode?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	productBarcode?: FieldPolicy<any> | FieldReadFunction<any>,
	registered?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BaseOrderKeySpecifier = ('currency' | 'deliveryInfo' | 'payment' | 'price' | 'productBarcode' | 'promocodeId' | 'quantity' | 'status' | 'userId' | BaseOrderKeySpecifier)[];
export type BaseOrderFieldPolicy = {
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	deliveryInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	payment?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	productBarcode?: FieldPolicy<any> | FieldReadFunction<any>,
	promocodeId?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartKeySpecifier = ('cartItems' | 'count' | 'createdAt' | 'externalUserId' | 'id' | 'lastKey' | 'orderId' | 'status' | 'totalAmount' | 'totalItemsCount' | 'updatedAt' | 'userId' | CartKeySpecifier)[];
export type CartFieldPolicy = {
	cartItems?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	externalUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastKey?: FieldPolicy<any> | FieldReadFunction<any>,
	orderId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	totalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	totalItemsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartItemsKeySpecifier = ('barcode' | 'currency' | 'exchangeRate' | 'price' | 'quantity' | CartItemsKeySpecifier)[];
export type CartItemsFieldPolicy = {
	barcode?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	exchangeRate?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CategoryKeySpecifier = ('barcodesCount' | 'coverImage' | 'gender' | 'name' | 'products' | 'productsCount' | CategoryKeySpecifier)[];
export type CategoryFieldPolicy = {
	barcodesCount?: FieldPolicy<any> | FieldReadFunction<any>,
	coverImage?: FieldPolicy<any> | FieldReadFunction<any>,
	gender?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	products?: FieldPolicy<any> | FieldReadFunction<any>,
	productsCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExternalCodeProviderKeySpecifier = ('code' | 'provider' | ExternalCodeProviderKeySpecifier)[];
export type ExternalCodeProviderFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	provider?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExternalIdKeySpecifier = ('id' | 'name' | ExternalIdKeySpecifier)[];
export type ExternalIdFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FeedbackKeySpecifier = ('createdAt' | 'email' | 'id' | 'name' | 'purpose' | 'text' | 'updatedAt' | 'userId' | FeedbackKeySpecifier)[];
export type FeedbackFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	purpose?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ItemKeySpecifier = ('barcode' | 'count' | 'createdAt' | 'external' | 'externalRusCode' | 'id' | 'lastKey' | 'product' | 'productBarcode' | 'registered' | 'updatedAt' | 'userId' | ItemKeySpecifier)[];
export type ItemFieldPolicy = {
	barcode?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	external?: FieldPolicy<any> | FieldReadFunction<any>,
	externalRusCode?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastKey?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	productBarcode?: FieldPolicy<any> | FieldReadFunction<any>,
	registered?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MaterialTypeKeySpecifier = ('material' | 'quantity' | MaterialTypeKeySpecifier)[];
export type MaterialTypeFieldPolicy = {
	material?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createBarcode' | 'createCart' | 'createFeedback' | 'createItem' | 'createOrder' | 'createProduct' | 'createReview' | 'createUser' | 'deleteBarcode' | 'deleteCart' | 'deleteFeedback' | 'deleteItem' | 'deleteProduct' | 'deleteReview' | 'login' | 'processBarcodes' | 'processProducts' | 'processReviews' | 'register' | 'removeUser' | 'updateBarcode' | 'updateCart' | 'updateFeedback' | 'updateItem' | 'updateOrder' | 'updateProduct' | 'updateReview' | 'updateUser' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createBarcode?: FieldPolicy<any> | FieldReadFunction<any>,
	createCart?: FieldPolicy<any> | FieldReadFunction<any>,
	createFeedback?: FieldPolicy<any> | FieldReadFunction<any>,
	createItem?: FieldPolicy<any> | FieldReadFunction<any>,
	createOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	createProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	createReview?: FieldPolicy<any> | FieldReadFunction<any>,
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteBarcode?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteCart?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteFeedback?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteItem?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteReview?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	processBarcodes?: FieldPolicy<any> | FieldReadFunction<any>,
	processProducts?: FieldPolicy<any> | FieldReadFunction<any>,
	processReviews?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	removeUser?: FieldPolicy<any> | FieldReadFunction<any>,
	updateBarcode?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCart?: FieldPolicy<any> | FieldReadFunction<any>,
	updateFeedback?: FieldPolicy<any> | FieldReadFunction<any>,
	updateItem?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	updateProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	updateReview?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NomenclatureKeySpecifier = ('cost' | 'name' | 'price' | 'tnvd' | NomenclatureKeySpecifier)[];
export type NomenclatureFieldPolicy = {
	cost?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	tnvd?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderKeySpecifier = ('barcode' | 'createdAt' | 'currency' | 'deliveryInfo' | 'id' | 'payment' | 'price' | 'product' | 'productBarcode' | 'promocodeId' | 'quantity' | 'status' | 'updatedAt' | 'userId' | OrderKeySpecifier)[];
export type OrderFieldPolicy = {
	barcode?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	deliveryInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	payment?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	productBarcode?: FieldPolicy<any> | FieldReadFunction<any>,
	promocodeId?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductKeySpecifier = ('barcodes' | 'category' | 'collection' | 'color' | 'colorGroup' | 'coverImage' | 'createdAt' | 'crossSale' | 'crossSaleProducts' | 'description' | 'descriptionSeo' | 'externalId' | 'gender' | 'images' | 'imagesSrc' | 'manufactured' | 'materials' | 'nomenclature' | 'notes' | 'priceBase' | 'priceSale' | 'rating' | 'reviews' | 'sizes' | 'sku' | 'skuFamily' | 'skuIndex' | 'status' | 'stock' | 'tags' | 'title' | 'titleFull' | 'updatedAt' | 'variants' | 'videos' | 'videosSrc' | 'wildberriesId' | ProductKeySpecifier)[];
export type ProductFieldPolicy = {
	barcodes?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	color?: FieldPolicy<any> | FieldReadFunction<any>,
	colorGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	coverImage?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	crossSale?: FieldPolicy<any> | FieldReadFunction<any>,
	crossSaleProducts?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	descriptionSeo?: FieldPolicy<any> | FieldReadFunction<any>,
	externalId?: FieldPolicy<any> | FieldReadFunction<any>,
	gender?: FieldPolicy<any> | FieldReadFunction<any>,
	images?: FieldPolicy<any> | FieldReadFunction<any>,
	imagesSrc?: FieldPolicy<any> | FieldReadFunction<any>,
	manufactured?: FieldPolicy<any> | FieldReadFunction<any>,
	materials?: FieldPolicy<any> | FieldReadFunction<any>,
	nomenclature?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	priceBase?: FieldPolicy<any> | FieldReadFunction<any>,
	priceSale?: FieldPolicy<any> | FieldReadFunction<any>,
	rating?: FieldPolicy<any> | FieldReadFunction<any>,
	reviews?: FieldPolicy<any> | FieldReadFunction<any>,
	sizes?: FieldPolicy<any> | FieldReadFunction<any>,
	sku?: FieldPolicy<any> | FieldReadFunction<any>,
	skuFamily?: FieldPolicy<any> | FieldReadFunction<any>,
	skuIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	stock?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	titleFull?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	variants?: FieldPolicy<any> | FieldReadFunction<any>,
	videos?: FieldPolicy<any> | FieldReadFunction<any>,
	videosSrc?: FieldPolicy<any> | FieldReadFunction<any>,
	wildberriesId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('barcode' | 'barcodes' | 'cart' | 'carts' | 'categories' | 'category' | 'feedback' | 'feedbacks' | 'item' | 'items' | 'me' | 'order' | 'orders' | 'product' | 'products' | 'review' | 'reviews' | 'user' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	barcode?: FieldPolicy<any> | FieldReadFunction<any>,
	barcodes?: FieldPolicy<any> | FieldReadFunction<any>,
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	carts?: FieldPolicy<any> | FieldReadFunction<any>,
	categories?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	feedback?: FieldPolicy<any> | FieldReadFunction<any>,
	feedbacks?: FieldPolicy<any> | FieldReadFunction<any>,
	item?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>,
	orders?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	products?: FieldPolicy<any> | FieldReadFunction<any>,
	review?: FieldPolicy<any> | FieldReadFunction<any>,
	reviews?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReviewKeySpecifier = ('createdAt' | 'id' | 'product' | 'promoRating' | 'reviewAnswer' | 'reviewAuthor' | 'reviewDate' | 'reviewRating' | 'reviewText' | 'sku' | 'skuFamily' | 'updatedAt' | 'userId' | 'visible' | ReviewKeySpecifier)[];
export type ReviewFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	promoRating?: FieldPolicy<any> | FieldReadFunction<any>,
	reviewAnswer?: FieldPolicy<any> | FieldReadFunction<any>,
	reviewAuthor?: FieldPolicy<any> | FieldReadFunction<any>,
	reviewDate?: FieldPolicy<any> | FieldReadFunction<any>,
	reviewRating?: FieldPolicy<any> | FieldReadFunction<any>,
	reviewText?: FieldPolicy<any> | FieldReadFunction<any>,
	sku?: FieldPolicy<any> | FieldReadFunction<any>,
	skuFamily?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	visible?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('createdAt' | 'email' | 'firstName' | 'id' | 'lastName' | 'phone' | 'updatedAt' | 'userRole' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userRole?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Auth?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthKeySpecifier | (() => undefined | AuthKeySpecifier),
		fields?: AuthFieldPolicy,
	},
	Barcode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BarcodeKeySpecifier | (() => undefined | BarcodeKeySpecifier),
		fields?: BarcodeFieldPolicy,
	},
	BaseExternalCodeProvider?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BaseExternalCodeProviderKeySpecifier | (() => undefined | BaseExternalCodeProviderKeySpecifier),
		fields?: BaseExternalCodeProviderFieldPolicy,
	},
	BaseItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BaseItemKeySpecifier | (() => undefined | BaseItemKeySpecifier),
		fields?: BaseItemFieldPolicy,
	},
	BaseOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BaseOrderKeySpecifier | (() => undefined | BaseOrderKeySpecifier),
		fields?: BaseOrderFieldPolicy,
	},
	Cart?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartKeySpecifier | (() => undefined | CartKeySpecifier),
		fields?: CartFieldPolicy,
	},
	CartItems?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartItemsKeySpecifier | (() => undefined | CartItemsKeySpecifier),
		fields?: CartItemsFieldPolicy,
	},
	Category?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CategoryKeySpecifier | (() => undefined | CategoryKeySpecifier),
		fields?: CategoryFieldPolicy,
	},
	ExternalCodeProvider?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExternalCodeProviderKeySpecifier | (() => undefined | ExternalCodeProviderKeySpecifier),
		fields?: ExternalCodeProviderFieldPolicy,
	},
	ExternalId?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExternalIdKeySpecifier | (() => undefined | ExternalIdKeySpecifier),
		fields?: ExternalIdFieldPolicy,
	},
	Feedback?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FeedbackKeySpecifier | (() => undefined | FeedbackKeySpecifier),
		fields?: FeedbackFieldPolicy,
	},
	Item?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemKeySpecifier | (() => undefined | ItemKeySpecifier),
		fields?: ItemFieldPolicy,
	},
	MaterialType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MaterialTypeKeySpecifier | (() => undefined | MaterialTypeKeySpecifier),
		fields?: MaterialTypeFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Nomenclature?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NomenclatureKeySpecifier | (() => undefined | NomenclatureKeySpecifier),
		fields?: NomenclatureFieldPolicy,
	},
	Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderKeySpecifier | (() => undefined | OrderKeySpecifier),
		fields?: OrderFieldPolicy,
	},
	Product?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductKeySpecifier | (() => undefined | ProductKeySpecifier),
		fields?: ProductFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Review?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReviewKeySpecifier | (() => undefined | ReviewKeySpecifier),
		fields?: ReviewFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;