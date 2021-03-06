import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    login: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Senha deve ter letra minúscula + letra maiúscula + número ou caracter especial.'},
    )
    senha: string;
}
