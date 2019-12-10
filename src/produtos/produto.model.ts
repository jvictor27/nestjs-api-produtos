import { SituacaoProduto } from './enum/situacao-produto.enum';

export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    situacao: SituacaoProduto;
}