import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { SituacaoProduto } from "./enum/situacao-produto.enum";
import { Usuario } from "src/auth/usuario.entity";

@Entity()
export class Produto extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    preco: number;

    @Column()
    situacao: SituacaoProduto;

    @ManyToOne(type => Usuario, usuario => usuario.produtos, { eager: false })
    usuario: Usuario;
}