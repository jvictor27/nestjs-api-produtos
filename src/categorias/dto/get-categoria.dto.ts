import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { isEmptyStatement } from '@babel/types';

export class GetCategoriaDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    descricao: string;

    @IsOptional()
    @IsNumber()
    categoriaPai: number;
}