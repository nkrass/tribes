import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { FeedbackType } from './create-feedback.input';

@InputType()
export class UpdateFeedbackInput {
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
  @Field(() => FeedbackType, {nullable: true})
  purpose: FeedbackType;

  @IsOptional()
  @IsEmail()
  @Field(() => String, {nullable: true})
  email: string;

  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  userId: string;
}
