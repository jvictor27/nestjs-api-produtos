import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './produto.model';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Controller('produtos')
export class ProdutosController {
    constructor(private produtosService: ProdutosService) {}

    @Get()
    getAllProdutos(): Produto[] {
        return this.produtosService.getAllProdutos();
    }

    @Get('/:id')
    getProdutoById(@Param('id') id: string): Produto {
        return this.produtosService.getProductById(id);
    }

    @Post()
    createProduto(@Body() createProdutoDto: CreateProdutoDto): Produto {
        // console.log('body ', body);
        return this.produtosService.createProduto(createProdutoDto);
    }

    @Delete('/:id')
    deleteProduto(@Param('id') id: string): void {
        this.produtosService.deleteProduct(id);
    }

    @Patch('/:id')
    updateProduto(@Param('id') id: string, @Body() createProdutoDto: CreateProdutoDto): Produto {
        // console.log(createProdutoDto);
        return this.produtosService.updateProduto(id, createProdutoDto);
    }
    
}
