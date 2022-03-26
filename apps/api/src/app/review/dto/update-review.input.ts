import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateReviewInput {
  @IsUUID()
  @Field(() => String, {nullable: false})
  id: string;

  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  @Field(() => String, {nullable: true})
  sku: string;

  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  @Field(() => String, {nullable: true})
  skuFamily: string;

  @Field( () => String, {nullable: true})
  @IsNotEmpty()
  @IsString()
  reviewText: string;

  @Field( () => String, {nullable: true})
  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  reviewAuthor: string;

  @Field( () => Number, {nullable: true})
  @IsNotEmpty()
  @IsNumber()
  reviewRating: number;

  @Field( () => Date, {nullable: true})
  @IsNotEmpty()
  @IsDate()
  reviewDate: Date;
  
  @Field( () => String, { nullable: true })
  @IsOptional()
  @IsString()
  reviewAnswer: string;

  @Field( () => Boolean, {nullable: true})
  @IsBoolean()
  @IsOptional()
  visible: boolean;

  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  userId?: string
}
