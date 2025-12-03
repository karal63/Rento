import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = HydratedDocument<Rent>;

@Schema()
export class Rent {
    @Prop()
    carId: string;

    @Prop()
    userId: string;

    @Prop()
    rentFrom: number;

    @Prop()
    rentTo: number;

    @Prop()
    totalPrice: number;

    @Prop()
    status: string;

    @Prop()
    createdAt: number;
}

export const RentSchema = SchemaFactory.createForClass(Rent);
