import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { SituacaoProduto } from "./enum/situacao-produto.enum";
import { Usuario } from "src/auth/usuario.entity";
import { Categoria } from "src/categorias/categoria.entity";
import { Variacao } from "src/variacoes/variacao.entity";

@Entity()
export class Produto extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sku: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    preco: number;

    @Column()
    situacao: SituacaoProduto;

    @Column()
    quantidade: number;

    @ManyToOne(type => Usuario, usuario => usuario.produtos, { eager: false })
    @JoinColumn({name: "usuario_id"})
    usuario: Usuario;

    @ManyToMany(type => Categoria)
    @JoinTable({name: "categoria_produto"})
    categorias: Categoria[];

    @OneToMany(type => Variacao, variacao => variacao.produto)
    variacoes: Variacao[];

    // usuarioId: number;
}