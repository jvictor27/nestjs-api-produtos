import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateClienteDto {
    @IsOptional()
    @IsNotEmpty()
    nome: string;

    @IsOptional()
    @IsNotEmpty()
    email: string;
}