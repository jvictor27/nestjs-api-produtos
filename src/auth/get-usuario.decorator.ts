import { createParamDecorator } from '@nestjs/common';
import { Usuario } from './usuario.entity';

export const GetUsuario = createParamDecorator((data, req): Usuario => {
    return req.user;
});