import { Field, InputType, Int, InterfaceType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsUUID } from 'class-validator';

@InputType()
@InterfaceType('BaseFilterPaginationInput' )
class LimitArgs {
  @IsOptional()
  @Field(() => Boolean, {nullable: true})
  all: boolean = false;

  @IsOptional()
  @Field(() => Int, {nullable: true})
  limit: number = 20;
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
