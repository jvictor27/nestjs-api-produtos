import { Repository, EntityRepository } from 'typeorm';
import { TipoOpcao } from './tipo-opcao.entity';
import { Usuario } from 'src/auth/usuario.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(TipoOpcao)
export class TipoOpcaoRepository extends Repository<TipoOpcao> {

    async getTiposOpcoes(): Promise<TipoOpcao[]> {
        // const { situacao, nome } = filterDto;
        const query = this.createQueryBuilder('tipo_opcao');

        // if (situacao) {
        //     query.andWhere('produto.situacao = :situacao', { situacao });
        // }

        // if (nome) {
        //     query.andWhere('produto.nome LIKE :nome', { nome: `%${nome}%` });
        // }

        const tiposOpcoes = await query.getMany();
        return tiposOpcoes;
    }

    async createTipoOpcao(tipoOpcao: TipoOpcao) : Promise<TipoOpcao> {
        const tipoOpcaoNovo = new TipoOpcao();
        console.log(tipoOpcao);
        tipoOpcaoNovo.nome = tipoOpcao.nome;
        await tipoOpcaoNovo.save();

        return tipoOpcaoNovo;
    }

    async getTipoOpcaoById(id: number): Promise<TipoOpcao> {
        const query = this.createQueryBuilder('tipo_opcao');
        query.andWhere('tipo_opcao.id = :id ', { id });

        const result = await query.getMany();
        
        if (result.length === 0) {
            throw new NotFoundException(`Tipo de opção com o ID "${id}", não foi encontrado.`);
        }

        const tipoOpcao = result.shift();
        console.log(tipoOpcao);

        return tipoOpcao;
    }
}