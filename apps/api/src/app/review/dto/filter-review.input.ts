import { Field, InputType, Int, InterfaceType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString, IsDate, IsNumber, IsBoolean, IsOptional, IsUUID } from 'class-validator';

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
@InterfaceType('FilterReviewInput')
export class FilterReviewInput extends LimitArgs{
  @IsOptional()
  @IsUUID()
  @Transform((s) => s.value.toLowerCase())
  @Field(() => String, {nullable: true})
  id: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  @Field(() => String, {nullable: true})
  sku: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  @Field(() => String, {nullable: true})
  skuFamily: string;

  @IsOptional()
  @IsNumber()
  @Field( () => Number, {nullable: true})
  reviewRating: number;

  @IsOptional()
  @IsDate()
  @Field( () => Date, {nullable: true})
  reviewDate: Date;
  
  @IsBoolean()
  @IsOptional()
  @Field( () => Boolean, {nullable: true})
  visible: boolean;

  @IsString()
  @IsOptional()
  @Field( () => String, {nullable: true})
  promoRating: string;
  // @IsOptional()
  // @IsNumber()
  // @Field( () => Number, {nullable: true})
  // reviewRatingMin: number;

  // @IsOptional()
  // @IsNumber()
  // @Field( () => Number, {nullable: true})
  // reviewRatingMax: number;

  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  userId?: string
}
