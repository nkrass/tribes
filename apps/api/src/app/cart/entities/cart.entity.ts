import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
import { BaseCartItems } from '../dto/create-cart.input';
import { registerEnumType } from '@nestjs/graphql';


export type CartKey = {
  id: string,
};

enum CartStatus {
  open = 'open',
  closed = 'closed',
  left = 'left'
}

registerEnumType(CartStatus, {
  name: 'CartStatus',
});

export { CartStatus };

@ObjectType()
export class Cart {
  @Field(/* istanbul ignore next */ () => ID, { nullable: false })
  @IsUUID()
  id: string;

  items: BaseCartItems[];

  // @Field(() => [CartItems], {nullable: true})
  // items: CartItems[];

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

  @Field(() => Date, {nullable: true})
  @IsOptional()
  createdAt?: Date

  @Field(() => Date, {nullable: true})
  @IsOptional()
  updatedAt?: Date

  @IsOptional()
  @Field({nullable: true})
  count?: number;

  @Field({nullable: true})
  lastKey?: string
}