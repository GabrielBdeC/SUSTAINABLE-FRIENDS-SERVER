import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'HOMEI59AOLJLCXWXBLT8M3GGEW6SGA',
    });
  }

  public async validate(payload: any) {
    return {
      name: payload.name,
      identifier: payload.sub,
      isPersonal: payload.isPersonal,
    };
  }
}
