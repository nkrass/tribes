import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';
import { Barcode } from '../../product/entities/barcode.model';
import { Product } from '../../product/entities/product.model';
import { CreateOrderInput } from '../dto/create-order.input';

export type OrderKey = {
  id: string;
};

@ObjectType({ implements: CreateOrderInput })
export class Order extends CreateOrderInput {
  @Field( () => String)
  id: string;

  @Field(() => Barcode, {nullable: true})
  barcode?: Barcode;

  @Field(() => Product, {nullable: true})
  product?: Product;

  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  createdAt: Date

  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  updatedAt?: Date
}
