import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaRepository } from './categoria.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
      TypeOrmModule.forFeature([
        CategoriaRepository,
      ]),
      AuthModule,
    ],
    controllers: [CategoriasController],
    providers: [CategoriasService],
  })
export class CategoriasModule {}
