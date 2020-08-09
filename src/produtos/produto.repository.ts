import { Repository, EntityRepository } from 'typeorm';
import { Produto } from './produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';
import { Usuario } from 'src/auth/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { NotFoundException } from '@nestjs/common';

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
        // query.relation('categorias');
        query.leftJoinAndSelect('produto.categorias', 'categoria');
        query.leftJoinAndSelect('produto.variacoes', 'variacao');

        const produtos = await query.getMany();
        return produtos;
    }

    async getProdutoById(id: number, usuario: Usuario): Promise<Produto> {
        const query = this.createQueryBuilder('produto');
        query.andWhere('produto.id = :id ', { id });
        query.andWhere('produto.usuario_id = :usuario_id ', { usuario_id: usuario.id });
        query.leftJoinAndSelect('produto.categorias', 'categoria');
        query.leftJoinAndSelect('produto.variacoes', 'variacao');

        const result = await query.getMany();

        if (result.length === 0) {
            throw new NotFoundException(`Produto com o ID "${id}", não foi encontrado.`);
        }

        const found = result.shift();

        return found;
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

    async updateProduto(createProdutoDto: CreateProdutoDto, usuario: Usuario, categoria: Categoria) : Promise<Produto> {
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