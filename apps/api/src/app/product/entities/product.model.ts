import { Field, ObjectType } from '@nestjs/graphql';
import { Review } from '../../review/entities/review.model';
import { ExternalId, Material, Nomenclature } from '../dto/create-product.input';
import { ProductCategory } from './product-category.enum';
import { ProductGender } from './product-gender.enum';
import { ProductStatus } from './product.enum';

export type ProductKey = {
  sku: string,
};

@ObjectType()
export class Product {

  @Field(() => String, {nullable: true})
  sku: string;

  @Field(() => String, {nullable: true})
  skuFamily: string;

  @Field(() => Number, {nullable: true})
  skuIndex: number

  @Field(() => Number, {nullable: true})
  stock: number; //sum of barcode stock

  @Field(() => String, {nullable: true})
  sizes: string; //format 42,42188,44,44170

  @Field(() => Nomenclature, {nullable: true})
  nomenclature: Nomenclature

  @Field(() => String, {nullable: true})
  title: string;

  @Field(() => String, {nullable: true})
  titleFull: string;

  @Field(() => String, {nullable: true})
  description: string;

  @Field(() => String, {nullable: true})
  descriptionSeo: string;

  @Field(() => String, {nullable: true})
  color: string;
  
  @Field(() => String, {nullable: true})
  colorGroup: string;

  @Field(() => [Material], {nullable: true})
  materials: [Material];

  @Field(() => Number, {nullable: true})
  priceBase: number;

  @Field(() => Number, {nullable: true})
  priceSale: number;

  @Field( () => ProductStatus, {nullable: true})
  status: ProductStatus;
  
  @Field( () => ProductCategory, {nullable: true})
  category: ProductCategory;

  @Field(() => ProductGender, {nullable: true})
  gender: ProductGender;

  @Field(() =>  String, {nullable: true})
  tags: string;

  @Field(() => String, {nullable: true})
  collection: string;

  @Field(() => [String], {nullable: true})
  images: [string];

  @Field(() => [String], {nullable: true})
  videos: [string];

  @Field(()=> Number, {nullable: true})
  wildberriesId: number;

  @Field(() => [ExternalId], {nullable: true})
  externalId: [ExternalId];

  @Field(() => [String], {nullable: true})
  crossSale: [string];

  @Field(() => String, {nullable: true})
  manufactured: string;

  @Field(() => String, {nullable: true})
  notes: string;

  @Field(() => [Review], { nullable: true })
  reviews?: Review[];

  @Field(() => Number, { nullable: true })
  rating?: number;
  
  @Field({nullable: true})
  createdAt: Date

  @Field({nullable: true})
  updatedAt: Date


  //indexes
  categoryGenderColor: string
  categoryGender: string
  categoryColor: string
  genderColor: string
  stockBySkuIndex: number
}

@ObjectType()
export class ProductDeleted {
  @Field({nullable: true})
  deletedAt: string;
}