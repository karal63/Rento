import { Controller, Post, type RawBodyRequest, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Public } from 'src/common/decorators/public.decorator';
import { RentService } from '../rent/rent.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('Stripe hooks')
@Controller('stripe')
export class StripeController {
    constructor(
        private readonly stripeService: StripeService,
        private readonly rentService: RentService,
    ) {}

    @Public()
    @ApiOperation({ summary: 'Get notified when payment succeded' })
    @Post('webhook')
    async handleStripeWebhook(@Req() req: RawBodyRequest<Request>) {
        const event = this.stripeService.constructEvent(req);

        if (event.type === 'payment_intent.succeeded') {
            const intent = event.data.object;
            await this.rentService.createRent({
                carId: new Types.ObjectId(intent.metadata.carId),
                userId: new Types.ObjectId(intent.metadata.userId),
                rentFrom: Number(intent.metadata.rentFrom),
                rentTo: Number(intent.metadata.rentTo),
                pickupLocation: intent.metadata.pickupLocation,
                pickupTime: intent.metadata.pickupTime,
                totalPrice: Number(intent.metadata.totalPrice),
                intentId: intent.id,
            });
        }

        return { ok: true };
    }
}
