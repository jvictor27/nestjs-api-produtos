import { Injectable, ParseUUIDPipe, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ProdutoRepository } from './produto.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './produto.entity';
import { Usuario } from 'src/auth/usuario.entity';
import { CategoriasService } from '../categorias/categorias.service';
import { VariacoesService } from 'src/variacoes/variacoes.service';
import { GetVariacaoDto } from 'src/variacoes/dto/get-variacao.dto';

import { GetProdutoDto } from './dto/get-produto.dto';
import { GetCategoriaSimplificadaDto } from 'src/categorias/dto/get-categoria-simplificada.dto';

@Injectable()
export class ProdutosService {
    constructor (
        @InjectRepository(ProdutoRepository)
        private produtoRepository: ProdutoRepository,
        private categoriaService: CategoriasService,
        @Inject(forwardRef(() => VariacoesService))
        private variacaoService: VariacoesService,
    ) {}

    async getProdutos(filterDto: GetProdutoFilterDto, usuario: Usuario): Promise<Produto[]> {
        return this.produtoRepository.getProdutos(filterDto, usuario);
    }

    async getProdutosDto(filterDto: GetProdutoFilterDto, usuario: Usuario): Promise<GetProdutoDto[]> {
        const produtos = await this.getProdutos(filterDto, usuario);
        return await this.parseProdutosToProdutosDto(produtos);
    }

    async getProdutoVariacoesDtoByProdutoId(id: number): Promise<GetVariacaoDto[]> {
        return await this.variacaoService.getProdutoVariacoesDtoById(id);
    }

    async getProdutoById(id: number, usuario: Usuario): Promise<Produto> {
        return await this.produtoRepository.getProdutoById(id, usuario);
    }

    async getProdutoDtoById(id: number, usuario: Usuario): Promise<GetProdutoDto> {
        const produto = await this.getProdutoById(id, usuario);
        return await this.parseProdutoToProdutoDto(produto);
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
        const produto = await this.getProdutoById(id, usuario);
        const result = await this.produtoRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Produto com o ID "${id}", não foi encontrado.`);
        }
    }

    async updateProduto(id: number, updateProdutoDto: UpdateProdutoDto, usuario: Usuario): Promise<Produto> {
        const produto = await this.getProdutoById(id, usuario);
        const { nome, descricao, preco, situacao, quantidade } = updateProdutoDto;

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

        if (quantidade) {
            produto.quantidade = quantidade;
        }

        await produto.save();

        return produto;
    }

    async parseProdutosToProdutosDto(produtos: Produto[]): Promise<GetProdutoDto[]> {
        const produtosDto: GetProdutoDto[] = [];
        for (const produto of produtos) {
            produtosDto.push(await this.parseProdutoToProdutoDto(produto));
        }
        return produtosDto;
    }

    async parseProdutoToProdutoDto(produto: Produto): Promise<GetProdutoDto> {
        const produtoDto: GetProdutoDto = new GetProdutoDto();
        produtoDto.id = produto.id;
        produtoDto.sku = produto.sku;
        produtoDto.nome = produto.nome;
        produtoDto.descricao = produto.descricao;
        produtoDto.preco = produto.preco;
        produtoDto.situacao = produto.situacao;
        produtoDto.quantidade = produto.quantidade;
        produtoDto.categorias = [];
        if (produto.categorias && produto.categorias.length > 0) {
            for (const categoria of produto.categorias) {
                const categoriaSimplificadaDto: GetCategoriaSimplificadaDto = new GetCategoriaSimplificadaDto();
                categoriaSimplificadaDto.id = categoria.id;
                categoriaSimplificadaDto.nome = categoria.nome;
                produtoDto.categorias.push(categoriaSimplificadaDto);
            }
        }

        produtoDto.variacoes = [];
        if (produto.variacoes && produto.variacoes.length > 0) {
            produtoDto.variacoes =  await this.getProdutoVariacoesDtoByProdutoId(produto.id);
        }
        return produtoDto;
    }
}
