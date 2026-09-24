import { Module } from '@nestjs/common';
import { CitasController } from './citas.controller.js';
import { CitasService } from './citas.service.js';
import { PacienteModule } from '../paciente/paciente.module.js';
import { MedicoModule } from '../medico/medico.module.js';

@Module({
  imports:[PacienteModule,MedicoModule],
  controllers: [CitasController],
  providers: [CitasService]
})
export class CitasModule {}
