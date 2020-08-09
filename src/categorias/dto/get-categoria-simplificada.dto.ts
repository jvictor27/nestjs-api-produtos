import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { isEmptyStatement } from '@babel/types';

export class GetCategoriaSimplificadaDto {
    
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    nome: string;
}