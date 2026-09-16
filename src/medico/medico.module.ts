import { Module } from '@nestjs/common';
import { MedicoController } from './medico.controller.js';
import { MedicoService } from './medico.service.js';

@Module({
  controllers: [MedicoController],
  providers: [MedicoService]
})
export class MedicoModule {}
