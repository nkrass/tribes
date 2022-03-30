import { Field, InputType, Int, InterfaceType } from '@nestjs/graphql';
import { IsString, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';
import { FeedbackType } from './create-feedback.input';

@InputType()
@InterfaceType('GetFeedbackInput')
export class GetFeedbackInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  id: string;
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
@InterfaceType('FilterFeedbackInput')
export class FilterFeedbackInput extends LimitArgs{
  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => FeedbackType, {nullable: true})
  purpose?: FeedbackType
}
