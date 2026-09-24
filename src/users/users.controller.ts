import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Publico } from '../auth/decorators/publico.decorator.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Publico()
  @ApiOperation({summary:'Crea un Usuario en Especifico'})
  @ApiResponse({ status:200, description: 'Usuario Creado Exitosamente'})
  @ApiResponse({ status:404, description: 'Usuario Mal Formateado'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Publico()
  @ApiOperation({summary:'Muestra a Todos los Usuarios'})
  @ApiResponse({ status:200, description: 'Usuarios Mostrados Exitosamente'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Publico()
  @ApiOperation({summary:'Muestra al Usuario en Especifico'})
  @ApiResponse({ status:200, description: 'Usuario Mostrado Exitosamente'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Publico()
  @ApiOperation({summary:'Actualiza al Usuario en Especifico'})
  @ApiResponse({ status:200, description: 'Usuario Actualizado Exitosamente'})
  @ApiResponse({ status:404, description: 'Usuario No Encontrado'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'Elimina al Usuario en Especifico'})
  @ApiResponse({ status:200, description: 'Usuario Eliminado Exitosamente'})
  @ApiResponse({ status:404, description: 'Usuario No Encontrado'})
  @ApiResponse({ status:401, description: 'No Tienes Permiso'})
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
