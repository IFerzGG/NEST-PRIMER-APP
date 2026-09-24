import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, Min } from "class-validator";

export class CreateMedicoDto{
    @ApiProperty({
        example:'NombreCompleto',
        description:"Insertar Nombre al ser Creado",
    })
    @IsString({message:"El nombre es una cadena de texto"})
    @Transform(({value}) => value?.trim())
    @IsNotEmpty({message:"El nombre es obligatorio"})
    nombre:string;

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
    @Matches(/.*\S.*/,{message:"El telefono no puede estar vacio"})
    @IsNotEmpty({message:"El telefono es obligatorio"})
    telefono:string;

    @ApiProperty({
        example:'1',
        description:"Ingresar el ID_Especialidad Correctamente",
    })
    @Type(() => Number)
    @IsInt({message:"El id_especialidad debe ser un numero entero"})
    @Min(0,{message:"El id_especialidad debe ser un numero positivo"})
    especialidadId:number;
}