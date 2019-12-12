import { Repository, EntityRepository } from 'typeorm';
import { Produto } from './produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';

@EntityRepository(Produto)
export class ProdutoRepository extends Repository<Produto> {

    async getProdutos(filterDto: GetProdutoFilterDto): Promise<Produto[]> {
        const { situacao, nome } = filterDto;
        const query = this.createQueryBuilder('produto');

        if (situacao) {
            query.andWhere('produto.situacao = :situacao', { situacao });
        }

        if (nome) {
            query.andWhere('produto.nome LIKE :nome', { nome: `%${nome}%` });
        }

        const produtos = await query.getMany();
        return produtos;
    }

    async createProduto(createProdutoDto: CreateProdutoDto) : Promise<Produto> {
        const { nome, descricao, preco, situacao } = createProdutoDto;
        const produto = new Produto();

        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        produto.situacao = situacao;
        await produto.save();

        return produto;
    }
}