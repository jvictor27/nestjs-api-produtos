import { ProdutoStatus } from './../enum/situacao-produto.enum';

export class CreateProdutoDto {
    nome: string;
    descricao: string;
    preco: number;
    situacao: ProdutoStatus;
}