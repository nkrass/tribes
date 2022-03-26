import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
@InterfaceType('BaseReview', {})
export class CreateReviewInput {
  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  @Field()
  sku: string;

  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  @Field()
  skuFamily: string;

  @Field( () => String)
  @IsNotEmpty()
  @IsString()
  reviewText: string;

  @Field( () => String)
  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  reviewAuthor: string;

  @Field( () => Number)
  @IsNotEmpty()
  @IsNumber()
  reviewRating: number;

  @Field( () => Date)
  @IsNotEmpty()
  @IsDate()
  reviewDate: Date;
  
  @Field( () => String, { nullable: true })
  @IsOptional()
  @IsString()
  reviewAnswer: string;

  @Field( () => Boolean, {nullable: true, defaultValue: true})
  @IsBoolean()
  @IsOptional()
  visible: boolean;
  
  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  userId?: string
}
