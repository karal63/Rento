import { Global, Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import Stripe from 'stripe';
import { RentModule } from '../rent/rent.module';

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
    controllers: [StripeController],
    imports: [RentModule],
})
export class StripeModule {}
