import { Repository, EntityRepository } from 'typeorm';
import { Opcao } from './opcao.entity';
import { Usuario } from 'src/auth/usuario.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateOpcaoDto } from './dto/create-opcao.dto';
import { TipoOpcao } from 'src/tiposopcoes/tipo-opcao.entity';

@EntityRepository(Opcao)
export class OpcaoRepository extends Repository<Opcao> {

    async getOpcoes(): Promise<Opcao[]> {
        // const { situacao, nome } = filterDto;
        const query = this.createQueryBuilder('opcao');

        // if (situacao) {
        //     query.andWhere('produto.situacao = :situacao', { situacao });
        // }

        // if (nome) {
        //     query.andWhere('produto.nome LIKE :nome', { nome: `%${nome}%` });
        // }

        const opcoes = await query.getMany();
        return opcoes;
    }

    async createOpcao(CreateOpcaoDto: CreateOpcaoDto, tipoOpcao: TipoOpcao) : Promise<Opcao> {
        const opcao = new Opcao();
        console.log(opcao);
        opcao.nome = CreateOpcaoDto.nome;
        opcao.tipoOpcao = tipoOpcao;
        await opcao.save();

        return opcao;
    }

    async getOpcaoById(id: number): Promise<Opcao> {
        const query = this.createQueryBuilder('opcao');
        query.andWhere('opcao.id = :id ', { id });

        const result = await query.getMany();
        
        if (result.length === 0) {
            throw new NotFoundException(`Opção com o ID "${id}", não foi encontrado.`);
        }

        const opcao = result.shift();
        console.log(opcao);

        return opcao;
    }
}