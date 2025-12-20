import {
    BadRequestException,
    Body,
    Controller,
    NotFoundException,
    Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { StripeService } from '../stripe/stripe.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CarService } from '../car/car.service';
import { RentService } from '../rent/rent.service';

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly stripeService: StripeService,
        private readonly carService: CarService,
        private readonly rentService: RentService,
    ) {}

    @Public()
    @ApiOperation({ summary: 'Create payment intent' })
    @Post('create-payment-intent')
    async createPaymentIntent(
        @Body() body: { carId: string; daysCount: number },
    ) {
        // replace with dto
        if (body.daysCount <= 0)
            throw new BadRequestException('Days amount must be greater than 0');

        const car = await this.carService.find(body.carId);
        if (!car) throw new NotFoundException('Car not found');

        const total = this.rentService.calculateTotal(car, body.daysCount);

        const paymentIntent = await this.stripeService.createPaymentIntent(
            total * 100,
        );

        return { clientSecret: paymentIntent.client_secret };
    }
}
