import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from 'src/auth/usuario.entity';
import { GetUsuario } from 'src/auth/get-usuario.decorator';
import { TiposOpcoesService } from './tipos-opcoes.service';
import { TipoOpcao } from './tipo-opcao.entity';
import { GetTipoOpcaoDto } from './dto/get-tipo-opcao.dto';

@Controller('tiposopcoes')
@UseGuards(AuthGuard())
export class TiposOpcoesController {
    constructor(private tiposOpcoesService: TiposOpcoesService) {}

    @Get()
    getTiposOpcoes(): Promise<TipoOpcao[]> {
        return this.tiposOpcoesService.getTiposOpcoes();
    }

    @Get('/:id')
    getTipoOpcaoById(@Param('id', ParseIntPipe) id: number, @GetUsuario() usuario: Usuario): Promise<GetTipoOpcaoDto> {
        return this.tiposOpcoesService.getTipoOpcaoById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTipoOpcao(@Body() tipoOpcao: TipoOpcao): Promise<TipoOpcao> {
        return this.tiposOpcoesService.createTipoOpcao(tipoOpcao);
    }

}
