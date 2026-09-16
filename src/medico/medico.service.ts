import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MedicoService {
    constructor(private readonly prisma:PrismaService){}

    async findAll(){
        return await this.prisma.medico.findMany({
            orderBy:{id:"asc"}
        });
    }
}
