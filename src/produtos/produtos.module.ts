import { Module, forwardRef } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoRepository } from './produto.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { VariacoesModule } from 'src/variacoes/variacoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProdutoRepository,
    ]),
    AuthModule,
    CategoriasModule,
    forwardRef(() => VariacoesModule),
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService],
  exports: [ProdutosService],
})
export class ProdutosModule {}
