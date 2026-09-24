import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request
    const startTime = Date.now()
    console.log(`[solicitud] ==> inicia ${startTime} ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const restTime = Date.now() - startTime;
        console.log(`[solicitud] ==> inicia ${restTime}ms ${method} ${url}`);
      })
    );
  }
}
