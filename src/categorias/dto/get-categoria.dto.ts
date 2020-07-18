import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { isEmptyStatement } from '@babel/types';

export class GetCategoriaDto {
    
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    descricao: string;

    @IsOptional()
    @IsNumber()
    categoriaPaiId: number;

    @IsOptional()
    categoriaPath: string;

    @IsOptional()
    categoriaArvore: GetCategoriaDto[];
}