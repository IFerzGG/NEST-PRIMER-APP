import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxDate} from "class-validator";
import { EstadoPaciente } from "../../generated/prisma/enums.js";

export class CreatePacienteDto{
    @ApiProperty({
        example:'NombreCompleto',
        description:"Insertar Nombre al ser Creado",
    })
    @IsString({message:"El nombre es una cadena de texto"})
    @Transform(({value}) => value?.trim())
    @IsNotEmpty({message:"El nombre es obligatorio"})
    nombre:string;

    @ApiProperty({
        example:'NombreCompleto',
        description:"Insertar Nombre al ser Creado",
    })
    @IsString({message:"El nombre es una cadena de texto"})
    @Transform(({value}) => value?.trim())
    @IsNotEmpty({message:"El nombre es obligatorio"})
    apellido:string;

    @ApiPropertyOptional({
        enum:EstadoPaciente,
        example:'ACTIVO',
        description:"Insertar ",
    })
    @IsEnum(EstadoPaciente)
    @IsOptional()
    estado?:EstadoPaciente;

    @ApiProperty({
        example:'1970-01-20',
        description:'La Fecha debe ser Escrita Correctamente'
    })
    @IsNotEmpty({message:"La Fecha es obligatoria"})
    @Type(() => Date)
    @IsDate({ message: 'Debes proporcionar una fecha válida' })
    @MaxDate(new Date(),{message:"La Fecha no puede ser Futura"})
    fechaNacimiento:Date;

    @ApiProperty({
        example:'user@clinica.com.mx',
        description:"Ingresar el Correo Correctamente",
    })
    @IsEmail({},{message:"El email no tiene el formato correcto"})
    @IsNotEmpty({message:"El email es obligatorio"})
    email:string;

    @ApiProperty({
        example:'5532145453',
        description:"Ingresar el Telefono Correctamente",
    })
    @IsString()
    @Transform(({value}) => value?.trim())
    @IsNotEmpty({message:"El telefono no puede estar vacio"})
    telefono:string;
}