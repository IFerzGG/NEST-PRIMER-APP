import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Prisma } from '../generated/prisma/client.js';
import * as bcrypt from 'bcryptjs';
import { Role } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password,10)

    const resultado = await this.prisma.user.create({
      data:{
        nombre: createUserDto.name,
        email: createUserDto.email,
        password: hashPassword,
        role: createUserDto.role ?? Role.RECEPCIONISTA,
      },
      select:{
        id: true,
        nombre: true,
        email: true,
        role: true,
      }
    })
    return resultado;
  }

  async findAll() {
    const resultado = await this.prisma.user.findMany({
      orderBy:{id: "asc"},
    })
    return resultado;
  }

  async findOne(id: number) {
    const resultado = await this.prisma.user.findUnique({
      where:{id},
      select:{
        id: true,
        nombre: true,
        email: true,
        role: true,
      }
    })
    if(!resultado){
      throw new NotFoundException(`usuario de ID: ${id} no encontrado`);
    }
    return resultado;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const resultado = await this.prisma.user.update({
      where:{id},
      data: updateUserDto,
    })
    return resultado;
  }

  async remove(id: number) {
    const resultado = await this.prisma.user.findUnique({
      where:{id},
    })
    if(!resultado){
      throw new NotFoundException(`usuario de ID: ${id} no encontrado`);
    }
    return await this.prisma.user.delete({
      where:{id},
    })
  }

  async findByEmail(email:string){
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        password: true,
      },
    });
  }
}
