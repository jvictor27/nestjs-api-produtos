import { SituacaoProduto } from './../enum/situacao-produto.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateProdutoDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    descricao: string;

    @IsNotEmpty()
    preco: number;

    @IsNotEmpty()
    situacao: SituacaoProduto;
}