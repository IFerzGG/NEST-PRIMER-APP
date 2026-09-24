import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Publico } from './decorators/publico.decorator.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Publico()
    @Post('register')
    @ApiOperation({summary:"Registra un Nuevo Usuario"})
    @ApiResponse({ status:201, description: 'Usuario Creado Exitosamente'})
    @ApiResponse({ status:400, description: 'Solicitud mal Formateada'})
    async register(@Body() data:CreateUserDto){
        return this.authService.register(data);
    }

    @Publico()
    @Post('login')
    @ApiOperation({summary:"Logea un Usuario Exsistente"})
    async login(@Body() data:LoginDto){
        return this.authService.login(data);
    }

    @Get('profile')
    @ApiOperation({summary:"Retorna Informacion del Usuario Logeado"})
    async profile(@Req() req:Request & {user: unknown}){
        return req.user;
    }
}
