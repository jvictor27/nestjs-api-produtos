import { Repository, EntityRepository } from "typeorm";
import { Usuario } from "./usuario.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {
    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { nome, cnpj, email, senha } = authCredentialsDto;

        const usuario = new Usuario();
        usuario.nome = nome;
        usuario.cnpj = cnpj;
        usuario.email = email;
        usuario.senha = senha;

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
}