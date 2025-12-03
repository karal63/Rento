import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './http/car/car.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RentController } from './http/rent/rent.controller';
import { RentService } from './http/rent/rent.service';
import { RentModule } from './http/rent/rent.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CarModule,
        MongooseModule.forRoot(process.env.MONGODB_URI!),
        RentModule,
    ],
    controllers: [AppController, RentController],
    providers: [AppService, RentService],
})
export class AppModule {}
