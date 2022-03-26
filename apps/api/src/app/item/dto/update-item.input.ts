import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseExternalCodeProviderInput } from './create-item.input';

@InputType()
export class UpdateItemInput {
  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, {nullable: false})
  id: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  @Field(() => String, {nullable: true})
  productBarcode: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, {nullable: true})
  registered: boolean;

  @IsOptional()
  @IsString()
  @Field(() => String, {nullable: true})
  externalRusCode?: string
  
  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  userId: string;

  @Field( () => [BaseExternalCodeProviderInput], {nullable: true})
  @IsOptional()
  external: [BaseExternalCodeProviderInput];
}
