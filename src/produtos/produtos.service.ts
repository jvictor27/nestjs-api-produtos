import { Injectable, ParseUUIDPipe } from '@nestjs/common';
// import { ProdutoStatus } from './enum/situacao-produto.enum';
import { Produto } from './produto.model';
import * as uuid from 'uuid/v1';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
    private produtos: Produto[] = [];

    getAllProdutos(): Produto[] {
        return this.produtos;
    }

    getProdutosWithFilters(filterDto: GetProdutoFilterDto): Produto[] {
        const { situacao, nome } = filterDto;

        let produtos = this.getAllProdutos();

        if (situacao && nome) {
            produtos = produtos.filter(produto => produto.situacao === situacao && produto.nome === nome);
        } else if (situacao) {
            produtos = produtos.filter(produto => produto.situacao === situacao);
        } else if (nome) {
            produtos = produtos.filter(produto => produto.nome === nome);
        }

        return produtos;
    }

    getProductById(id: string): Produto {
        return this.produtos.find(produto => produto.id === id);
    }

    createProduto(createProdutoDto: CreateProdutoDto): Produto {
        const { nome, descricao, preco, situacao } = createProdutoDto;
        
        const produto: Produto = {
            id: uuid(),
            nome,
            descricao,
            preco,
            situacao
        };

        this.produtos.push(produto);
        return produto;
    }

    deleteProduct(id: string) {
        this.produtos = this.produtos.filter(produto => produto.id !== id);
    }

    updateProduto(id: string, updateProdutoDto: UpdateProdutoDto): Produto {
        const produto = this.getProductById(id);
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

        return produto;
    }
}
