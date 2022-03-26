import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => User, { nullable: true })
  user: User;
}
