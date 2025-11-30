import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './http/car/car.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CarModule,
        MongooseModule.forRoot(process.env.MONGODB_URI!),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
