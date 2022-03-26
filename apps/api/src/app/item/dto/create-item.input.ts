import { Field, InputType, InterfaceType, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
@InterfaceType('BaseExternalCodeProvider')
export class BaseExternalCodeProviderInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  provider: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  code: string;
}

@InputType("ExternalCodeProviderInput")
@ObjectType({
  implements: () => [BaseExternalCodeProviderInput],
})
export class ExternalCodeProvider implements BaseExternalCodeProviderInput{
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  provider: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  code: string;
}

@InputType()
@InterfaceType('BaseItem', {})
export class CreateItemInput {
  @IsNotEmpty()
  @IsUUID()
  @Field(() => String, {nullable: false})
  id: string;

  @IsNotEmpty()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  @Field(() => String, {nullable: false})
  productBarcode: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, {nullable: true})
  registered?: boolean;
  
  @IsOptional()
  @IsString()
  @Field(() => String, {nullable: true})
  externalRusCode?: string

  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  userId?: string

  @Field( () => [ExternalCodeProvider], {nullable: true})
  @IsOptional()
  external: [ExternalCodeProvider];
}
