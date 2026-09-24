import {IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../generated/prisma/enums.js';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example:'NombreCompleto',
        description:"Insertar Nombre al ser Creado",
    })
    @IsString({message:"El nombre es una cadena de texto"})
    @Transform(({value}) => value?.trim())
    @IsNotEmpty({ message: 'el nombre es obligatorio' })
    name: string;
  
    @ApiProperty({
        example:'user@clinica.com.mx',
        description:"Ingresar el Correo Correctamente",
    })
    @IsEmail({},{message:"El email no tiene el formato correcto"})
    @IsNotEmpty({message:"El email es obligatorio"})
    email:string;
  
    @ApiProperty({
        example:'contraseña',
        description: 'La contraseña del usuario logeado'
    })
    @IsString({ message: 'password debe ser una cadena de texto' })
    @Transform(({value}) => value?.trim())
    @IsNotEmpty({ message: 'password es obligatorio' })
    @MinLength(6, { message: 'la contraseña debe tener almenos 6 caracteres' })
    password: string;
  
    @ApiProperty({
        example:'GERENCIA | RECEPCIONISTA | MEDICO',
        description: 'El Rol debe ser de algunos 3 del ejemplo'
    })
    @IsOptional()
    @IsEnum(Role, { message: 'El rol debe ser RECEPCIONISTA o MEDICO o GERENCIA' })
    role?: Role;
}
