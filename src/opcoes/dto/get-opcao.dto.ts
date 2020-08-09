import { IsNotEmpty, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { isEmptyStatement } from '@babel/types';

export class GetOpcaoDto {
    
    @IsNotEmpty()
    idTipoOpcao: number;

    @IsNotEmpty()
    nomeTipoOpcao: string;

    @IsNotEmpty()
    idOpcao: number;

    @IsNotEmpty()
    nomeOpcao: string;


}