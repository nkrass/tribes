import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "../auth.service";
import { JwtDto } from "../dto/jwt.dto";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authService: AuthService){
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromBodyField('access_token'), 
        ExtractJwt.fromUrlQueryParameter('access_token'), 
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      secretOrKey: process.env.JWT_SECRET,
    })
  }
  async validate(payload: JwtDto){
    const user = await this.authService.validateUser(payload.userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}