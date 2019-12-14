import { Repository, EntityRepository } from "typeorm";
import { Usuario } from "./usuario.entity";
import { SingUpUsuarioDto } from "./dto/singup-usuario.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {
    async singUp(singUpUsuarioDto: SingUpUsuarioDto): Promise<void> {
        const { nome, cnpj, email, senha } = singUpUsuarioDto;

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

    async validateUsuarioSenha(authCredentialsDto: AuthCredentialsDto): Promise<Usuario> {
        const { login, senha } = authCredentialsDto;

        const query = this.createQueryBuilder('usuario');
        query.andWhere('usuario.email = :login OR usuario.cnpj = :login', { login });

        const result = await query.getMany();
        
        if (result.length === 0) {
            return null;
        }

        const usuario = result.shift();
        const isValidate = await usuario.ValidateSenha(senha); 
        // console.log(usuario.ValidateSenha(senha));
        if (!isValidate) {
            return null;
        }

        return usuario;
    }

    private async hashSenha(senha: string, salt: string): Promise<string> {
        return bcrypt.hash(senha, salt);
    }
}