import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PacienteService } from './paciente.service.js';

@Controller('paciente')
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
    create(@Body() data:{nombre:string, fechaNacimiento:Date, email:string, telefono:string}){
        return this.pacienteService.create(data);
    }

    @Patch(":id")
    update(@Param("id") id:string, @Body() data:{nombre?:string, fechaNacimiento?:Date, email?:string, telefono?:string}){
        return this.pacienteService.update(+id, data);
    }

    @Delete(":id")
    remove(@Param("id") id:string){
        return this.pacienteService.remove(+id);
    }
}
