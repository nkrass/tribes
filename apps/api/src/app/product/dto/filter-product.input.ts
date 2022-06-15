import { Field, InputType, Int, InterfaceType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ProductCategory } from '../entities/types/product-category.enum';
import { ProductGender } from '../entities/types/product-gender.enum';
import { ProductRegion } from '../entities/types/product-region.enum';

@InputType()
@InterfaceType('GetProductInput')
export class GetProductInput {
  @Field(() => String, { nullable: false })
  @IsString()
  sku: string;
}

@InputType()
@InterfaceType('BaseFilterPaginationInput' )
class LimitArgs {
  @IsOptional()
  @Field(() => Boolean, {nullable: true})
  all = false;

  @IsOptional()
  @Field(() => Int, {nullable: true})
  limit = 200;
}

@InputType()
@InterfaceType('FilterProductInput')
export class FilterProductInput extends LimitArgs{
  @Field(()=> ProductRegion, { nullable: false })
  region: ProductRegion;

  @Field(()=> String, { nullable: true })
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  sku?: string;

  @Field(()=> String, { nullable: true })
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  skuFamily?: string;
  
  @Field(()=> ProductCategory, { nullable: true })
  @IsOptional()
  @IsString()
  category?: ProductCategory;

  @Field(()=> ProductGender,{ nullable: true })
  @IsOptional()
  @IsString()
  gender?: ProductGender;

  @Field(()=> String, { nullable: true })
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  collection?: string;

  @Field(()=> String, { nullable: true })
  @IsOptional()
  @IsString()
  size?: string;

  @Field(()=> String, { nullable: true })
  @IsOptional()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  tags?: string;

  @Field(()=> String, { nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(()=> String, { nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field(()=> String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  priceMin?: number;
  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  priceMax?: number;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  inStock?: boolean;
  // @Field({ nullable: true })
  // @IsOptional()
  // @IsString()
  // @Transform((s) => s.value?.toLowerCase())
  // size?: string;

  @IsOptional()
  @IsNumber()
  @Field(()=> Number, {nullable: true})
  orderIndex?: number;
}
