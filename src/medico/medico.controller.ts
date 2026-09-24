import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MedicoService } from './medico.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Publico } from '../auth/decorators/publico.decorator.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('medico')
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status:401, description: 'No tienes Permiso'})
export class MedicoController {
    constructor(private readonly medicoService:MedicoService){}

    @Get()
    @ApiOperation({summary:'Muestra a Todos los Medicos'})
    @ApiResponse({ status:200, description: 'Medicos Mostrados Exitosamente'})
    findAll(){
        return this.medicoService.findAll();
    }

    @Get(":id")
    @ApiOperation({summary:'Muestra al Medico en Especifico'})
    @ApiResponse({ status:200, description: 'Medico Mostrado Exitosamente'})
    findId(@Param("id") id:string){
        return this.medicoService.findId(+id);
    }

    @Post()
    @ApiOperation({summary:'Creas un Nuevo Medico'})
    @ApiResponse({ status:200, description: 'Medico Creado Exitosamente'})
    @ApiResponse({ status:400, description: 'Medico Mal Formateado'})
    create(@Body() data:CreateMedicoDto){
        return this.medicoService.create(data);
    }

    @Patch(":id")
    @UseGuards(RolesGuard)
    @Roles('RECEPCIONISTA', 'GERENCIA')
    @ApiOperation({summary:'Actualizar un Medico Especificamente'})
    @ApiResponse({ status:200, description: 'Medico Actualizado Exitosamente'})
    @ApiResponse({ status:404, description: 'Medico No Encontrado'})
    update(@Param("id") id:string, @Body() data:UpdateMedicoDto){
        return this.medicoService.update(+id,data);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('RECEPCIONISTA', 'GERENCIA')
    @ApiOperation({summary:'Eliminar un Medico Especificamente'})
    @ApiResponse({ status:200, description: 'Medico Eliminado Exitosamente'})
    @ApiResponse({ status:404, description: 'Medico No Encontrado'})
    remove(@Param("id") id:string){
        return this.medicoService.remove(+id);
    }
}
