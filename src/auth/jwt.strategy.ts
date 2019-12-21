import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './usuario.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsuarioRepository)
        private usuarioRepository: UsuarioRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
        });
    }

    async validate(payload: JwtPayload): Promise<Usuario> {
        const { email } = payload;
        const usuario = await this.usuarioRepository.findOne({ email });

        if (!usuario) {
            throw new UnauthorizedException();
        }

        return usuario;
    }
}