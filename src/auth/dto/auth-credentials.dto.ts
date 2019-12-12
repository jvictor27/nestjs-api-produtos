import { IsNotEmpty, IsNumber } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    cnpj: string;

    @IsNotEmpty()
    senha: string;
}