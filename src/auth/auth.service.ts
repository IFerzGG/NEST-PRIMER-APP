import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UsersService } from '../users/users.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UsersService,
        private readonly configService: ConfigService,
    ){}

    async register(createUserDto:CreateUserDto){
        return await this.userService.create(createUserDto);
    }

    async login(loginDto:LoginDto){
        const user = await this.userService.findByEmail(loginDto.email);
        if(!user){
            throw new UnauthorizedException("Credenciales Incorrectas");
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password)
        if(!isMatch){
            throw new UnauthorizedException("Credenciales Incorrectas")
        }

        const secret = this.configService.getOrThrow<string>('JWT_SECRET');
        const expiresIn = this.configService.getOrThrow<string>('JWT_EXPIRES_IN');
        const options: SignOptions = {
            expiresIn: expiresIn as SignOptions['expiresIn'],
        };

        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role, nombre:user.nombre},
            secret,
            options,
        );

        return {token};
    }
}
