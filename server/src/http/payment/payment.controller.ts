import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StripeService } from '../stripe/stripe.service';
import { CarService } from '../car/car.service';
import { RentService } from '../rent/rent.service';
import { CreateIntentDto } from './dto/createIntent.dto';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import type { UserPayload } from 'src/common/types/user.type';

@ApiTags('Payments')
@Controller('payment')
export class PaymentController {
    constructor(
        private readonly stripeService: StripeService,
        private readonly carService: CarService,
        private readonly rentService: RentService,
    ) {}

    @ApiOperation({ summary: 'Create payment intent' })
    @ApiResponse({
        status: 200,
        description: 'Returns payment intent client secret',
    })
    @Post('create-payment-intent')
    async createPaymentIntent(
        @Body() body: CreateIntentDto,
        @GetUser() user: UserPayload,
    ) {
        const car = await this.carService.find(body.carId);
        if (!car) throw new NotFoundException('Car not found');

        const total = this.rentService.calculateTotal(car, body.daysCount);

        const paymentIntent = await this.stripeService.createPaymentIntent(
            total * 100,
            user.id,
            body,
        );

        return { clientSecret: paymentIntent.client_secret };
    }
}
