import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProdutosModule,
  ]
})
export class AppModule {}
