import { Field, InputType, Int, InterfaceType } from '@nestjs/graphql';
import { IsOptional, IsNotEmpty, IsUUID } from 'class-validator';



@InputType()
@InterfaceType('GetOrderInput')
export class GetOrderInput {
  @Field({ nullable: false })
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
@InterfaceType('FilterOrderInput')
export class FilterOrderInput extends LimitArgs{
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @Field({ nullable: true })
  @IsOptional()
  status: string;

  @Field({ nullable: true })
  @IsOptional()
  productBarcode: string;

}
