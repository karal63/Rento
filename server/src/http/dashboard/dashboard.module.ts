import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UserModule } from '../user/user.module';
import { RentModule } from '../rent/rent.module';

@Module({
    controllers: [DashboardController],
    providers: [DashboardService],
    imports: [UserModule, RentModule],
})
export class DashboardModule {}
