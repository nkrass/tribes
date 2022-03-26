import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductCategory } from '../entities/product-category.enum';
import { ProductGender } from '../entities/product-gender.enum';
import { ProductStatus } from '../entities/product.enum';
// import { IsEnum, IsIn } from 'class-validator';
import { ExternalId, Nomenclature, Material } from './create-product.input';

@InputType()
export class UpdateProductInput {
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field({nullable: true})
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
  images: [string];

  @IsOptional()
  @Field(() => [String], { nullable: true})
  @IsArray()
  videos: [string];

  @IsOptional()
  @IsString()
  @Field(() => Number, {nullable: true})
  wildberriesId: number;

  @IsOptional()
  @IsArray()
  @Transform((s) => s.value?.map((e: ExternalId)=> e.id?.toLowerCase()))
  @Field(() => [ExternalId], {nullable: true})
  externalId: [ExternalId];

  @IsOptional()
  @IsArray()
  @Transform((s) => s.value?.map((e: string)=> e?.toLowerCase()))
  @Field(() => [String], {nullable: true})
  crossSale: [string];

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
