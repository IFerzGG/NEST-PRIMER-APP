import {IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../../generated/prisma/enums.js';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsString({message:"El nombre es una cadena de texto"})
    @Transform(({value}) => value?.trim())
    @IsNotEmpty({ message: 'el nombre es obligatorio' })
    name: string;
  
    @IsEmail({},{message:"El email no tiene el formato correcto"})
    @IsNotEmpty({message:"El email es obligatorio"})
    email:string;
  
    @IsString({ message: 'password debe ser una cadena de texto' })
    @Transform(({value}) => value?.trim())
    @IsNotEmpty({ message: 'password es obligatorio' })
    @MinLength(6, { message: 'la contraseña debe tener almenos 6 caracteres' })
    password: string;
  
    @IsOptional()
    @IsEnum(Role, { message: 'El rol debe ser RECEPCIONISTA o MEDICO o GERENCIA' })
    role?: Role;
}
