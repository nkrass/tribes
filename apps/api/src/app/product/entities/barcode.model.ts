import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBarcodeInput } from '../dto/create-barcode.input';
import { ExternalId } from './types/external-id.type';
import { ProductCategory } from './types/product-category.enum';
import { ProductGender } from './types/product-gender.enum';
import { ProductRegion } from './types/product-region.enum';
import { ProductStatus } from './types/product.enum';

export type BarcodeKey = {
  barcode: string
};

@ObjectType()
export class Barcode extends CreateBarcodeInput {
  @Field(() => ProductRegion)
  region: ProductRegion

  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String)
  barcode: string;

  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String)
  sku: string;

  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String)
  skuFamily: string;

  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String)
  color: string;

  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String)
  colorGroup: string;

  @IsNumber()
  @Field(() => Number, {nullable: true})
  priceBase: number;

  @IsNumber()
  @Field(() => Number, {nullable: true})
  priceSale: number;

  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
  stock: number;
  
  @IsString()
  @Field(() => ProductGender)
  gender: ProductGender;

  @IsString()
  @Field( () => ProductCategory)
  category: ProductCategory;

  @IsString()
  @Field( () => ProductStatus )
  status: ProductStatus;

  @IsOptional()
  @IsArray()
  @Field(() => [ExternalId], {nullable: true})
  externalId: [ExternalId];

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() =>  String, {nullable: true})
  tags: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String, {nullable: true})
  manufactured: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String, {nullable: true})
  notes: string;
  
  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  createdAt: Date

  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  updatedAt: Date

  categoryGenderColorSize: string;
  categoryGenderSize: string;
  genderColorSize: string;
  genderSize: string;
  genderColor: string;
  categorySize: string;
  categoryGender: string;
}