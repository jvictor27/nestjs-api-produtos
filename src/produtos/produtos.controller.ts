import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './produto.entity';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from 'src/auth/usuario.entity';
import { GetUsuario } from 'src/auth/get-usuario.decorator';

@Controller('produtos')
@UseGuards(AuthGuard())
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
    createProduto(@Body() createProdutoDto: CreateProdutoDto, @GetUsuario() usuario: Usuario): Promise<Produto> {
        return this.produtosService.createProduto(createProdutoDto, usuario);
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
