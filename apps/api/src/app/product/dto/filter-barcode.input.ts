import { Field, InputType, Int, InterfaceType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { ProductCategory } from '../entities/product-category.enum';
import { ProductGender } from '../entities/product-gender.enum';

@InputType()
@InterfaceType('GetBarcodeInput')
export class GetBarcodeInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  barcode: string;
  
}

@InputType()
@InterfaceType('BaseFilterPaginationInput' )
class LimitArgs {
  @IsOptional()
  @Field(() => Boolean, {nullable: true})
  all = false;

  @IsOptional()
  @Field(() => Int, {nullable: true})
  limit = 20;
}

@InputType()
@InterfaceType('FilterBarcodeInput')
export class FilterBarcodeInput extends LimitArgs{
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  barcode?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  sku?: string;

  @Field(() =>  String, { nullable: true })
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  skuFamily?: string;
  
  @Field(()=> ProductCategory, { nullable: true })
  @IsOptional()
  @IsString()
  category?: ProductCategory;

  @Field(()=> ProductGender, { nullable: true })
  @IsOptional()
  @IsString()
  gender?: ProductGender;
  @Field(()=> String, { nullable: true })
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  color?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, {nullable: true})
  priceMin?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, {nullable: true})
  priceMax?: number;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, {nullable: true})
  inStock?: boolean 

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @Field(()=> String, { nullable: true })
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  size?: string;

  @IsOptional()
  @IsNumber()
  @Field(()=> Number, {nullable: true})
  wildberriesId?: number;
}
