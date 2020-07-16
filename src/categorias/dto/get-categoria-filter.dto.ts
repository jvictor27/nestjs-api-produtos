import { IsNotEmpty, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCategoriaFilterDto {
    @IsOptional()
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao: string;

    @IsOptional()
    @IsNumber()
    categoriaPai: number;
}