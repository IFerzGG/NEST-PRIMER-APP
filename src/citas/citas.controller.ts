import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CitasService } from './citas.service.js';
import { Publico } from '../auth/decorators/publico.decorator.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CreateCitaDto } from './dto/create-cita.dto.js';
import { UpdateCitaDto } from './dto/update-cita.dto.js';

@Controller('citas')
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status:401, description: 'No tienes Permiso'})
export class CitasController {
    constructor(private readonly citasService:CitasService){}

    @Post()
    @UseGuards(RolesGuard)
    @Roles('RECEPCIONISTA','GERENCIA')
    @ApiOperation({summary:'Crea una Nueva cita'})
    @ApiResponse({ status:200, description:'Cita Creada Exitosamente'})
    @ApiResponse({ status:400, description:'Cita Mal Formateada'})
    create(@Body() data:CreateCitaDto){
        return this.citasService.create(data);
    }

    @Get()
    @ApiOperation({summary:'Mostrar Todas las Citas'})
    @ApiResponse({ status:200, description:'Citas Mostradas Exitosamente'})
    findAll(){
        return this.citasService.findAll();
    }
    
    @Get(':id')
    @ApiOperation({summary:'Mostrar Cita Especifica'})
    @ApiResponse({ status:200, description:'Cita Mostrada Exitosamente'})
    @ApiResponse({ status:404, description:'Cita No Encontrada'})
    findOne(@Param('id') id:string){
        return this.citasService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(RolesGuard)
    @Roles('RECEPCIONISTA','GERENCIA')
    @ApiOperation({summary:'Actualizar Cita en Especifico'})
    @ApiResponse({ status:200, description:'Cita Actualizada Exitosamente'})
    @ApiResponse({ status:404, description:'Cita No Encontrada'})
    update(@Param('id') id:string, @Body() data:UpdateCitaDto){
        return this.citasService.update(+id, data);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles('RECEPCIONISTA','GERENCIA')
    @ApiOperation({summary:'Eliminar Cita en Especifico'})
    @ApiResponse({ status:200, description:'Cita Eliminada Exitosamente'})
    @ApiResponse({ status:404, description:'Cita No Encontrada'})
    remove(@Param('id') id:string){
        return this.citasService.remove(+id);
    }
}
