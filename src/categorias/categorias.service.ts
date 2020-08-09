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
    constructor(
        @InjectRepository(CategoriaRepository)
        private categoriaRepository: CategoriaRepository,
    ) { }

    // async getCategorias(filterDto: GetCategoriaFilterDto): Promise<Categoria[]> {
    //     return this.categoriaRepository.getCategorias(filterDto);
    // }

    // async getCategorias(filterDto: GetCategoriaFilterDto): Promise<GetCategoriaDto[]> {
    //     const categorias = await this.categoriaRepository.getCategorias(new GetCategoriaFilterDto());
    //     const categoriasPath = await this.withPath(categorias);
    //     let getCategoriaFilterDto:  GetCategoriaFilterDto[];
    //     // console.log(await this.toArvore(categoriasPath, null));
    //     await this.toArvore(categoriasPath, null);
    //     return categoriasPath;
    // }

    async getCategorias(filterDto: GetCategoriaFilterDto): Promise<GetCategoriaDto[]> {
        const categorias = await this.categoriaRepository.getCategorias(new GetCategoriaFilterDto());
        return await this.withPath(categorias);
    }

    async getCategoriasArvore() {
        const categorias = await this.categoriaRepository.getCategorias(new GetCategoriaFilterDto());
        return await this.toArvore(await this.withPath(categorias), null);
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

        categoria.nome = categoriaCreated.nome;
        categoria.descricao = categoriaCreated.descricao;
        if (categoriaCreated.categoriaPai) {
            categoria.categoriaPaiId = categoriaCreated.categoriaPai.id;
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

    async getByCategoriaPaiId(id: number): Promise<Categoria[]> {
        const categorias = await this.categoriaRepository.getByCategoriaPaiId(id);
        if (categorias.length === 0) {
            throw new NotFoundException(`Categorias com o categoria pai ID "${id}", não foram encontradas.`);
        }

        return categorias;
    }

    async isCategoriaPai(id: number): Promise<boolean> {
        let isCategoriaPai = true;
        const categorias = await this.categoriaRepository.getByCategoriaPaiId(id);
        if (categorias.length === 0) {
            isCategoriaPai = false;
        }

        return isCategoriaPai;
    }

    // async findAll(): Promise<GetCategoriaDto[]> {
    //     const categorias = await this.getCategorias(new GetCategoriaFilterDto());
    //     return this.withPath(categorias);
    // }

    async withPath(categorias: Categoria[]): Promise<GetCategoriaDto[]> {
        const getCategoriaPai = (categorias, categoriaPaiId) => {
            const categoriaPai = categorias.filter(categoriaPai => categoriaPai.id === categoriaPaiId);
            return categoriaPai.length ? categoriaPai[0] : null;
        }

        const categoriasWithPath = categorias.map(categoria => {
            let categoriaPath = categoria.nome;
            let categoriaPai = getCategoriaPai(categorias, categoria.categoriaPaiId)

            while(categoriaPai) {
                categoriaPath = `${categoriaPai.nome} > ${categoriaPath}`;
                categoriaPai = getCategoriaPai(categorias, categoriaPai.categoriaPaiId);
            }

            let categoriaWithPath = new GetCategoriaDto();
            categoriaWithPath = { ...categoria, categoriaPath, categoriaArvore: null };
            // return { ...categoria, path }
            return categoriaWithPath;
        });

        // categoriasWithPath.sort((a, b) => {
        //     if(a.categoriaPath < b.categoriaPath) return -1;
        //     if(a.categoriaPath > b.categoriaPath) return 1;
        //     return offscreenBuffering;
        // });

        return categoriasWithPath;
    }



    toArvore(categorias: GetCategoriaDto[], arvore: GetCategoriaDto[]) {
        if(!arvore) arvore =  categorias.filter( categoria => !categoria.categoriaPaiId);

        // const arvoreRetorno = arvore.map(async galhoPai => {
        //     const isChild = node => node.categoriaPaiId == galhoPai.id;
        //     // const galhoPai = new GetCategoriaDto();
        //     galhoPai = {...galhoPai};
        //     galhoPai.categoriaArvore = await this.toArvore(categorias, categorias.filter(isChild));
        //     return galhoPai;
        // });

        arvore = arvore.map( galhoPai => {
            const isChild = node => node.categoriaPaiId == galhoPai.id;
            galhoPai.categoriaArvore =  this.toArvore(categorias, categorias.filter(isChild));
            return galhoPai;
        });


        return arvore;
    }
}
