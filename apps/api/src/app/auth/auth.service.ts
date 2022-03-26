import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtDto } from './dto/jwt.dto';
import { LoginAuthInput } from './dto/login-auth.input';
import { RegisterAuthInput } from './dto/register-auth.input';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    // private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly jwt: JwtService
  ){}
  
  async login(loginAuthInput: LoginAuthInput): Promise<Auth> {
    const found = await this.userService.findByEmail(loginAuthInput.email);
    if (!found.length) throw new BadRequestException('User not found or incorrect password');
    const user = found[0]
    const isValid = await this.userService.comparePasswords(loginAuthInput.password, user.passwordHash);
    if (!isValid) throw new BadRequestException('User not found or incorrect password');
    const authData = new Auth()
    authData.user = user;
    authData.token = await this.signToken(user);
    return authData;
  }

  async register(registerAuthInput: RegisterAuthInput): Promise<Auth> {
    const found = await this.userService.findByEmail(registerAuthInput.email);
    if (found.length) throw new BadRequestException('Bad credentials');
    const user = await this.userService.create(registerAuthInput);
    const authData = new Auth()
    authData.user = user;
    authData.token = await this.signToken(user);
    return authData;
  }
  async validateUser(id: string): Promise<any> {
    return this.userService.findOne({ id });
  }
  async signToken(user: User) {
    const payload: JwtDto = { userId: user.id, userRole: user.userRole }
    return this.jwt.sign(payload, {expiresIn: '1y'});
  }
}
