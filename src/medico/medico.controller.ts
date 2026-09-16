import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MedicoService } from './medico.service.js';

@Controller('medico')
export class MedicoController {
    constructor(private readonly medicoService:MedicoService){}

    @Get()
    findAll(){
        return this.medicoService.findAll();
    }

    @Get(":id")
    findId(@Param("id") id:string){
        return this.medicoService.findId(+id);
    }

    @Post()
    create(@Body() data:{nombre:string, email:string, telefono:string, especialidadId:number}){
        return this.medicoService.create(data);
    }

    @Patch(":id")
    update(@Param("id") id:string, @Body() data:{nombre?:string, email?:string, telefono?:string}){
        return this.medicoService.update(+id,data);
    }

    @Delete(":id")
    remove(@Param("id") id:string){
        return this.medicoService.remove(+id);
    }
}
