import { Injectable, ParseUUIDPipe } from '@nestjs/common';
// import { ProdutoStatus } from './enum/situacao-produto.enum';
import { Produto } from './produto.model';
import * as uuid from 'uuid/v1';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutosService {
    private produtos: Produto[] = [];

    getAllProdutos(): Produto[] {
        return this.produtos;
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

    updateProduto(id: string, createProdutoDto: CreateProdutoDto): Produto {
        const produto = this.getProductById(id);
        const { nome, descricao, preco, situacao } = createProdutoDto;
        
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
