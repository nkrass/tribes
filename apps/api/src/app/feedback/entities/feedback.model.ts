import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export type FeedbackKey = {
  id: string,
};

@ObjectType()
export class Feedback {
  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, {nullable: false})
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {nullable: true})
  text: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {nullable: true})
  name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {nullable: true})
  purpose: string;

  @IsOptional()
  @IsEmail()
  @Field(() => String, {nullable: true})
  email: string;

  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  userId: string;

  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  createdAt: Date

  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  updatedAt: Date
}