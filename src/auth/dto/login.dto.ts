import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example:'user@clinica.com.mx',
        description: 'El correo del usuario logeado'
    })
    @IsEmail({}, { message: 'el email debe estar en el formato correcto' })
    @IsNotEmpty({ message: 'el email es obligatorio' })
    email: string;
  
    @ApiProperty({
        example:'contraseña',
        description: 'La contraseña del usuario logeado'
    })
    @IsString({ message: 'password debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'password es obligatorio' })
    @MinLength(6, { message: 'la contraseña debe tener almenos 6 caracteres' })
    @Matches(/\S/, { message: 'La contraseña no puede contener solo espacios', })
    password: string;
}