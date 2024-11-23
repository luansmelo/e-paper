import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { ZodValidationException } from "nestjs-zod";

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ZodValidationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const zodErrors = exception.getZodError().issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
        }));

        response.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Validation Error',
            message: zodErrors,
        });
    }
}
