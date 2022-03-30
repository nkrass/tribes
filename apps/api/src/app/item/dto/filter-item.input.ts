import { Field, InputType, Int, InterfaceType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';

@InputType()
@InterfaceType('GetItemInput')
export class GetItemInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

@InputType()
@InterfaceType('BaseFilterPaginationInput' )
class LimitArgs {
  @IsOptional()
  @Field(() => Boolean, {nullable: true})
  all = false;

  @IsOptional()
  @Field(() => Int, {nullable: true})
  limit = 20;
}


@InputType()
@InterfaceType('FilterItemInput')
export class FilterItemInput extends LimitArgs{
  @IsOptional()
  @IsUUID()
  @Field(() => String, {nullable: true})
  id: string;

  @IsOptional()
  @IsString()
  @Transform((s) => s.value.toLowerCase())
  @Field(() => String, {nullable: true})
  productBarcode: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {nullable: true})
  externalRusCode?: string
}
