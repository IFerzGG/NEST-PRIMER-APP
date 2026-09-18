import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, Min } from "class-validator";

export class CreateMedicoDto{
    @IsString({message:"El nombre es una cadena de texto"})
    @IsNotEmpty({message:"El nombre es obligatorio"})
    @Matches(/\s/,{message:"El nombre no puede estar vacio"})
    nombre:string;

    @IsEmail({},{message:"El email no tiene el formato correcto"})
    @IsNotEmpty({message:"El email es obligatorio"})
    email:string;

    @IsString()
    @Matches(/\s/,{message:"El telefono no puede estar vacio"})
    @IsNotEmpty({message:"El telefono es obligatorio"})
    telefono:string;

    @Type(() => Number)
    @IsInt({message:"El id_especialidad debe ser un numero entero"})
    @Min(0,{message:"El id_especialidad debe ser un numero positivo"})
    especialidadId:number;
}