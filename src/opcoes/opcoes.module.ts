import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { OpcoesController } from './opcoes.controller';
import { OpcoesService } from './opcoes.service';
import { OpcaoRepository } from './opcao.repository';
import { TiposOpcoesModule } from 'src/tiposopcoes/tipos-opcoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OpcaoRepository,
    ]),
    AuthModule,
    TiposOpcoesModule,
  ],
  controllers: [OpcoesController],
  providers: [OpcoesService],
  exports: [OpcoesService],
})
export class OpcoesModule {}
