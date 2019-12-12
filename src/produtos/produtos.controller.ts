import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './produto.entity';

@Controller('produtos')
export class ProdutosController {
    constructor(private produtosService: ProdutosService) {}

    @Get()
    getProdutos(@Query(ValidationPipe) filterDto: GetProdutoFilterDto): Promise<Produto[]> {
        return this.produtosService.getProdutos(filterDto);
    }

    @Get('/:id')
    getProdutoById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
        return this.produtosService.getProductById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createProduto(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
        return this.produtosService.createProduto(createProdutoDto);
    }

    @Delete('/:id')
    deleteProduto(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.produtosService.deleteProduct(id);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateProduto(@Param('id', ParseIntPipe) id: number, @Body() updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
        return this.produtosService.updateProduto(id, updateProdutoDto);
    }

}
