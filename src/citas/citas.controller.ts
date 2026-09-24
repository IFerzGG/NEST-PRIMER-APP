import { Body, Controller, Get, Post } from '@nestjs/common';
import { CitasService } from './citas.service.js';
import { Publico } from '../auth/decorators/publico.decorator.js';

@Controller('citas')
export class CitasController {
    constructor(private readonly citasService:CitasService){}

    @Post()
    @Publico()
    create(@Body() data:any){
        return this.citasService.create(data);
    }

    @Get()
    @Publico()
    findAll(){
        return this.citasService.findAll();
    }
}
