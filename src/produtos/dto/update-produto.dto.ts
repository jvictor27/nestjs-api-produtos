import { SituacaoProduto } from './../enum/situacao-produto.enum';

export class UpdateProdutoDto {
    nome: string;

    descricao: string;

    preco: number;

    situacao: SituacaoProduto;
}