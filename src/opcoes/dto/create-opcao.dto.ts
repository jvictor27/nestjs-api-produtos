import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { isEmptyStatement } from '@babel/types';

export class CreateOpcaoDto {

    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    tipoOpcaoId: number;
}