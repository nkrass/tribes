import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsUUID } from 'class-validator';
import { CreateReviewInput } from '../dto/create-review.input';

export type ReviewKey = {
  id: string,
};

@ObjectType({ implements: CreateReviewInput })
export class Review extends CreateReviewInput {
  @IsUUID()
  @Field(/* istanbul ignore next */ () => String, { nullable: true })
  id: string;
  
  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  userId?: string
  
  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  createdAt: Date

  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  updatedAt: Date

  @IsOptional()
  @Field({nullable: true})
  count?: number;

  @Field({nullable: true})
  lastKey?: string
}