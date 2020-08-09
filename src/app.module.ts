import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';
import { TiposOpcoesModule } from './tiposopcoes/tipos-opcoes.module';
import { OpcoesModule } from './opcoes/opcoes.module';
import { VariacoesModule } from './variacoes/variacoes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProdutosModule,
    AuthModule,
    CategoriasModule,
    TiposOpcoesModule,
    OpcoesModule,
    VariacoesModule,
  ]
})
export class AppModule {}
