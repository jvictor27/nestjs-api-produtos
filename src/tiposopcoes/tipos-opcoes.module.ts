import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TiposOpcoesController } from './tipos-opcoes.controller';
import { TiposOpcoesService } from './tipos-opcoes.service';
import { TipoOpcaoRepository } from './tipo-opcao.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TipoOpcaoRepository,
    ]),
    AuthModule,
  ],
  controllers: [TiposOpcoesController],
  providers: [TiposOpcoesService],
  exports: [TiposOpcoesService],
})
export class TiposOpcoesModule {}
