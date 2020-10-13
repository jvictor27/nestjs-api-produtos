import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm";

export class Cliente extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    cpf: string;

}