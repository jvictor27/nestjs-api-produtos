import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './produto.model';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
    constructor(private produtosService: ProdutosService) {}

    @Get()
    getProdutos(@Query(ValidationPipe) filterDto: GetProdutoFilterDto): Produto[] {
        if (Object.keys(filterDto).length) {
            return this.produtosService.getProdutosWithFilters(filterDto);
        } else {
            return this.produtosService.getAllProdutos();
        }
    }

    @Get('/:id')
    getProdutoById(@Param('id') id: string): Produto {
        return this.produtosService.getProductById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createProduto(@Body() createProdutoDto: CreateProdutoDto): Produto {
        // console.log('body ', body);
        return this.produtosService.createProduto(createProdutoDto);
    }

    @Delete('/:id')
    deleteProduto(@Param('id') id: string): void {
        this.produtosService.deleteProduct(id);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateProduto(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto): Produto {
        // console.log(updateProdutoDto);
        return this.produtosService.updateProduto(id, updateProdutoDto);
    }
    
}
