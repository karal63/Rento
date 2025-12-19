import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { StripeService } from '../stripe/stripe.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('payment')
export class PaymentController {
    constructor(private readonly stripeService: StripeService) {}

    @Public()
    @ApiOperation({ summary: 'Create payment intent' })
    @Post('create-payment-intent')
    async createPaymentIntent(@Body() body: { amount: number }) {
        const paymentIntent = await this.stripeService.createPaymentIntent(
            body.amount,
        );

        return { clientSecret: paymentIntent.client_secret };
    }
}
