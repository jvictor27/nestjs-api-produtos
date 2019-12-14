import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
@Unique(['cnpj'])
export class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    cnpj: string;

    @Column()
    senha: string;

    @Column()
    salt: string;

    async ValidateSenha(senha: string): Promise<boolean> {
        const hash = await bcrypt.hash(senha, this.salt);
        return hash === this.senha;
    }
}