import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { ProductCategory } from './product-category.enum';
import { ProductGender } from './product-gender.enum';
// import { Barcode } from './barcode.model';
// import { Product } from './product.model';
// import { Product } from './product.model';

export type BarcodeKey = {
  barcode: string
};

@ObjectType("Category")
export class Category {
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