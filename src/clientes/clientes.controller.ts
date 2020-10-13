import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { GetClienteFilterDto } from './dto/get-cliente-filter.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './cliente.entity';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from 'src/auth/usuario.entity';
import { GetUsuario } from 'src/auth/get-usuario.decorator';
import { Variacao } from 'src/variacoes/variacao.entity';
import { GetVariacaoDto } from 'src/variacoes/dto/get-variacao.dto';
import { GetClienteDto } from './dto/get-cliente.dto';

@Controller('clientes')
@UseGuards(AuthGuard())
export class ClientesController {
    constructor(private clientesService: ClientesService) {}

    @Get()
    getClientes(@Query(ValidationPipe) filterDto: GetClienteFilterDto, @GetUsuario() usuario: Usuario): Promise<GetClienteDto[]> {
        return this.clientesService.getClientesDto(filterDto, usuario);
    }

    @Get('/:id')
    getClienteById(@Param('id', ParseIntPipe) id: number, @GetUsuario() usuario: Usuario): Promise<GetClienteDto> {
        return this.clientesService.getClienteDtoById(id, usuario);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createCliente(@Body() createClienteDto: CreateClienteDto, @GetUsuario() usuario: Usuario): Promise<Cliente> {
        return this.clientesService.createCliente(createClienteDto, usuario);
    }

    @Delete('/:id')
    deleteCliente(@Param('id', ParseIntPipe) id: number, @GetUsuario() usuario: Usuario): Promise<void> {
        return this.clientesService.deleteCliente(id, usuario);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateCliente(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto, @GetUsuario() usuario: Usuario): Promise<Cliente> {
        return this.clientesService.updateCliente(id, updateClienteDto, usuario);
    }

    // @Get('/:id/variacoes')
    // getClienteVariacoesDtoByClienteId(@Param('id', ParseIntPipe) id: number): Promise<GetVariacaoDto[]> {
    //     return this.clientesService.getClienteVariacoesDtoByClienteId(id);
    // }

}
