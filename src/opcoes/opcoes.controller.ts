import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OpcoesService } from './opcoes.service';
import { Opcao } from './opcao.entity';
import { GetOpcaoDto } from './dto/get-opcao.dto';
import { CreateOpcaoDto } from './dto/create-opcao.dto';

@Controller('opcoes')
@UseGuards(AuthGuard())
export class OpcoesController {
    constructor(private opcoesService: OpcoesService) {}

    @Get()
    getOpcoes(): Promise<GetOpcaoDto[]> {
        // return this.opcoesService.getOpcoes();
        return this.opcoesService.getOpcoesDto();
    }

    @Get('/:id')
    getOpcaoById(@Param('id', ParseIntPipe) id: number): Promise<GetOpcaoDto> {
        // return this.opcoesService.getOpcaoById(id);
        return this.opcoesService.getOpcaoDtoById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createOpcao(@Body() createOpcaoDto: CreateOpcaoDto): Promise<Opcao> {
        return this.opcoesService.createOpcao(createOpcaoDto);
    }

}
