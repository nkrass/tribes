import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ExternalId } from '../entities/types/external-id.type';
import { Material } from '../entities/types/material.type';
import { Nomenclature } from '../entities/types/nomenclature.type';
import { ProductCategory } from '../entities/types/product-category.enum';
import { ProductGender } from '../entities/types/product-gender.enum';
import { ProductRegion } from '../entities/types/product-region.enum';
import { ProductStatus } from '../entities/types/product.enum';

@InputType()
export class UpdateProductInput {
  @Field(() => ProductRegion, {nullable: true})
  region?: ProductRegion;
  
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field({nullable: false})
  sku: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field({nullable: true})
  skuFamily: string;

  @IsOptional()
  @Field(() => Nomenclature, {nullable: false})
  nomenclature: Nomenclature

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  title: string;

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  titleFull: string;

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  description: string;

  @IsOptional()
  @IsString()
  @Field({nullable: true})
  descriptionSeo: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field({nullable: true})
  color: string;
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field({nullable: true})
  colorGroup: string;

  @IsOptional()
  @IsArray()
  @Field(() => [Material], { nullable: true, })
  materials: [Material];

  @IsOptional()
  @IsNumber()
  @Field({nullable: true})
  priceBase: number;

  @IsOptional()
  @IsNumber()
  @Field({nullable: true})
  priceSale: number;

  @IsOptional()
  @IsString()
  @Field( () => ProductStatus, {nullable: true})
  status: ProductStatus;
  
  @IsOptional()
  @IsString()
  @Field( () => ProductCategory, {nullable: true})
  category: ProductCategory;

  @IsOptional()
  @IsString()
  @Field(() => ProductGender, {nullable: true})
  gender: ProductGender;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field({nullable: true})
  tags: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field({nullable: true})
  collection: string;

  @IsOptional()
  @Field(() => [String], { nullable: true})
  @IsArray()
  images: string[];

  @IsOptional()
  @Field(() => [String], { nullable: true})
  @IsArray()
  videos: string[];

  @IsOptional()
  @IsString()
  @Field(() => Number, {nullable: true})
  orderIndex: number;

  @IsOptional()
  @IsArray()
  @Transform((s) => s.value?.map((e: ExternalId)=> e.id?.toLowerCase()))
  @Field(() => [ExternalId], {nullable: true})
  externalId: [ExternalId];

  @IsOptional()
  @IsArray()
  @Transform((s) => s.value?.map((e: string)=> e?.toLowerCase()))
  @Field(() => [String], {nullable: true})
  crossSale: string[];

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field({nullable: true})
  manufactured: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field({nullable: true})
  notes: string;
}
