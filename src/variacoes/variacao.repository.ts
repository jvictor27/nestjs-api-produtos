import { Repository, EntityRepository } from 'typeorm';
import { Variacao } from './variacao.entity';
import { Usuario } from 'src/auth/usuario.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateVariacaoDto } from './dto/create-variacao.dto';
import { TipoOpcao } from 'src/tiposopcoes/tipo-opcao.entity';
import { Produto } from 'src/produtos/produto.entity';
import { Opcao } from 'src/opcoes/opcao.entity';

@EntityRepository(Variacao)
export class VariacaoRepository extends Repository<Variacao> {

    async getVariacoesByProdutoId(id: number): Promise<Variacao[]> {

        const query = this.createQueryBuilder('variacao');
        query.andWhere('variacao.produto.id = :id ', { id });

        query.leftJoinAndSelect('variacao.opcoes', 'opcao');

        const variacoes = await query.getMany();
        return variacoes;
    }

    async createVariacao(createVariacaoDto: CreateVariacaoDto, produto: Produto, opcoes: Opcao[]): Promise<Variacao> {
        const variacao = new Variacao();
        variacao.sku = createVariacaoDto.sku;
        variacao.quantidade = createVariacaoDto.quantidade;
        variacao.produto = produto;
        variacao.opcoes = opcoes;
        await variacao.save();

        return variacao;
    }

    async getVariacaoById(variacaoId: number, produtoId: number): Promise<Variacao> {
        const query = this.createQueryBuilder('variacao');
        query.andWhere('variacao.id = :variacaoId ', { variacaoId });
        query.andWhere('variacao.produto_id = :produtoId ', { produtoId });
        query.leftJoinAndSelect('variacao.opcoes', 'opcao');

        const result = await query.getMany();

        if (result.length === 0) {
            throw new NotFoundException(`Variação com o ID "${variacaoId}" para produto com "${produtoId}", não foi encontrado.`);
        }

        const variacao = result.shift();

        return variacao;
    }
}