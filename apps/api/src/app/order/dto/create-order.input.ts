import { Field, InputType, InterfaceType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from './order-status.enum';

@InputType()
@InterfaceType('BaseOrder')
export class CreateOrderInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, {nullable: false})
  productBarcode: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, {nullable: false})
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number, {nullable: false})
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Number, {nullable: false})
  price: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, {nullable: false})
  currency: string;

  @IsOptional()
  @Field(() => String, {nullable: true})
  promocodeId: string;

  @IsOptional()
  @Field(() => String, {nullable: true})
  payment: string

  @IsOptional()
  @Field(() => String, {nullable: true})
  deliveryInfo: string

  @IsString()
  @Field(() => OrderStatus)
  status: OrderStatus;

}
