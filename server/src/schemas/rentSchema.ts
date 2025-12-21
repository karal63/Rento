import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RentDocument = HydratedDocument<Rent>;

@Schema()
export class Rent {
    @Prop({ required: true })
    carId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    rentFrom: number;

    @Prop({ required: true })
    rentTo: number;

    @Prop({ required: true })
    totalPrice: number;

    @Prop({
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
        default: 'CONFIRMED',
    })
    status?: string;

    @Prop({ required: true, default: () => Date.now() })
    createdAt?: number;
}

export const RentSchema = SchemaFactory.createForClass(Rent);
