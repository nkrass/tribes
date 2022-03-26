import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';
import { CreateBarcodeInput } from '../dto/create-barcode.input';
// import { Product } from './product.model';

export type BarcodeKey = {
  barcode: string
};

@ObjectType()
export class Barcode extends CreateBarcodeInput {
  // @IsOptional()
  // @Field(() => Product, {nullable: true})
  // product?: Product
  
  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  createdAt: Date

  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  updatedAt: Date

  categoryGenderColorSize: string;
  categoryGenderSize: string;
  genderColorSize: string;
  genderSize: string;
  genderColor: string;
  categorySize: string;
  categoryGender: string;
}