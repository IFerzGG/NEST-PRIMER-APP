import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MedicoService } from './medico.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Publico } from '../auth/decorators/publico.decorator.js';

@Controller('medico')
export class MedicoController {
    constructor(private readonly medicoService:MedicoService){}

    @Get()
    @Publico()
    findAll(){
        return this.medicoService.findAll();
    }

    @Get(":id")
    @Publico()
    findId(@Param("id") id:string){
        return this.medicoService.findId(+id);
    }

    @Post()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('RECEPCIONISTA', 'GERENCIA')
    create(@Body() data:CreateMedicoDto){
        return this.medicoService.create(data);
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('RECEPCIONISTA', 'GERENCIA')
    update(@Param("id") id:string, @Body() data:UpdateMedicoDto){
        return this.medicoService.update(+id,data);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('RECEPCIONISTA', 'GERENCIA')
    remove(@Param("id") id:string){
        return this.medicoService.remove(+id);
    }
}
