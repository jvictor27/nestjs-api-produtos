import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SingUpUsuarioDto } from './dto/singup-usuario.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UsuarioRepository)
        private usuarioRepository: UsuarioRepository
    ) {}

    async singUp(singUpUsuarioDto: SingUpUsuarioDto): Promise<void> {
        return this.usuarioRepository.singUp(singUpUsuarioDto);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const result = await this.usuarioRepository.validateUsuarioSenha(authCredentialsDto);

        if (!result) {
            throw new UnauthorizedException('Login ou senha errado(s)');
        }

        return result;
    }
}
