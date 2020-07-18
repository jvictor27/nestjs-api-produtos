import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import { SituacaoProduto } from "./enum/situacao-produto.enum";
import { Usuario } from "src/auth/usuario.entity";
import { Categoria } from "src/categorias/categoria.entity";

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
    @JoinColumn({name: "usuario_id"})
    usuario: Usuario;

    @ManyToMany(type => Categoria)
    @JoinTable({name: "categoria_produto"})
    categorias: Categoria[];

    // usuarioId: number;
}