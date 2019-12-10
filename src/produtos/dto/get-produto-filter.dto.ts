import { SituacaoProduto } from "../enum/situacao-produto.enum";
import { IsOptional, IsEnum, IsNotEmpty } from "class-validator";

export class GetProdutoFilterDto {
    @IsOptional()
    @IsEnum(SituacaoProduto)
    situacao: SituacaoProduto;

    @IsOptional()
    @IsNotEmpty()
    nome: string;
}