import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PacienteService } from './paciente.service.js';
import { CreatePacienteDto } from './dto/create-paciente.dto.js';
import { UpdatePacienteDto } from './dto/update-paciente.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Publico } from '../auth/decorators/publico.decorator.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('paciente')
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status:401, description: 'No tienes Permiso'})
//@UseGuards(JwtAuthGuard,RolesGuard)
//@Roles('RECEPCIONISTA')
export class PacienteController {
    constructor(private readonly pacienteService:PacienteService){}

    @Get()
    @ApiOperation({summary:'Muestra a Todos los Pacientes'})
    @ApiResponse({ status:200, description: 'Pacientes Mostrados Exitosamente'})
    findAll(){
        return this.pacienteService.findAll();
    }

    @Get(":id")
    @ApiOperation({summary:'Muestra al Paciente Especificamente'})
    @ApiResponse({ status:200, description: 'Paciente Mostrado Exitosamente'})
    findId(@Param("id") id:string){
        return this.pacienteService.findId(+id);
    }

    @Post()
    @UseGuards(RolesGuard)
    @Roles('RECEPCIONISTA')
    @ApiOperation({summary:'Creas a un Nuevo Paciente'})
    @ApiResponse({ status:200, description: 'Paciente Creado Exitosamente'})
    @ApiResponse({ status:400, description: 'Paciente Mal Formateado'})
    create(@Body() data:CreatePacienteDto){
        return this.pacienteService.create(data);
    }

    @Patch(":id")
    @UseGuards(RolesGuard)
    @Roles('RECEPCIONISTA','GERENCIA')
    @ApiOperation({summary:'Actualizar a un Paciente en Especifico'})
    @ApiResponse({ status:200, description: 'Paciente Actualizado Exitosamente'})
    @ApiResponse({ status:404, description: 'Paciente No Encontrado'})
    update(@Param("id") id:string, @Body() data:UpdatePacienteDto){
        return this.pacienteService.update(+id, data);
    }

    @Delete(":id")
    @UseGuards(RolesGuard)
    @Roles('RECEPCIONISTA','GERENCIA')
    @ApiOperation({summary:'Eliminar a un Paciente en Especifico'})
    @ApiResponse({ status:200, description: 'Paciente Eliminado Exitosamente'})
    @ApiResponse({ status:404, description: 'Paciente No Encontrado'})
    remove(@Param("id") id:string){
        return this.pacienteService.remove(+id);
    }
}
