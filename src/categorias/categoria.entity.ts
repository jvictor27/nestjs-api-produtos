import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, SaveOptions } from "typeorm";

@Entity()
export class Categoria extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column({name: "categoria_pai_id", nullable: true})
    categoriaPaiId: number;

    @ManyToOne(type => Categoria)
    @JoinColumn({name: "categoria_pai_id"})
    categoriaPai: Categoria;

    // async save(options?: SaveOptions): Promise<this> {
    //     await super.save(options);
    //     await this.reload();
    //     return this;
    //   }
    

    // usuarioId: number;
}