import { Controller, Get } from '@nestjs/common';
import { PacienteService } from './paciente.service.js';

@Controller('paciente')
export class PacienteController {
    constructor(private readonly pacienteService:PacienteService){}

    @Get()
    findAll(){
        return this.pacienteService.findAll();
    }
}
