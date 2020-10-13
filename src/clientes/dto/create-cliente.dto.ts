import { IsNotEmpty, IsEnum, IsNumber, IsOptional, IsEmail } from 'class-validator';

export class CreateClienteDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    cpf: string;
}