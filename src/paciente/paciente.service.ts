import { Injectable } from '@nestjs/common';
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
}
