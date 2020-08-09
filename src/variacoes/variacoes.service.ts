import { Injectable, ParseUUIDPipe, NotFoundException, BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { VariacaoRepository } from './variacao.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/auth/usuario.entity';
import { Variacao } from './variacao.entity';
import { Opcao } from 'src/opcoes/opcao.entity';
import { GetVariacaoDto } from './dto/get-variacao.dto';
import { CreateVariacaoDto } from './dto/create-variacao.dto';
import { ProdutosService } from 'src/produtos/produtos.service';
import { OpcoesService } from 'src/opcoes/opcoes.service';
import { UpdateProdutoDto } from 'src/produtos/dto/update-produto.dto';

@Injectable()
export class VariacoesService {
    constructor (
        @InjectRepository(VariacaoRepository)
        private variacaoRepository: VariacaoRepository,
        private opcoesService: OpcoesService,
        @Inject(forwardRef(() => ProdutosService))
        private produtosService: ProdutosService,
    ) {}

    // async getOpcoes(): Promise<GetOpcaoDto[]> {
    //     return await this.opcaoRepository.getOpcoes();
    // }

    // async getOpcaoById(id: number): Promise<GetOpcaoDto> {
    //     // const found = await this.produtoRepository.findOne({ where: { id, usuario_id: usuario.id } });

    //     // if (!found) {
    //     //     throw new NotFoundException(`Produto com o ID "${id}", não foi encontrado.`);
    //     // }

    //     return await this.opcaoRepository.getOpcaoById(id);

    // }

    async getVariacoesByProdutoId(id: number): Promise<Variacao[]> {
        return await this.variacaoRepository.getVariacoesByProdutoId(id);
    }

    async getProdutoVariacoesDtoById(id: number): Promise<GetVariacaoDto[]> {
        const variacoes = await this.variacaoRepository.getVariacoesByProdutoId(id);
        return await this.parseVariacoesToVariacoesDto(variacoes);
    }

    async createVariacao(productId: number, createVariacaoDto: CreateVariacaoDto, usuario: Usuario): Promise<GetVariacaoDto> {
        const produto = await this.produtosService.getProdutoById(productId, usuario);
        const found = createVariacaoDto.opcoes.filter(element => element == createVariacaoDto[0]);

        if (found.length > 1) {
            throw new BadRequestException(`Você tentou cadastrar uma variação com opções do mesmo tipo, mas variação deve ser composta por opções de tipos diferentes. Ex: cor e tamanho.`);
        }
        const opcoes: Opcao[] = [];

        for (const opcao of createVariacaoDto.opcoes) {
            const opcaoId = opcao.opcaoId;
            opcoes.push(await this.opcoesService.getOpcaoById(opcaoId));
        }

        const variacao = await this.variacaoRepository.createVariacao(createVariacaoDto, produto, opcoes);

        const variacaoDto = await this.parseVariacaoToVariacaoDto(variacao);

        const updateProdutoDto: UpdateProdutoDto = new UpdateProdutoDto();
        updateProdutoDto.quantidade = produto.quantidade + createVariacaoDto.quantidade;

        await this.produtosService.updateProduto(productId, updateProdutoDto, usuario);

        return variacaoDto;
    }

    async parseVariacoesToVariacoesDto(variacoes: Variacao[]): Promise<GetVariacaoDto[]> {
        const variacoesDto: GetVariacaoDto[] = [];
        for (const variacao of variacoes) {
            variacoesDto.push(await this.parseVariacaoToVariacaoDto(variacao));
        }
        return variacoesDto;
    }

    async parseVariacaoToVariacaoDto(variacao: Variacao): Promise<GetVariacaoDto> {
        const variacaoDto: GetVariacaoDto = new GetVariacaoDto();
        variacaoDto.id = variacao.id;
        variacaoDto.sku = variacao.sku;
        variacaoDto.produtoId = variacao.produtoId;
        variacaoDto.quantidade = variacao.quantidade;
        variacaoDto.opcoes =  await this.opcoesService.parseOpcoesToOpcoesDto(variacao.opcoes);
        return variacaoDto;
    }


}
