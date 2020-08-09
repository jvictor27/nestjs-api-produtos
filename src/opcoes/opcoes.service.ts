import { Injectable, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { OpcaoRepository } from './opcao.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/auth/usuario.entity';
import { Opcao } from './opcao.entity';
import { GetOpcaoDto } from './dto/get-opcao.dto';
import { CreateOpcaoDto } from './dto/create-opcao.dto';
import { TiposOpcoesService } from 'src/tiposopcoes/tipos-opcoes.service';

@Injectable()
export class OpcoesService {
    constructor (
        @InjectRepository(OpcaoRepository)
        private opcaoRepository: OpcaoRepository,
        private tiposOpcoesService: TiposOpcoesService,
    ) {}

    async getOpcoes(): Promise<Opcao[]> {
        return await this.opcaoRepository.getOpcoes();
    }

    async getOpcaoById(id: number): Promise<Opcao> {
        // const found = await this.produtoRepository.findOne({ where: { id, usuario_id: usuario.id } });

        // if (!found) {
        //     throw new NotFoundException(`Produto com o ID "${id}", não foi encontrado.`);
        // }

        return await this.opcaoRepository.getOpcaoById(id);

    }

    async createOpcao(createOpcaoDto: CreateOpcaoDto): Promise<Opcao> {
        const tipoOpcao = await this.tiposOpcoesService.getTipoOpcaoById(createOpcaoDto.tipoOpcaoId);
        return await this.opcaoRepository.createOpcao(createOpcaoDto, tipoOpcao);
    }

    async getOpcoesDto(): Promise<GetOpcaoDto[]> {
        const opcoes = await this.opcaoRepository.getOpcoes();
        const opcoesDto: GetOpcaoDto[] = await this.parseOpcoesToOpcoesDto(opcoes);
        return opcoesDto;
    }

    async getOpcaoDtoById(id: number): Promise<GetOpcaoDto> {
        const opcaoDto = new GetOpcaoDto();
        const opcao = await this.opcaoRepository.getOpcaoById(id);
        const tipoOpcao = await this.tiposOpcoesService.getTipoOpcaoById(opcao.tipoOpcaoId);
        opcaoDto.idTipoOpcao = tipoOpcao.id;
        opcaoDto.nomeTipoOpcao = tipoOpcao.nome;
        opcaoDto.idOpcao = opcao.id;
        opcaoDto.nomeOpcao = opcao.nome;
        return opcaoDto;

    }

    async parseOpcoesToOpcoesDto(opcoes: Opcao[]): Promise<GetOpcaoDto[]> {
        const opcoesDto: GetOpcaoDto[] = [];
        for (const opcao of opcoes) {
            opcoesDto.push(await this.parseOpcaoToOpcaoDto(opcao));
        }
        return opcoesDto;
    }

    async parseOpcaoToOpcaoDto(opcao: Opcao): Promise<GetOpcaoDto> {
        const opcaoDto: GetOpcaoDto = new GetOpcaoDto();
        const tipoOpcao = await this.tiposOpcoesService.getTipoOpcaoById(opcao.tipoOpcaoId);
        opcaoDto.idTipoOpcao = tipoOpcao.id;
        opcaoDto.nomeTipoOpcao = tipoOpcao.nome;
        opcaoDto.idOpcao = opcao.id;
        opcaoDto.nomeOpcao = opcao.nome;
        return opcaoDto;
    }


    // async function asyncForEach(array, callback) {
    //     for (let index = 0; index < array.length; index++) {
    //       await callback(array[index], index, array);
    //     }
    // }

}
