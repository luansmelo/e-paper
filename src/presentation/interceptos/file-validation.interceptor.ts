import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const req = context.switchToHttp().getRequest();

        const file = req.file;

        if (!file) {
            throw new BadRequestException('Arquivo é obrigatório.');
        }

        if (file.size > 5 * 1024 * 1024) {
            throw new BadRequestException('O arquivo excede o tamanho máximo de 5MB.');
        }

        if (!file.mimetype.match(/\/(pdf|jpeg|png)$/)) {
            throw new BadRequestException('Tipo de arquivo não permitido. Apenas PDF, JPEG e PNG são aceitos.');
        }

        return next.handle();
    }
}
