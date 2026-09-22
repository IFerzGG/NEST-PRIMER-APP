import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UsersService){}

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

        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role, nombre:user.nombre},
            process.env.JWT_SECRET as string,
            {expiresIn: '8h'},
        );

        return {token};
    }
}
