import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SingUpUsuarioDto } from './dto/singup-usuario.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) {}

    @Post('/singup')
    async singUp(@Body(ValidationPipe) singUpUsuarioDto: SingUpUsuarioDto): Promise<void> {
        return this.authService.singUp(singUpUsuarioDto);
    }

    @Post('/singin')
    async singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.singIn(authCredentialsDto);
    }
}
