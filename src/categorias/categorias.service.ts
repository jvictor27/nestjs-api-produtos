import { Injectable, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { GetCategoriaFilterDto } from './dto/get-categoria-filter.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { CategoriaRepository } from './categoria.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './categoria.entity';
import { Usuario } from 'src/auth/usuario.entity';
import { GetCategoriaDto } from './dto/get-categoria.dto';

@Injectable()
export class CategoriasService {
    constructor (
        @InjectRepository(CategoriaRepository)
        private categoriaRepository: CategoriaRepository,
    ) {}

    async getCategorias(filterDto: GetCategoriaFilterDto): Promise<Categoria[]> {
        return this.categoriaRepository.getCategorias(filterDto);
    }

    async getCategoriaById(id: number): Promise<Categoria> {

        // if (!found) {
        //     throw new NotFoundException(`Categoria com o ID "${id}", não foi encontrado.`);
        // }

        return this.categoriaRepository.getCategoriaById(id);
    }

    // async createCategoria(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    //     return this.categoriaRepository.createCategoria(createCategoriaDto);
    // }

    async createCategoria(createCategoriaDto: CreateCategoriaDto): Promise<GetCategoriaDto> {
        const categoriaCreated = await this.categoriaRepository.createCategoria(createCategoriaDto);
        const categoria = new GetCategoriaDto();

        // console.log(categoriaCreated.nome);

        categoria.nome = categoriaCreated.nome;
        categoria.descricao = categoriaCreated.descricao;
        if (categoriaCreated.categoriaPai) {
            categoria.categoriaPai = categoriaCreated.categoriaPai.id;
        }

        return categoria;
    }

    async deleteCategoria(id: number): Promise<void> {
        const categoria = await this.getCategoriaById(id);
        const result = await this.categoriaRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Categoria com o ID "${id}", não foi encontrado.`);
        }
    }

    async updateCategoria(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
        const categoria = await this.getCategoriaById(id);
        const { nome, descricao, categoriaPai } = updateCategoriaDto;
        
        if (nome) {
            categoria.nome = nome;
        }

        if (descricao) {
            categoria.descricao = descricao;
        }

        if (categoriaPai) {
            categoria.categoriaPai = await this.categoriaRepository.getCategoriaById(categoriaPai);
        }

        await categoria.save();

        return categoria;
    }
}
