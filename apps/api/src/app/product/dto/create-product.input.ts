import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductCategory } from '../entities/types/product-category.enum';
import { ProductStatus } from '../entities/types/product.enum';
import { ExternalId } from '../entities/types/external-id.type';
import { Material } from '../entities/types/material.type';
import { Nomenclature } from '../entities/types/nomenclature.type';
import { ProductGender } from '../entities/types/product-gender.enum';
import { ProductRegion } from '../entities/types/product-region.enum';

@InputType()
@InterfaceType('BaseProduct', {})
export class CreateProductInput {
  @Field(() => ProductRegion, {nullable: false})
  region: ProductRegion;
  
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String)
  sku: string;

  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field()
  skuFamily: string;

  @IsNumber()
  @Field(() => Number)
  skuIndex: number
  
  @IsNumber()
  @Field(() => Number, {nullable: true})
  stock: number; //sum of barcode stock

  @IsString()
  @Field(() => String, {nullable: true})
  sizes: string; //format 42,42188,44,44170

  @IsOptional()
  @Field(() => Nomenclature, {nullable: true})
  nomenclature: Nomenclature

  @IsString()
  @Field(() => String, {nullable: true})
  title: string;

  @IsString()
  @Field(() => String, {nullable: true})
  titleFull: string;

  @Field(() => String, {nullable: true})
  description: string;

  @IsString()
  @Field(() => String, {nullable: true})
  descriptionSeo: string;

  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String, {nullable: true})
  color: string;
  
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String, {nullable: true})
  colorGroup: string;

  @IsArray()
  @Field(() => [Material], {nullable: true})
  materials: [Material];

  @IsNumber()
  @Field(() => Number, {nullable: true})
  priceBase: number;

  @IsNumber()
  @Field(() => Number, {nullable: true})
  priceSale: number;

  @IsString()
  @Field( () => ProductStatus, {nullable: true})
  status: ProductStatus;
  
  @IsString()
  @Field( () => ProductCategory, {nullable: true})
  category: ProductCategory;

  @IsString()
  @Field(() => ProductGender, {nullable: true})
  gender: ProductGender;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() =>  String, {nullable: true})
  tags: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String, {nullable: true})
  collection: string;

  @IsOptional()
  @Field(() => [String], {nullable: true})
  @IsArray()
  images: string[];

  @IsOptional()
  @Field(() => [String], {nullable: true})
  @IsArray()
  videos: string[];

  @IsOptional()
  @IsString()
  @Field(()=> Number, {nullable: true})
  orderIndex: number;

  @IsOptional()
  @IsArray()
  @Field(() => [ExternalId], {nullable: true})
  externalId: [ExternalId];

  @IsOptional()
  @IsArray()
  @Transform((e) => e.value?.map((s: string) => s?.toLowerCase()))
  @Field(() => [String], {nullable: true})
  crossSale: string[];

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
}
