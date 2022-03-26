import { Field, InputType, Int, InterfaceType } from "@nestjs/graphql";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { CartStatus } from "../entities/cart.entity";

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

@InputType("GetCartInput")
@InterfaceType('GetCartInput')
export class GetCartInput {
  @IsUUID()
  @Field(() => String, { nullable: true })
  id: string

  @IsUUID()
  @IsOptional()
  @Field(() => String, { nullable: true })
  userId: string
}

@InputType()
@InterfaceType('FilterCartInput')
export class FilterCartInput extends LimitArgs{
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  id?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  orderId?: string;
  
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  externalUserId?: string;

  @Field(() => CartStatus, { nullable: true })
  @IsOptional()
  @IsString()
  status?: CartStatus;
}