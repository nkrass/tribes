import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginAuthInput } from './dto/login-auth.input';
import { RegisterAuthInput } from './dto/register-auth.input';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  login(@Args('input') loginAuthInput: LoginAuthInput) {
    return this.authService.login(loginAuthInput);
  }
  @Mutation(() => Auth)
  register(@Args('input') registerAuthInput: RegisterAuthInput) {
    return this.authService.register(registerAuthInput);
  }
}
