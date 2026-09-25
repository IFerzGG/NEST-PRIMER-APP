import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/publico.decorator.js';
import { AuthService } from '../auth.service.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector:Reflector,
    private readonly configService: ConfigService
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const esPublico = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[context.getHandler(), context.getClass(),]);
    if(esPublico){
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const header = request.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      request.user = jwt.verify(
        header.split(' ')[1],
        this.configService.getOrThrow<string>('JWT_SECRET'),
      );
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}