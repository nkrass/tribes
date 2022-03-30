import { Field, InputType, registerEnumType} from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export enum FeedbackType {
  business = 'business',
  general = 'general',
  quality = 'quality',
  product = 'product',
  marketing = 'marketing',
  public = 'public'
}

registerEnumType(FeedbackType, {
  name: 'FeedbackType'
});

@InputType()
export class CreateFeedbackInput {
  // @IsString()
  @Field(() => String, {nullable: true})
  text: string;

  // @IsString()
  @Field(() => String, {nullable: true})
  name: string;

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
