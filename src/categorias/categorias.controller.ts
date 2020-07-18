import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { GetCategoriaFilterDto } from './dto/get-categoria-filter.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './categoria.entity';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from 'src/auth/usuario.entity';
import { GetUsuario } from 'src/auth/get-usuario.decorator';
import { GetCategoriaDto } from './dto/get-categoria.dto';

@Controller('categorias')
@UseGuards(AuthGuard())
export class CategoriasController {
    constructor(private categoriasService: CategoriasService) {}

    @Get()
    getCategorias(@Query(ValidationPipe) filterDto: GetCategoriaFilterDto): Promise<GetCategoriaDto[]> {
        return this.categoriasService.getCategorias(filterDto);
    }

    @Get('/arvore')
    getCategoriasArvore(): Promise<GetCategoriaDto[]> {
        return this.categoriasService.getCategoriasArvore();
    }
    

    @Get('/:id')
    getCategoriaById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriasService.getCategoriaById(id);
    }

    @Get('/:id/filhas')
    getByCategoriaPaiId(@Param('id', ParseIntPipe) id: number): Promise<Categoria[]> {
        return this.categoriasService.getByCategoriaPaiId(id);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createCategoria(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    //     return this.categoriasService.createCategoria(createCategoriaDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createCategoria(@Body() createCategoriaDto: CreateCategoriaDto): Promise<GetCategoriaDto> {
        return this.categoriasService.createCategoria(createCategoriaDto);
    }

    @Delete('/:id')
    deleteCategoria(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.categoriasService.deleteCategoria(id);
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateCategoria(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
        return this.categoriasService.updateCategoria(id, updateCategoriaDto);
    }

}
