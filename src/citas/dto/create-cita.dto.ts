import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString, MaxLength, Min, MinDate } from "class-validator";
import { EstadoUrgencia } from "../../generated/prisma/enums.js";

export class CreateCitaDto{
    @ApiProperty({
        example:'1',
        description:"Asignar el ID del paciente",
    })
    @Type(() => Number)
    @IsInt({message:"EL ID_Paciente debe ser un numero entero"})
    @Min(0,{message:"El ID_Paciente debe ser un numer positivo"})
    pacienteId:number;

    @ApiProperty({
        example:'5',
        description:"Asignar el ID del medico",
    })
    @Type(() => Number)
    @IsInt({message:"EL ID_Medico debe ser un numero entero"})
    @Min(0,{message:"El ID_Medico debe ser un numer positivo"})
    medicoId:number;

    @ApiProperty({
        example: '2026-11-15T16:00:00.000Z',
        description: 'Fecha y hora de la cita. No puede estar en el pasado',
        format: 'date-time',
    })
    @Type(() => Date)
    @IsDate({ message: 'La fecha de la cita debe ser una fecha válida',})
    @MinDate(new Date(),{ message: 'La fecha de la cita no puede estar en el pasado',})
    fecha:Date;

    @ApiProperty({
        example: 'Consulta general',
        description: 'Motivo de la cita',
        maxLength: 250,
    })
    @IsString({ message: 'El motivo debe ser una cadena de texto',})
    @IsNotEmpty({message: 'El motivo de la cita es obligatorio',})
    @MaxLength(250, { message: 'El motivo no puede superar los 250 caracteres',})
    motivo:string;

    @ApiProperty({
        enum: EstadoUrgencia,
        example: EstadoUrgencia.MEDIA,
        description: 'Nivel de urgencia de la cita',
    })
    @IsEnum(EstadoUrgencia, {message: 'La urgencia debe ser BAJA, MEDIA o ALTA',})
    urgencia:EstadoUrgencia;
}