import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VariacoesService } from './variacoes.service';
import { Variacao } from './variacao.entity';
import { Usuario } from 'src/auth/usuario.entity';
import { GetVariacaoDto } from './dto/get-variacao.dto';
import { CreateVariacaoDto } from './dto/create-variacao.dto';
import { GetUsuario } from 'src/auth/get-usuario.decorator';

@Controller('variacoes')
@UseGuards(AuthGuard())
export class VariacoesController {
    constructor(private variacoesService: VariacoesService) {}

    // @Get()
    // getVariacoes(): Promise<GetVariacaoDto[]> {
    //     return this.variacoesService.getVariacoes();
    // }

    // @Get('/:id')
    // getVariacaoById(@Param('id', ParseIntPipe) id: number): Promise<GetVariacaoDto> {
    //     return this.variacoesService.getVariacaoById(id);
    // }

    @Post('/produto/:productId')
    @UsePipes(ValidationPipe)
    createVariacao(@Param('productId', ParseIntPipe) productId: number, @Body() createVariacaoDto: CreateVariacaoDto, @GetUsuario() usuario: Usuario): Promise<GetVariacaoDto> {
        return this.variacoesService.createVariacao(productId, createVariacaoDto, usuario);
    }

}
