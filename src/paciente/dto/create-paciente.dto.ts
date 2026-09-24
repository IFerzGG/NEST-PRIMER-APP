import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {IsDateString, IsEmail, IsNotEmpty, IsString, Matches, MaxDate} from "class-validator";

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
        example:'1970-20-01',
        description:'La Fecha debe ser Escrita Correctamente'
    })
    @IsNotEmpty({message:"La Fecha es obligatoria"})
    @IsDateString({},{message:'La fecha debe tener el format correcto'})
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