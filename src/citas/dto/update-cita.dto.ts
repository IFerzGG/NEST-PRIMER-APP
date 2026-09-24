import { PartialType } from "@nestjs/swagger";
import { CreateCitaDto } from "./create-cita.dto.js";

export class UpdateCitaDto extends PartialType(CreateCitaDto){}