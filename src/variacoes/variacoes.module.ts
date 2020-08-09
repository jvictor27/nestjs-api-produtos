import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { VariacoesController } from './variacoes.controller';
import { VariacoesService } from './variacoes.service';
import { VariacaoRepository } from './variacao.repository';
import { ProdutosModule } from 'src/produtos/produtos.module';
import { OpcoesModule } from 'src/opcoes/opcoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VariacaoRepository,
    ]),
    AuthModule,
    forwardRef(() => ProdutosModule),
    OpcoesModule,
  ],
  controllers: [VariacoesController],
  providers: [VariacoesService],
  exports: [VariacoesService],
})
export class VariacoesModule {}
