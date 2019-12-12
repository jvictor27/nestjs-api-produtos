import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

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
}