import { Injectable, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoRepository } from './produto.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './produto.entity';
import { Usuario } from 'src/auth/usuario.entity';

@Injectable()
export class ProdutosService {
    constructor (
        @InjectRepository(ProdutoRepository)
        private produtoRepository: ProdutoRepository,
    ) {}

    async getProdutos(filterDto: GetProdutoFilterDto, usuario: Usuario): Promise<Produto[]> {
        return this.produtoRepository.getProdutos(filterDto, usuario);
    }

    async getProductById(id: number): Promise<Produto> {
        const found = await this.produtoRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Produto com o ID "${id}", não foi encontrado.`);
        }

        return found;
    }

    async createProduto(createProdutoDto: CreateProdutoDto, usuario: Usuario): Promise<Produto> {
        return this.produtoRepository.createProduto(createProdutoDto, usuario);
    }

    async deleteProduct(id: number): Promise<void> {
        const result = await this.produtoRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Produto com o ID "${id}", não foi encontrado.`);
        }
    }

    async updateProduto(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
        const produto = await this.getProductById(id);
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
