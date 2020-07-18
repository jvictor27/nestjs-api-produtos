import { Injectable, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoRepository } from './produto.repository';
import { CategoriaRepository } from '../categorias/categoria.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './produto.entity';
import { Usuario } from 'src/auth/usuario.entity';
import { Categoria } from '../categorias/categoria.entity';
import { CategoriasService } from '../categorias/categorias.service';

@Injectable()
export class ProdutosService {
    constructor (
        @InjectRepository(ProdutoRepository)
        private produtoRepository: ProdutoRepository,
        private categoriaRepository: CategoriaRepository,
        private categoriaService: CategoriasService,
    ) {}

    async getProdutos(filterDto: GetProdutoFilterDto, usuario: Usuario): Promise<Produto[]> {
        return this.produtoRepository.getProdutos(filterDto, usuario);
    }

    async getProductById(id: number, usuario: Usuario): Promise<Produto> {
        // const found = await this.produtoRepository.findOne({ where: { id, usuario_id: usuario.id } });

        // if (!found) {
        //     throw new NotFoundException(`Produto com o ID "${id}", não foi encontrado.`);
        // }

        const query = this.produtoRepository.createQueryBuilder('produto');
        query.andWhere('produto.id = :id ', { id });
        query.andWhere('produto.usuario_id = :usuario_id ', { usuario_id: usuario.id });

        const result = await query.getMany();
        
        if (result.length === 0) {
            throw new NotFoundException(`Produto com o ID "${id}", não foi encontrado.`);
        }

        const found = result.shift();

        return found;
    }

    async createProduto(createProdutoDto: CreateProdutoDto, usuario: Usuario): Promise<Produto> {
        const categoria = await this.categoriaService.getCategoriaById(createProdutoDto.categoriaId);
        const isCategoriaPai = await this.categoriaService.isCategoriaPai(createProdutoDto.categoriaId);
        if (isCategoriaPai) {
            throw new NotFoundException(`Você tentou vincular o produto "${createProdutoDto.nome}" diretamente a uma categoria pai, vincule-o a uma categoria filha.`);
        }
        return this.produtoRepository.createProduto(createProdutoDto, usuario, categoria);
    }

    async deleteProduct(id: number, usuario: Usuario): Promise<void> {
        const produto = await this.getProductById(id, usuario);
        const result = await this.produtoRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Produto com o ID "${id}", não foi encontrado.`);
        }
    }

    async updateProduto(id: number, updateProdutoDto: UpdateProdutoDto, usuario: Usuario): Promise<Produto> {
        const produto = await this.getProductById(id, usuario);
        const { nome, descricao, preco, situacao } = updateProdutoDto;
        
        if (nome) {
            produto.nome = nome;
        }

        if (descricao) {
            produto.descricao = descricao;
        }

        if (preco) {
            produto.preco = preco;
        }

        if (situacao) {
            produto.situacao = situacao;
        }

        await produto.save();

        return produto;
    }
}
