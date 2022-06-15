import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { ProductCategory } from './types/product-category.enum';
import { ProductGender } from './types/product-gender.enum';
import { ProductRegion } from './types/product-region.enum';

export type BarcodeKey = {
  barcode: string
};

@ObjectType("Category")
export class Category {
  @Field(() => ProductCategory, { nullable: false })
  region: ProductRegion;

  @Field(() => ProductCategory, { nullable: true })
  name: ProductCategory;

  @Field(() => ProductGender, { nullable: true })
  gender?: ProductGender;

  @Field(() => String, { nullable: true })
  coverImage?: string;

  // @IsOptional()
  // @Field(() => [Barcode], {nullable: true})
  // barcodes: Barcode

  @IsOptional()
  @Field(() => Number, {nullable: true})
  barcodesCount: number

  // @IsOptional()
  // @Field(() => [Product], {nullable: true})
  // products: number

  @IsOptional()
  @Field(() => Number, {nullable: true})
  productsCount: number
}