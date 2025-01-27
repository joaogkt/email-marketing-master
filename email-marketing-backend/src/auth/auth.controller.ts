import { Body, Controller, Post, Get, UseGuards, Request, Param  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassThrough } from 'stream';
import { JwtAuthGuard } from './jwt-auth.guard'; // Guard para proteger rotas privadas
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('register')
    async register(
        @Body('name') name:string,
        @Body('email') email:string,
        @Body('password') password:string,
    ) {
        return this.authService.register(name, email, password)
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.login(email, password)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req: any) {

        console.log('Usuário autenticado:', req.user);
        return req.user
    }

    @UseGuards(JwtAuthGuard)
    @Get('users')
    async getUsers(@Request() req: any) {
        return this.authService.findOneById(5)
    }

    @Get('user-with-company/:id')
    async getUserWithCompany(@Param('id') id: number) {
        return this.authService.findOneById(id);
}

}
