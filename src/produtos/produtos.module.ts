import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoRepository } from './produto.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProdutoRepository
    ])
  ]
  controllers: [ProdutosController],
  providers: [ProdutosService]
})
export class ProdutosModule {}
