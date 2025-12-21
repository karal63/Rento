import { Inject, Injectable, RawBodyRequest } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateIntentDto } from '../payment/dto/createIntent.dto';

@Injectable()
export class StripeService {
    constructor(@Inject('STRIPE_CLIENT') private readonly stripe: Stripe) {}

    async createPaymentIntent(
        amount: number,
        userId: string,
        body: CreateIntentDto,
    ) {
        return this.stripe.paymentIntents.create({
            amount,
            currency: 'pln',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                totalPrice: amount,
                userId,
                ...body,
            },
        });
    }

    constructEvent(req: RawBodyRequest<Request>) {
        const signature = req.headers['stripe-signature'] as string;
        const rawBody = req.rawBody;

        if (!signature || typeof signature !== 'string') {
            throw new Error('Missing Stripe signature');
        }

        if (!rawBody) {
            throw new Error('Missing raw body');
        }

        return this.stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string,
        );
    }
}
