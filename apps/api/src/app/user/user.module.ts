import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService]
})
export class UserModule {}
