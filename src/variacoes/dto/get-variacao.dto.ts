import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { isEmptyStatement } from '@babel/types';
import { GetOpcaoDto } from 'src/opcoes/dto/get-opcao.dto';

export class GetVariacaoDto {
    
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    sku: string;

    @IsNotEmpty()
    quantidade: number;

    @IsNotEmpty()
    produtoId: number;

    @IsNotEmpty()
    opcoes: GetOpcaoDto[];
}