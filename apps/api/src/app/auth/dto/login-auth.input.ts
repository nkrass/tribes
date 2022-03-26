import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class LoginAuthInput {
  @IsString()
  @Field(() => String, { nullable: false })
  password: string;
  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string;
}
