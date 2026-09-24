import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { PacienteService } from '../paciente/paciente.service.js';
import { MedicoService } from '../medico/medico.service.js';

@Injectable()
export class CitasService {
    constructor(
        private readonly prisma:PrismaService,
        private readonly pacienteService:PacienteService,
        private readonly medicoService:MedicoService
    ){}

    async create(data:{pacienteId:number, medicoId:number}){
        const paciente = await this.pacienteService.findId(data.pacienteId);
        if(!paciente){
            throw new NotFoundException("Paciente Inexistente");
        }

        const medico = await this.medicoService.findId(data.medicoId);
        if(!medico){
            throw new NotFoundException("Medico Inexistente")
        }
        
        return this.prisma.cita.create({
            data,
        });
    }

    async findAll() {
        return await this.prisma.cita.findMany({
            orderBy:{id:"asc"},
        });
    }
}
