import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'chave-secreta', // Deve ser igual à usada no JwtModule
    });
  }

  async validate(payload: any): Promise<User> {

    console.log('Payload recebido pelo JwtStrategy:', payload);
    const user = await this.authService.findOneById(payload.id);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado ou inválido');
    }
    console.log('Usuário retornado pelo AuthService:', user); 
    return user;

  }
}