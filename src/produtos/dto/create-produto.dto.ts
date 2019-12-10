import { SituacaoProduto } from './../enum/situacao-produto.enum';
import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

export class CreateProdutoDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    descricao: string;

    @IsNotEmpty()
    @IsNumber()
    preco: number;

    @IsNotEmpty()
    @IsEnum(SituacaoProduto)
    situacao: SituacaoProduto;
}