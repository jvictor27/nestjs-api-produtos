import { NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { GetCategoriaFilterDto } from './dto/get-categoria-filter.dto';

@EntityRepository(Categoria)
export class CategoriaRepository extends Repository<Categoria> {

    async getCategorias(filterDto: GetCategoriaFilterDto): Promise<Categoria[]> {
        const { nome, descricao, categoriaPai } = filterDto;
        const query = this.createQueryBuilder('categoria');

        // query.where('categoria.usuario_id = :usuario_id', { usuario_id: usuario.id });

        if (descricao) {
            // query.andWhere('categoria.descricao = :descricao', { descricao });
            query.andWhere('categoria.descricao = LIKE :descricao', { descricao: `%${descricao}%` });
        }

        if (nome) {
            query.andWhere('categoria.nome LIKE :nome', { nome: `%${nome}%` });
        }

        const categorias = await query.getMany();
        return categorias;
    }

    async createCategoria(createCategoriaDto: CreateCategoriaDto) : Promise<Categoria> {
        const { nome, descricao, categoriaPai } = createCategoriaDto;
        const categoria = new Categoria();

        categoria.nome = nome;
        categoria.descricao = descricao;
        categoria.categoriaPai = null;

        if (categoriaPai) {
            // const query = this.createQueryBuilder('categoria');
            // query.andWhere('categoria.id = :id ', { id: categoriaPai });

            // const result = await query.getMany();
            
            // if (result.length === 0) {
            //     throw new NotFoundException(`CategoriaPai com o ID "${categoriaPai}", não foi encontrado.`);
            // }

            // const found = result.shift();
            const found = await this.getCategoriaById(categoriaPai);
            categoria.categoriaPai = found;
        }

        await categoria.save();

        console.log(categoria.nome);

        return categoria;
    }

    async getCategoriaById(id: number): Promise<Categoria> {
        const query = this.createQueryBuilder('categoria');
        query.andWhere('categoria.id = :id ', { id });

        const result = await query.getMany();
        
        if (result.length === 0) {
            throw new NotFoundException(`Categoria com o ID "${id}", não foi encontrado.`);
        }

        const categoria = result.shift();
        console.log(categoria);

        return categoria;
    }

    async getByCategoriaPaiId(id: number): Promise<Categoria[]> {
        const query = this.createQueryBuilder('categoria');
        query.andWhere('categoria.categoria_pai_id = :id ', { id });

        const result = await query.getMany();
        
        // if (result.length === 0) {
        //     throw new NotFoundException(`Categorias com o categoria pai ID "${id}", não foram encontradas.`);
        // }

        const categorias = result;

        return categorias;
    }
}