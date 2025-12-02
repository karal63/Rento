import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Car>;

class Details {
    acceleration: string;
    transmission: string;
    power: string;
    numberOfSeats: number;
}

type Price = {
    price: number;
    name: string;
};

@Schema()
export class Car {
    @Prop()
    name: string;

    @Prop()
    image: string;

    @Prop()
    details: Details;

    @Prop()
    deposit: number;

    @Prop()
    pricing: Price[];
}

export const CarSchema = SchemaFactory.createForClass(Car);
