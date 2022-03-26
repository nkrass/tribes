import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { OrderStatus } from './order-status.enum';

@InputType()
export class UpdateOrderInput {
  @IsUUID()
  @Field(() => String, { nullable: false })
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {nullable: true})
  productBarcode: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {nullable: true})
  userId: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, {nullable: true})
  quantity: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, {nullable: true})
  price: number;

  @IsOptional()
  @IsString()
  @Field(() => String, {nullable: true})
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
  @Field(() => OrderStatus, {nullable: true})
  status: OrderStatus;
}
