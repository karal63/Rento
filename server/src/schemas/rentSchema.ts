import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Status } from 'src/enums/status.enum';

export type RentDocument = HydratedDocument<Rent>;

@Schema()
export class Rent {
    @Prop({ required: true, ref: 'Car' })
    carId: Types.ObjectId;

    @Prop({ required: true, ref: 'User' })
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
        enum: Object.values(Status),
        default: Status.Pending,
    })
    status?: Status;

    @Prop({ required: true, default: () => Date.now() })
    createdAt?: number;

    @Prop()
    intentId?: string;

    @Prop({ type: Number, default: null })
    updatedAt?: number | null;

    @Prop({ type: Number, default: null })
    cancelledAt?: number | null;

    @Prop({ type: Types.ObjectId, default: null, ref: 'User' })
    employee?: Types.ObjectId | null;
}

export const RentSchema = SchemaFactory.createForClass(Rent);

// ? - required for typing
// required - required for creating a new document
