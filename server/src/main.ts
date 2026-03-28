import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { IncomingMessage, ServerResponse } from 'http';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'PATCH'],
        origin: [process.env.CORS_ORIGIN?.split(',')],
    });

    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => {
                return new BadRequestException({
                    code: 'VALIDATION_ERROR',
                    context: errors.map((err) => ({
                        field: err.property,
                        constraints: Object.keys(err.constraints ?? {}),
                    })),
                });
            },
        }),
    );
    app.use(cookieParser());
    app.use(
        bodyParser.json({
            verify: (
                req: IncomingMessage & { rawBody?: Buffer },
                _res: ServerResponse,
                buf: Buffer,
            ) => {
                req.rawBody = buf;
            },
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('documentation for the Rento')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
