import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsEmail()
  @Field(() => String, { nullable: false})
  id: string;

  @IsEmail()
  @Field(() => String, { nullable: true})
  email?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true})
  firstName?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true})
  lastName?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true})
  phone?: string;

  @IsString()
  @IsOptional()
  @Field(() => UserRole, { nullable: true})
  userRole?: UserRole;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true})
  password?: string;
}
