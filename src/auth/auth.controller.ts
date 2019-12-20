import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { SingUpUsuarioDto } from './dto/singup-usuario.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

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

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
    }
}
