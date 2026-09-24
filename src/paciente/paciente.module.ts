import { Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller.js';
import { PacienteService } from './paciente.service.js';

@Module({
  controllers: [PacienteController],
  providers: [PacienteService],
  exports:[PacienteService]
})
export class PacienteModule {}
