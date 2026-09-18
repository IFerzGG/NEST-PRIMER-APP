import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';

@Injectable()
export class PacienteService {
    constructor(private readonly prisma:PrismaService){}

    async findAll() {
        const resultado = await this.prisma.paciente.findMany({
            orderBy: {id:"asc"}
        });
        return resultado;
    }

    async findId(id:number){
        const resultado = await this.prisma.paciente.findUnique({
            where:{id}
        });
        if(!resultado){
            throw new NotFoundException("Paciente no encontrado");
        }
        return resultado;
    }

    async create(data:CreatePacienteDto){
        const fecha = new Date(data.fechaNacimiento);
        if(fecha > new Date()){
            throw new BadRequestException("La fecha no puede ser futura")
        }
        
        return await this.prisma.paciente.create({
            data,
        });
    }

    async update(id:number, data:UpdatePacienteDto){
        const encontrado = await this.prisma.paciente.findUnique({
            where:{id},
        });
        if(!encontrado){
            throw new NotFoundException("Paciente no encontrado");
        }
        return await this.prisma.paciente.update({
            where:{id},
            data,
        });
    }

    async remove(id:number){
        const encontrado = await this.prisma.paciente.findUnique({
            where:{id},
        });
        if(!encontrado){
            throw new NotFoundException("Paciente no encontrado");
        }
        return await this.prisma.paciente.delete({
            where:{id},
        });
    }
}
