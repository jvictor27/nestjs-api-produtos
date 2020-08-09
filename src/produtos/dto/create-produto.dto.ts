import { SituacaoProduto } from './../enum/situacao-produto.enum';
import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CreateVariacaoDto } from 'src/variacoes/dto/create-variacao.dto';

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

    @IsNumber()
    categoriaId: number;

    @IsOptional()
    variacoes: CreateVariacaoDto[];
}