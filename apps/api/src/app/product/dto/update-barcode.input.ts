import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductCategory } from '../entities/types/product-category.enum';
import { ProductStatus } from '../entities/types/product.enum';
import { ExternalId } from '../entities/types/external-id.type';
import { ProductGender } from '../entities/types/product-gender.enum';
import { ProductRegion } from '../entities/types/product-region.enum';

@InputType()
export class UpdateBarcodeInput {
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  @Field(() => String)
  barcode: string;

  @IsString()
  @Field(() => ProductRegion)
  region: ProductRegion

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
}
