import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JWTStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Module({
  imports: [UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  providers: [AuthResolver, AuthService, JWTStrategy, GqlAuthGuard]
})
export class AuthModule {}
