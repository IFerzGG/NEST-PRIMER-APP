import { Controller, Get } from '@nestjs/common';
import { MedicoService } from './medico.service.js';

@Controller('medico')
export class MedicoController {
    constructor(private readonly medicoService:MedicoService){}

    @Get()
    findAll(){
        return this.medicoService.findAll();
    }
}
