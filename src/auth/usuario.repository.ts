import { Repository, EntityRepository } from "typeorm";
import { Usuario } from "./usuario.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {
    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { nome, cnpj, email, senha } = authCredentialsDto;

        const salt = await bcrypt.genSalt();

        const usuario = new Usuario();
        usuario.nome = nome;
        usuario.cnpj = cnpj;
        usuario.email = email;
        usuario.senha = await this.hashSenha(senha, salt);
        usuario.salt = salt;

        try {
            await usuario.save();
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Usuário (cpf ou e-mail) já cadastrado.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashSenha(senha: string, salt: string): Promise<string> {
        return bcrypt.hash(senha, salt);
    }
}