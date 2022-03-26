import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductCategory } from '../entities/product-category.enum';
import { ProductGender } from '../entities/product-gender.enum';
import { ProductStatus } from '../entities/product.enum';
import { ExternalId, Nomenclature, Material } from './create-product.input';

@InputType()
@InterfaceType('BaseBarcode')
export class CreateBarcodeInput {
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String)
  barcode: string;

  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field()
  sku: string;

  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field()
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
  @Field()
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
  @Transform((s) => s.value?.toLowerCase())
  @Field()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number)
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
