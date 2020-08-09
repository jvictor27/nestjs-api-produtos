import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, ManyToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { TipoOpcao } from "src/tiposopcoes/tipo-opcao.entity";
import { Variacao } from "src/variacoes/variacao.entity";

@Entity()
export class Opcao extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    nome: string;

    @Column({name: "tipo_opcao_id"})
    tipoOpcaoId: number;

    @ManyToOne(type => TipoOpcao, tipoOpcao => tipoOpcao.opcoes)
    @JoinColumn({name: "tipo_opcao_id"})
    tipoOpcao: TipoOpcao;

    @ManyToMany(type => Variacao, variacao => variacao.opcoes)
    @JoinTable()
    variacoes: Variacao[];


    // usuarioId: number;
}