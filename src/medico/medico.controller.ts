import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MedicoService } from './medico.service.js';
import { CreateMedicoDto } from './dto/create-medico.dto.js';
import { UpdateMedicoDto } from './dto/update-medico.dto.js';

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
    create(@Body() data:CreateMedicoDto){
        return this.medicoService.create(data);
    }

    @Patch(":id")
    update(@Param("id") id:string, @Body() data:UpdateMedicoDto){
        return this.medicoService.update(+id,data);
    }

    @Delete(":id")
    remove(@Param("id") id:string){
        return this.medicoService.remove(+id);
    }
}
