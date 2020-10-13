import { Module, forwardRef } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteRepository } from './cliente.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { VariacoesModule } from 'src/variacoes/variacoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClienteRepository,
    ]),
    AuthModule,
    // CategoriasModule,
    // forwardRef(() => VariacoesModule),
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
