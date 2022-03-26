import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { Barcode } from '../../product/entities/barcode.model';
import { Product } from '../../product/entities/product.model';
import { CreateItemInput } from '../dto/create-item.input';

export type ItemKey = {
  id: string,
};

@ObjectType({ implements: CreateItemInput })
export class Item extends CreateItemInput {
  @Field(/* istanbul ignore next */ () => String, { nullable: false })
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  @Field(() => String, {nullable: false})
  productBarcode: string;

  @IsOptional()
  @Field(() => Product, {nullable: true})
  product?: Product

  @IsOptional()
  @Field(() => Barcode, {nullable: true})
  barcode?: Barcode

  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  userId?: string

  @IsOptional()
  @IsString()
  @Field(() => String, {nullable: true})
  externalRusCode?: string

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