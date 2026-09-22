import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Publico } from './decorators/publico.decorator.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Publico()
    @Post('register')
    async register(@Body() data:CreateUserDto){
        return this.authService.register(data);
    }

    @Publico()
    @Post('login')
    async login(@Body() data:LoginDto){
        return this.authService.login(data);
    }

    @Get('profile')
    async profile(@Req() req:Request & {user: unknown}){
        return req.user;
    }
}
