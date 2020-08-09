import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { isEmptyStatement } from '@babel/types';

export class CreateOpcaoVariacaoDto {

    @IsNotEmpty()
    opcaoId: number;

    // @IsNotEmpty()
    // tipoOpcaoId: number;
}