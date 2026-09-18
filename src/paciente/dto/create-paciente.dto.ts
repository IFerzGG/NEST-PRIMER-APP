import { Transform } from "class-transformer";
import {IsDateString, IsEmail, IsNotEmpty, IsString, Matches, MaxDate} from "class-validator";

export class CreatePacienteDto{
    @IsString({message:"El nombre es una cadena de texto"})
    @Transform(({value}) => value?.trim())
    @IsNotEmpty({message:"El nombre es obligatorio"})
    nombre:string;

    @IsNotEmpty({message:"La Fecha es obligatoria"})
    @IsDateString()
    @MaxDate(new Date(),{message:"La Fehca no puede ser Futura"})
    fechaNacimiento:Date;

    @IsEmail({},{message:"El email no tiene el formato correcto"})
    @IsNotEmpty({message:"El email es obligatorio"})
    email:string;

    @IsString()
    @Transform(({value}) => value?.trim())
    @IsNotEmpty({message:"El telefono no puede estar vacio"})
    telefono:string;
}