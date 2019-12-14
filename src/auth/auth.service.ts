import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SingUpUsuarioDto } from './dto/singup-usuario.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UsuarioRepository)
        private usuarioRepository: UsuarioRepository,
        private jwtService: JwtService,
    ) {}

    async singUp(singUpUsuarioDto: SingUpUsuarioDto): Promise<void> {
        return this.usuarioRepository.singUp(singUpUsuarioDto);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const usuario = await this.usuarioRepository.validateUsuarioSenha(authCredentialsDto);

        if (!usuario) {
            throw new UnauthorizedException('Login ou senha errado(s)');
        }

        const payload: JwtPayload = { nome: usuario.nome };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
}
