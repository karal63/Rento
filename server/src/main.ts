import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'PATCH'],
        origin: process.env.CORS_ORIGIN?.split(','),
    });

    console.log(process.env.CORS_ORIGIN);

    await app.listen(process.env.PORT ?? 2000);
}
bootstrap();
