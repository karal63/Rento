import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UserModule } from '../user/user.module';
import { RentModule } from '../rent/rent.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Rent, RentSchema } from 'src/schemas/rentSchema';
import { User, UserSchema } from 'src/schemas/userSchema';

@Module({
    controllers: [DashboardController],
    providers: [DashboardService],
    imports: [
        UserModule,
        RentModule,
        MongooseModule.forFeature([{ name: Rent.name, schema: RentSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
})
export class DashboardModule {}
