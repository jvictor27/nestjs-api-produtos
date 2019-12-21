import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Produto } from "src/produtos/produto.entity";

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

    @OneToMany(type => Produto, produto => produto.usuario, { eager: true })
    produtos: Produto[];

    async ValidateSenha(senha: string): Promise<boolean> {
        const hash = await bcrypt.hash(senha, this.salt);
        return hash === this.senha;
    }
}