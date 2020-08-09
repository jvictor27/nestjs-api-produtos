import { SituacaoProduto } from './../enum/situacao-produto.enum';
import { IsNumber, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateProdutoDto {
    @IsOptional()
    @IsNotEmpty()
    nome: string;

    @IsOptional()
    @IsNotEmpty()
    descricao: string;
    
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    preco: number;

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SituacaoProduto)
    situacao: SituacaoProduto;

    @IsOptional()
    @IsNumber()
    categoriaId: number;

    @IsOptional()
    @IsNumber()
    quantidade: number;
}