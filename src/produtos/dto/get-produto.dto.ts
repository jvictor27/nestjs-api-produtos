import { SituacaoProduto } from '../enum/situacao-produto.enum';
import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { GetVariacaoDto } from 'src/variacoes/dto/get-variacao.dto';
import { GetCategoriaSimplificadaDto } from 'src/categorias/dto/get-categoria-simplificada.dto';

export class GetProdutoDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    sku: string;

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

    @IsNotEmpty()
    @IsNumber()
    quantidade: number;

    @IsNumber()
    categorias: GetCategoriaSimplificadaDto[];

    @IsOptional()
    variacoes: GetVariacaoDto[];
}