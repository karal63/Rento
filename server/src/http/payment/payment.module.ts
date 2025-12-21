import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { CarModule } from '../car/car.module';
import { RentModule } from '../rent/rent.module';

@Module({
    controllers: [PaymentController],
    imports: [CarModule, RentModule],
})
export class PaymentModule {}
