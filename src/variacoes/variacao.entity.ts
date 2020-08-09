import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { TipoOpcao } from "src/tiposopcoes/tipo-opcao.entity";
import { Produto } from "src/produtos/produto.entity";
import { Opcao } from "src/opcoes/opcao.entity";

@Entity()
export class Variacao extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    sku: string;

    @IsNotEmpty()
    @Column()
    quantidade: number;

    @Column({name: "produto_id"})
    produtoId: number;

    @ManyToOne(type => Produto, produto => produto.variacoes)
    @JoinColumn({name: "produto_id"})
    produto: Produto;

    @ManyToMany(type => Opcao, opcao => opcao.variacoes)
    opcoes: Opcao[];


    // usuarioId: number;
}