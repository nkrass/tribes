import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { IsNumber, IsString } from "class-validator"

@InputType("NomenclatureInput")
@ObjectType("Nomenclature")
export class Nomenclature {
  @IsString()
  @Field(() => String, {nullable: true})
  name: string
  @IsString()
  @Field(() => String, {nullable: true})
  tnvd: string
  @IsNumber()
  @Field(() => Number, {nullable: true})
  cost: number
  @IsNumber()
  @Field(() => Number, {nullable: true})
  price: number
}