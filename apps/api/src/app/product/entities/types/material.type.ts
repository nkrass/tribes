import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@ObjectType('MaterialType')
@InputType('MaterialInput')
export class Material {
  @Field( () => String, {nullable: true})
  @IsString()
  @Transform((s) => s.value?.toLowerCase())
  material: string;

  @Field( () => Number, {nullable: true})
  @IsNumber()
  quantity: number;
}