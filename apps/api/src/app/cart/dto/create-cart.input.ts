import { Field, InputType, InterfaceType, ObjectType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Barcode } from "../../product/entities/barcode.model";
import { CartStatus } from "../entities/cart.entity";

@ObjectType()
@InterfaceType('BaseCartItems')
export class BaseCartItems {
  @Field(() => String, {nullable: true})
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  barcode: string;

  @Field(() => Number, {nullable: true})
  @IsNumber()
  quantity: number;

  @Field(() => Number, {nullable: true})
  @IsNumber()
  price: number;

  @Field(() => String, {nullable: true})
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  currency: string

  @Field(() => Number, {nullable: true})
  @IsNumber()
  exchangeRate: number
}
@InputType("BaseCartItemsInput")
export class BaseCartItemsInput {
  @Field(() => String, {nullable: true})
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  barcode: string;

  @Field(() => Number, {nullable: true})
  @IsNumber()
  quantity: number;

  @Field(() => Number, {nullable: true})
  @IsNumber()
  price: number;

  @Field(() => String, {nullable: true})
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  currency: string

  @Field(() => Number, {nullable: true})
  @IsNumber()
  exchangeRate: number
}

@ObjectType()
export class CartItems {
  @Field(() => Barcode, {nullable: true})
  barcode: Barcode;

  @Field(() => Number, {nullable: true})
  quantity: number;

  @Field(() => Number, {nullable: true})
  price: number;

  @Field(() => String, {nullable: true})
  currency: string
  
  @Field(() => Number, {nullable: true})
  exchangeRate: number
}
@InputType("CreateCartInput")
export class CreateCartInput {
  @Field(() => [BaseCartItemsInput], {nullable: false})
  items: BaseCartItemsInput[];

  @IsOptional()
  @Field(() => String, {nullable: true})
  userId?: string

  @Field(() => CartStatus, {nullable: false})
  status: CartStatus

  @IsOptional()
  @Field(() => String, {nullable: true})
  externalUserId: string
}