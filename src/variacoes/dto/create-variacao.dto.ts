import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { isEmptyStatement } from '@babel/types';
import { CreateOpcaoVariacaoDto } from './create-opcao-variacao.dto';

export class CreateVariacaoDto {

    @IsNotEmpty()
    sku: string;

    @IsNotEmpty()
    quantidade: number;

    // @IsOptional()
    // produtoId: number;

    @IsNotEmpty()
    opcoes: CreateOpcaoVariacaoDto[];
}