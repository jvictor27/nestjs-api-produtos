import { Injectable, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { TipoOpcaoRepository } from './tipo-opcao.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/auth/usuario.entity';
import { TipoOpcao } from './tipo-opcao.entity';
import { GetTipoOpcaoDto } from './dto/get-tipo-opcao.dto';

@Injectable()
export class TiposOpcoesService {
    constructor (
        @InjectRepository(TipoOpcaoRepository)
        private tipoOpcaoRepository: TipoOpcaoRepository
    ) {}

    async getTiposOpcoes(): Promise<TipoOpcao[]> {
        return await this.tipoOpcaoRepository.getTiposOpcoes();
    }

    async getTipoOpcaoById(id: number): Promise<TipoOpcao> {
        // const found = await this.produtoRepository.findOne({ where: { id, usuario_id: usuario.id } });

        // if (!found) {
        //     throw new NotFoundException(`Produto com o ID "${id}", não foi encontrado.`);
        // }

        return await this.tipoOpcaoRepository.getTipoOpcaoById(id);

    }

    async createTipoOpcao(tipoOpcao: TipoOpcao): Promise<TipoOpcao> {
        return this.tipoOpcaoRepository.createTipoOpcao(tipoOpcao);
    }

}
