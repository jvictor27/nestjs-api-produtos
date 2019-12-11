import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'dev',
    password: '123456',
    database: 'product_management',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
};