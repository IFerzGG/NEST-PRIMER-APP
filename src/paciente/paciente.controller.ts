import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PacienteService } from './paciente.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('paciente')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('RECEPCIONISTA')
export class PacienteController {
    constructor(private readonly pacienteService:PacienteService){}

    @Get()
    findAll(){
        return this.pacienteService.findAll();
    }

    @Get(":id")
    findId(@Param("id") id:string){
        return this.pacienteService.findId(+id);
    }

    @Post()
    create(@Body() data:CreatePacienteDto){
        return this.pacienteService.create(data);
    }

    @Patch(":id")
    update(@Param("id") id:string, @Body() data:UpdatePacienteDto){
        return this.pacienteService.update(+id, data);
    }

    @Delete(":id")
    remove(@Param("id") id:string){
        return this.pacienteService.remove(+id);
    }
}
