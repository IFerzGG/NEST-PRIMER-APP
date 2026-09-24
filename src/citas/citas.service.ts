import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { PacienteService } from '../paciente/paciente.service.js';
import { MedicoService } from '../medico/medico.service.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';

@Injectable()
export class CitasService {
    constructor(
        private readonly prisma:PrismaService,
        private readonly pacienteService:PacienteService,
        private readonly medicoService:MedicoService
    ){}

    async create(data:CreateCitaDto){
        const paciente = await this.pacienteService.findId(data.pacienteId);
        if(!paciente){
            throw new NotFoundException("Paciente Inexistente");
        }

        const medico = await this.medicoService.findId(data.medicoId);
        if(!medico){
            throw new NotFoundException("Medico Inexistente")
        }
        
        return await this.prisma.cita.create({
            data,
        });
    }

    async findAll() {
        return await this.prisma.cita.findMany({
            orderBy:{id:"asc"},
        });
    }

    async findOne(id:number){
        const encontrado = await this.prisma.cita.findUnique({
            where:{id},
        });
        if(!encontrado){
            throw new NotFoundException("Cita No Encontrada");
        }
        return encontrado;
    }

    async update(id:number, data:UpdateCitaDto){
        const encontrado = await this.prisma.cita.findUnique({
            where:{id},
        });
        if(!encontrado){
            throw new NotFoundException("Cita No Encontrada");
        }

        return await this.prisma.cita.update({
            where:{id},
            data,
        });
    }

    async remove(id:number){
        const encontrado = await this.prisma.cita.findUnique({
            where:{id},
        });
        if(!encontrado){
            throw new NotFoundException("Cita No Encontrada");
        }

        return await this.prisma.cita.delete({
            where:{id},
        });
    }
}
