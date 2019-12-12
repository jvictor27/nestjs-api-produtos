import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UsuarioRepository)
        private usuarioRepository: UsuarioRepository
    ) {}
}
