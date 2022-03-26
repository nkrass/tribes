
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../user/entities/user.entity';

@InputType()
export class RegisterAuthInput {
  @IsString()
  @Field(() => String, { nullable: false })
  password: string;
  
  @IsEmail()
  @Field(() => String, { nullable: false })
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
  @IsOptional()
  @Field(() => Int, { nullable: true})
  phone?: string;

  //TODO disable
  userRole: UserRole = UserRole.user

}
