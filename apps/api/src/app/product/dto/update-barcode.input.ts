import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductCategory } from '../entities/product-category.enum';
import { ProductGender } from '../entities/product-gender.enum';
import { ProductStatus } from '../entities/product.enum';
// import { IsEnum, IsIn } from 'class-validator';
import { ExternalId, Material, Nomenclature } from './create-product.input';

@InputType()
export class UpdateBarcodeInput {
  @IsNotEmpty()
  @IsString()
  @Field(()=> String, {nullable: false})
  barcode: string;

  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(()=> String, {nullable: false})
  sku: string;

  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(()=> String, {nullable: false})
  skuFamily: string;

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
  @IsString()
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

  @IsNotEmpty()
  @IsString()
  @Field(()=> String, {nullable: false})
  size: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number, {nullable: false})
  stock: number;
  
  @IsString()
  @Field(() => ProductGender, {nullable: true})
  gender: ProductGender;

  @IsString()
  @Field( () => ProductCategory, {nullable: true})
  category: ProductCategory;

  @IsString()
  @Field( () => ProductStatus, {nullable: true})
  status: ProductStatus;

  @IsOptional()
  @IsString()
  @Field(()=> Number, {nullable: true})
  wildberriesId: number;

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
  collection: string;

  @IsOptional()
  @Field(() => [String], {nullable: true})
  @IsArray()
  images: [string];

  @IsOptional()
  @Field(() => [String], {nullable: true})
  @IsArray()
  videos: [string];

  @IsOptional()
  @IsArray()
  @Transform((e) => e.value?.map((s: string) => s?.toLowerCase()))
  @Field(() => [String], {nullable: true})
  crossSale: [string];

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
