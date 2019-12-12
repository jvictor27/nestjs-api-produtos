import { Repository, EntityRepository } from "typeorm";
import { Usuario } from "./usuario.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {
    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { nome, cnpj, email, senha } = authCredentialsDto;

        const usuario = new Usuario();
        usuario.nome = nome;
        usuario.cnpj = cnpj;
        usuario.email = email;
        usuario.senha = senha;

        await usuario.save();
    }
}