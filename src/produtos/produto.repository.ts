import { Repository, EntityRepository } from 'typeorm';
import { Produto } from './produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';
import { Usuario } from 'src/auth/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';

@EntityRepository(Produto)
export class ProdutoRepository extends Repository<Produto> {

    async getProdutos(filterDto: GetProdutoFilterDto, usuario: Usuario): Promise<Produto[]> {
        const { situacao, nome } = filterDto;
        const query = this.createQueryBuilder('produto');

        query.where('produto.usuario_id = :usuario_id', { usuario_id: usuario.id });

        if (situacao) {
            query.andWhere('produto.situacao = :situacao', { situacao });
        }

        if (nome) {
            query.andWhere('produto.nome LIKE :nome', { nome: `%${nome}%` });
        }

        const produtos = await query.getMany();
        return produtos;
    }

    async createProduto(createProdutoDto: CreateProdutoDto, usuario: Usuario, categoria: Categoria) : Promise<Produto> {
        const { nome, descricao, preco, situacao, categoriaId } = createProdutoDto;
        const produto = new Produto();

        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        produto.situacao = situacao;
        produto.usuario = usuario;
        produto.categorias = [categoria];
        await produto.save();
        delete produto.usuario;

        return produto;
    }
}