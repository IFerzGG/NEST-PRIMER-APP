import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';

@Injectable()
export class MedicoService {
    constructor(private readonly prisma:PrismaService){}

    async findAll(){
        return await this.prisma.medico.findMany({
            orderBy:{id:"asc"}
        });
    }

    async findId(id:number){
            const resultado = await this.prisma.medico.findUnique({
                where:{id}
            });
            if(!resultado){
                throw new NotFoundException("Medico no encontrado");
            }
            return resultado;
        }
    
        async create(data:CreateMedicoDto){
            return await this.prisma.medico.create({
                data,
            });
        }
    
        async update(id:number, data:UpdateMedicoDto){
            const encontrado = await this.prisma.medico.findUnique({
                where:{id},
            });
            if(!encontrado){
                throw new NotFoundException("Paciente no encontrado");
            }
            return await this.prisma.medico.update({
                where:{id},
                data,
            });
        }
    
        async remove(id:number){
            const encontrado = await this.prisma.medico.findUnique({
                where:{id},
            });
            if(!encontrado){
                throw new NotFoundException("Paciente no encontrado");
            }
            return await this.prisma.medico.delete({
                where:{id},
            });
        }
}
