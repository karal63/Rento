// import {
//     ArgumentsHost,
//     BadRequestException,
//     Catch,
//     ExceptionFilter,
// } from '@nestjs/common';
// import { Response } from 'express';

// @Catch(BadRequestException)
// export class ValidationExceptionFilter implements ExceptionFilter {
//     catch(exception: BadRequestException, host: ArgumentsHost) {
//         const response = host.switchToHttp().getResponse<Response>();
//         const exceptionResponse = exception.getResponse() as {
//             message: string | string[];
//         };

//         if (Array.isArray(exceptionResponse.message)) {
//             response.status(400).json({
//                 code: 'VALIDATION_ERROR',
//                 context: '',
//             });
//             return;
//         }

//         response.status(400).json({
//             code: exceptionResponse.message,
//         });
//     }

//     private mapValidationErrors(errors: any[]) {
//         return errors.map((err: { property: string }) => ({
//             field: err.property,
//             constraints: Object.keys(err.constraints),
//         }));
//     }
// }
