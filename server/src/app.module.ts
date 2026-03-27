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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StripeModule } from './http/stripe/stripe.module';
import { PaymentModule } from './http/payment/payment.module';
import { RolesGuard } from './common/guards/roles.guard';
import { DashboardModule } from './http/dashboard/dashboard.module';
import { ImageModule } from './http/image/image.module';
import { CloudinaryModule } from './http/cloudinary/cloudinary.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}.local`,
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'), // path to Vue build
            exclude: ['/api', '/auth'], // simple string prefixes
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI!),
        CarModule,
        RentModule,
        AuthModule,
        UserModule,
        StripeModule,
        PaymentModule,
        DashboardModule,
        ImageModule,
        CloudinaryModule,
    ],
    controllers: [AppController, RentController],
    providers: [
        AppService,
        RentService,
        { provide: APP_GUARD, useClass: AtGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
    ],
})
export class AppModule {}
