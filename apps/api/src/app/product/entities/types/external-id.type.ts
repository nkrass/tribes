import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";

@ObjectType('ExternalId')
@InputType('ExternalIdInput')
export class ExternalId {
  @Field(() => String, {nullable: true})
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  name: string;

  @Field(() => String, {nullable: true})
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  id: string;
}