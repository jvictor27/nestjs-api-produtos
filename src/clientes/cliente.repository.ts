import { Repository, EntityRepository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { GetClienteFilterDto } from './dto/get-cliente-filter.dto';
import { Usuario } from 'src/auth/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Cliente)
export class ClienteRepository extends Repository<Cliente> {

    async getClientes(filterDto: GetClienteFilterDto, usuario: Usuario): Promise<Cliente[]> {
        const { nome, email, cpf } = filterDto;
        const query = this.createQueryBuilder('cliente');

        // query.where('cliente.usuario_id = :usuario_id', { usuario_id: usuario.id });

        if (nome) {
            query.andWhere('Cliente.nome LIKE :nome', { nome: `%${nome}%` });
        }

        if (email) {
            query.andWhere('Cliente.email LIKE :email', { email: `%${email}%` });
        }

        if (cpf) {
            query.andWhere('Cliente.cpf LIKE :cpf', { cpf: `%${cpf}%` });
        }
        // query.relation('categorias');
        // query.leftJoinAndSelect('Cliente.categorias', 'categoria');
        // query.leftJoinAndSelect('Cliente.variacoes', 'variacao');

        const clientes = await query.getMany();
        return clientes;
    }

    async getClienteById(id: number, usuario: Usuario): Promise<Cliente> {
        const query = this.createQueryBuilder('cliente');
        query.andWhere('cliente.id = :id ', { id });
        // query.andWhere('cliente.usuario_id = :usuario_id ', { usuario_id: usuario.id });
        // query.leftJoinAndSelect('cliente.categorias', 'categoria');
        // query.leftJoinAndSelect('cliente.variacoes', 'variacao');

        const result = await query.getMany();

        if (result.length === 0) {
            throw new NotFoundException(`Cliente com o ID "${id}", não foi encontrado.`);
        }

        const found = result.shift();

        return found;
    }

    async createCliente(cliente: Cliente) : Promise<Cliente> {
        await cliente.save();

        return cliente;
    }
}