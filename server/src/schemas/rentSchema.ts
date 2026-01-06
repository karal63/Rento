import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RentDocument = HydratedDocument<Rent>;

@Schema()
export class Rent {
    @Prop({ required: true, ref: 'Car' })
    carId: Types.ObjectId;

    @Prop({ required: true })
    userId: Types.ObjectId;

    @Prop({ required: true })
    rentFrom: number;

    @Prop({ required: true })
    rentTo: number;

    @Prop({ required: true })
    totalPrice: number;

    @Prop({ required: true })
    pickupLocation: string;

    @Prop({ required: true })
    pickupTime: string;

    @Prop({
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
        default: 'CONFIRMED',
    })
    status?: string;

    @Prop({ required: true, default: () => Date.now() })
    createdAt?: number;

    @Prop({ required: true })
    intentId: string;

    @Prop({ type: Number, default: null })
    updatedAt?: number | null;

    @Prop({ type: Number, default: null })
    cancelledAt?: number | null;
}

export const RentSchema = SchemaFactory.createForClass(Rent);
