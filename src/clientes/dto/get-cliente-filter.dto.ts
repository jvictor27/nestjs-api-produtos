import { IsOptional, IsNotEmpty } from "class-validator";

export class GetProdutoFilterDto {
    @IsOptional()
    @IsNotEmpty()
    nome: string;

    @IsOptional()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    cpf: string;
}