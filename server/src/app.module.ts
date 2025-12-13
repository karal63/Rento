import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './http/car/car.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RentController } from './http/rent/rent.controller';
import { RentService } from './http/rent/rent.service';
import { RentModule } from './http/rent/rent.module';
import { AuthModule } from './http/auth/auth.module';
import { UserModule } from './http/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CarModule,
        MongooseModule.forRoot(process.env.MONGODB_URI!),
        RentModule,
        AuthModule,
        UserModule,
    ],
    controllers: [AppController, RentController],
    providers: [
        AppService,
        RentService,
        { provide: APP_GUARD, useClass: AtGuard },
    ],
})
export class AppModule {}
