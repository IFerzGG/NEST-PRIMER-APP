import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

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
}