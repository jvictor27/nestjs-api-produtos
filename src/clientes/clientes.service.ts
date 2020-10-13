import { Injectable, ParseUUIDPipe, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { GetClienteFilterDto } from './dto/get-cliente-filter.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteRepository } from './cliente.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Usuario } from 'src/auth/usuario.entity';
import { CategoriasService } from '../categorias/categorias.service';
import { VariacoesService } from 'src/variacoes/variacoes.service';
import { GetVariacaoDto } from 'src/variacoes/dto/get-variacao.dto';

import { GetClienteDto } from './dto/get-cliente.dto';
import { GetCategoriaSimplificadaDto } from 'src/categorias/dto/get-categoria-simplificada.dto';

@Injectable()
export class ClientesService {
    constructor (
        @InjectRepository(ClienteRepository)
        private clienteRepository: ClienteRepository
    ) {}

    async getClientes(filterDto: GetClienteFilterDto, usuario: Usuario): Promise<Cliente[]> {
        return this.clienteRepository.getClientes(filterDto, usuario);
    }

    async getClientesDto(filterDto: GetClienteFilterDto, usuario: Usuario): Promise<GetClienteDto[]> {
        const produtos = await this.getClientes(filterDto, usuario);
        return await this.parseClientesToClientesDto(produtos);
    }

    // async getClienteVariacoesDtoByProdutoId(id: number): Promise<GetVariacaoDto[]> {
    //     return await this.variacaoService.getClienteVariacoesDtoById(id);
    // }

    async getClienteById(id: number, usuario: Usuario): Promise<Cliente> {
        return await this.clienteRepository.getClienteById(id, usuario);
    }

    async getClienteDtoById(id: number, usuario: Usuario): Promise<GetClienteDto> {
        const cliente = await this.getClienteById(id, usuario);
        return await this.parseClienteToClienteDto(cliente);
    }

    async createCliente(createClienteDto: CreateClienteDto, usuario: Usuario): Promise<Cliente> {
        // const categoria = await this.categoriaService.getCategoriaById(createClienteDto.categoriaId);
        // const isCategoriaPai = await this.categoriaService.isCategoriaPai(createClienteDto.categoriaId);
        // if (isCategoriaPai) {
        //     throw new NotFoundException(`Você tentou vincular o produto "${createClienteDto.nome}" diretamente a uma categoria pai, vincule-o a uma categoria filha.`);
        // }
        const { nome, email, cpf } = createClienteDto;
        const cliente = new Cliente();

        cliente.nome = nome;
        cliente.email = email;
        cliente.cpf = cpf;
        return this.clienteRepository.createCliente(cliente);
    }

    async deleteCliente(id: number, usuario: Usuario): Promise<void> {
        const cliente = await this.getClienteById(id, usuario);
        const result = await this.clienteRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Cliente com o ID "${id}", não foi encontrado.`);
        }
    }

    async updateCliente(id: number, updateClienteDto: UpdateClienteDto, usuario: Usuario): Promise<Cliente> {
        const cliente = await this.getClienteById(id, usuario);
        const { nome, email, cpf } = updateClienteDto;

        if (nome) {
            cliente.nome = nome;
        }

        if (email) {
            cliente.email = email;
        }

        if (cpf) {
            cliente.cpf = cpf;
        }

        await cliente.save();

        return cliente;
    }

    async parseClientesToClientesDto(clientes: Cliente[]): Promise<GetClienteDto[]> {
        const clientesDto: GetClienteDto[] = [];
        for (const cliente of clientes) {
            clientesDto.push(await this.parseClienteToClienteDto(cliente));
        }
        return clientesDto;
    }

    async parseClienteToClienteDto(cliente: Cliente): Promise<GetClienteDto> {
        const clienteDto: GetClienteDto = new GetClienteDto();
        clienteDto.id = cliente.id;
        clienteDto.nome = cliente.nome;
        clienteDto.email = cliente.email;
        clienteDto.cpf = cliente.cpf;
        // clienteDto.categorias = [];
        // if (cliente.categorias && cliente.categorias.length > 0) {
        //     for (const categoria of cliente.categorias) {
        //         const categoriaSimplificadaDto: GetCategoriaSimplificadaDto = new GetCategoriaSimplificadaDto();
        //         categoriaSimplificadaDto.id = categoria.id;
        //         categoriaSimplificadaDto.nome = categoria.nome;
        //         clienteDto.categorias.push(categoriaSimplificadaDto);
        //     }
        // }

        // clienteDto.variacoes = [];
        // if (cliente.variacoes && cliente.variacoes.length > 0) {
        //     clienteDto.variacoes =  await this.getClienteVariacoesDtoByclienteId(cliente.id);
        // }
        return clienteDto;
    }
}
