import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    constructor(@Inject('STRIPE_CLIENT') private readonly stripe: Stripe) {}

    async createPaymentIntent(amount: number) {
        return this.stripe.paymentIntents.create({
            amount,
            currency: 'pln',
            automatic_payment_methods: {
                enabled: true,
            },
        });
    }
}
