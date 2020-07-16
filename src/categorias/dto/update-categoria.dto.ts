import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

export class UpdateCategoriaDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    descricao: string;

    @IsNotEmpty()
    @IsNumber()
    categoriaPai: number;
}