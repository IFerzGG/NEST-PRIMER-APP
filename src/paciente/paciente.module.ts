import { Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller.js';
import { PacienteService } from './paciente.service.js';

@Module({
  controllers: [PacienteController],
  providers: [PacienteService]
})
export class PacienteModule {}
