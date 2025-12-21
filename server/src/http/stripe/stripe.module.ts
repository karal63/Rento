import { Global, Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Global()
@Module({
    providers: [
        {
            provide: 'STRIPE_CLIENT',
            useFactory: () => {
                return new Stripe(process.env.STRIPE_SECRET_KEY as string);
            },
        },
        StripeService,
    ],
    exports: ['STRIPE_CLIENT', StripeService],
})
export class StripeModule {}
