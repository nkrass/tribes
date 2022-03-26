import { Field, InputType, InterfaceType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { CartStatus } from "../entities/cart.entity";
import { BaseCartItemsInput } from "./create-cart.input";

@InputType()
@InterfaceType('UpdateCartInput')
export class UpdateCartInput {
  @Field(() => String, { nullable: false })
  id: string

  @Field(() => [BaseCartItemsInput], {nullable: true})
  items: BaseCartItemsInput[];

  @IsOptional()
  @Field(() => String, {nullable: true})
  userId?: string

  @IsOptional()
  @Field(() => String, {nullable: true})
  orderId?: string

  @Field(() => CartStatus, {nullable: false})
  status: CartStatus

  @IsOptional()
  @Field(() => String, {nullable: true})
  externalUserId: string
}