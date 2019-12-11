import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { SituacaoProduto } from "./enum/situacao-produto.enum";

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
}