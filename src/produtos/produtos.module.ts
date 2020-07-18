import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoRepository } from './produto.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriaRepository } from 'src/categorias/categoria.repository';
import { CategoriasService } from 'src/categorias/categorias.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProdutoRepository,
      CategoriaRepository
    ]),
    AuthModule,
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService, CategoriasService],
})
export class ProdutosModule {}
