import { IsString, MinLength, MaxLength, Matches, IsEmail, IsNumber, Length } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @MinLength(3)
    @MaxLength(120)
    nome: string;

    @IsEmail()
    email: string;

    @IsNumber()
    cnpj: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Senha deve ter letra minúscula + letra maiúscula + número ou caracter especial.'},
    )
    senha: string;
}
