import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { GetProdutoFilterDto } from './dto/get-produto-filter.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './produto.entity';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from 'src/auth/usuario.entity';
import { GetUsuario } from 'src/auth/get-usuario.decorator';
import { Variacao } from 'src/variacoes/variacao.entity';
import { GetVariacaoDto } from 'src/variacoes/dto/get-variacao.dto';
import { GetProdutoDto } from './dto/get-produto.dto';

@Controller('produtos')
@UseGuards(AuthGuard())
export class ProdutosController {
    constructor(private produtosService: ProdutosService) {}

    @Get()
    getProdutos(@Query(ValidationPipe) filterDto: GetProdutoFilterDto, @GetUsuario() usuario: Usuario): Promise<GetProdutoDto[]> {
        return this.produtosService.getProdutosDto(filterDto, usuario);
    }

    @Get('/:id')
    getProdutoById(@Param('id', ParseIntPipe) id: number, @GetUsuario() usuario: Usuario): Promise<GetProdutoDto> {
        return this.produtosService.getProdutoDtoById(id, usuario);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createProduto(@Body() createProdutoDto: CreateProdutoDto, @GetUsuario() usuario: Usuario): Promise<Produto> {
        return this.produtosService.createProduto(createProdutoDto, usuario);
    }

    @Delete('/:id')
    deleteProduto(@Param('id', ParseIntPipe) id: number, @GetUsuario() usuario: Usuario): Promise<void> {
        return this.produtosService.deleteProduct(id, usuario);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateProduto(@Param('id', ParseIntPipe) id: number, @Body() updateProdutoDto: UpdateProdutoDto, @GetUsuario() usuario: Usuario): Promise<Produto> {
        return this.produtosService.updateProduto(id, updateProdutoDto, usuario);
    }

    @Get('/:id/variacoes')
    getProdutoVariacoesDtoByProdutoId(@Param('id', ParseIntPipe) id: number): Promise<GetVariacaoDto[]> {
        return this.produtosService.getProdutoVariacoesDtoByProdutoId(id);
    }

}
