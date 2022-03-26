import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

@InputType()
export class CreateUserInput{

  @IsEmail()
  @Field(() => String, { nullable: false})
  email: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true})
  firstName?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true})
  lastName?: string;

  @IsString()
  @Field(() => String, { nullable: false})
  password: string;

  @IsString()
  @IsOptional()
  @Field(() => Int, { nullable: true})
  phone?: string;

  @IsString()
  @IsOptional()
  @Field(() => UserRole, { nullable: true})
  userRole: UserRole;
}
