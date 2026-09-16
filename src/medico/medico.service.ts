import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

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
                throw new NotFoundException("Paciente no encontrado");
            }
            return resultado;
        }
    
        async create(data:{nombre:string, email:string, telefono:string, especialidadId:number}){
            return await this.prisma.medico.create({
                data,
            });
        }
    
        async update(id:number, data:{nombre?:string, email?:string, telefono?:string}){
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
