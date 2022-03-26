import { Field, InputType, InterfaceType, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductCategory } from '../entities/product-category.enum';
import { ProductGender } from '../entities/product-gender.enum';
import { ProductStatus } from '../entities/product.enum';


@ObjectType('MaterialType')
@InputType('MaterialInput')
export class Material {
  @Field( () => String, {nullable: true})
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  material: string;

  @Field( () => Number, {nullable: true})
  @IsNumber()
  quantity: number;
}

@ObjectType('ExternalId')
@InputType('ExternalIdInput')
export class ExternalId {
  @Field(() => String, {nullable: true})
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  name: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  id: string;
}
@InputType("NomenclatureInput")
@ObjectType("Nomenclature")
export class Nomenclature {
  @IsString()
  @Field(() => String, {nullable: true})
  name: string
  @IsString()
  @Field(() => String, {nullable: true})
  tnvd: string
  @IsNumber()
  @Field(() => Number, {nullable: true})
  cost: number
  @IsNumber()
  @Field(() => Number, {nullable: true})
  price: number
}
@InputType()
@InterfaceType('BaseProduct', {})
export class CreateProductInput {
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
  images: [string];

  @IsOptional()
  @Field(() => [String], {nullable: true})
  @IsArray()
  videos: [string];

  @IsOptional()
  @IsString()
  @Field(()=> Number, {nullable: true})
  wildberriesId: number;

  @IsOptional()
  @IsArray()
  @Field(() => [ExternalId], {nullable: true})
  externalId: [ExternalId];

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
