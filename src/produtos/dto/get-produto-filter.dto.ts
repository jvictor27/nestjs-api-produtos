import { SituacaoProduto } from "../enum/situacao-produto.enum";

export class GetProdutoFilterDto {
    situacao: SituacaoProduto;
    nome: string;
}