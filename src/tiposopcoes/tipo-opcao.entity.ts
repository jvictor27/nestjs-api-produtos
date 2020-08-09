import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Usuario } from "src/auth/usuario.entity";
import { IsNotEmpty } from "class-validator";
import { Opcao } from "src/opcoes/opcao.entity";

@Entity("tipo_opcao")
export class TipoOpcao extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    nome: string;

    @OneToMany(type => Opcao, opcao => opcao.tipoOpcao)
    opcoes: Opcao[];


    // usuarioId: number;
}