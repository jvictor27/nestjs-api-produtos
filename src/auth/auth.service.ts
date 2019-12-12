import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UsuarioRepository)
        private usuarioRepository: UsuarioRepository
    ) {}

    async singUp(uthCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usuarioRepository.singUp(uthCredentialsDto);
    }
}
