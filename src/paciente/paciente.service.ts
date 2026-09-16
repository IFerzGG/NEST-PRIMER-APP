import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

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

    async create(data:{nombre:string, fechaNacimiento:Date, email:string, telefono:string}){
        return await this.prisma.paciente.create({
            data,
        });
    }

    async update(id:number, data:{nombre?:string, fechaNacimiento?:Date, email?:string, telefono?:string}){
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
