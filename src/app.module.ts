import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProdutosModule,
    AuthModule,
    CategoriasModule,
  ]
})
export class AppModule {}
