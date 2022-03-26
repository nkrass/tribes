import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { IsDate, IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

enum UserRole {
  admin = 'admin',
  user = 'user',
  manager = 'manager'
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

export { UserRole };

export type UserKey = {
  id: string,
};

@ObjectType()
export class User {
  
  @IsUUID()
  @Field(() => String, { nullable: true})
  id: string;

  @IsEmail()
  @Field(() => String, { nullable: true})
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
  @Field(() => String, { nullable: true})
  phone?: string;

  @IsString()
  @IsOptional()
  @Field(() => UserRole, { nullable: true})
  userRole: UserRole;

  passwordSalt: string;
  passwordHash: string;
  
  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  createdAt: Date

  @IsOptional()
  @IsDate()
  @Field({nullable: true})
  updatedAt: Date
  
}
