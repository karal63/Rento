import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Car>;

@Schema({ _id: false })
export class Details {
    @Prop()
    accelerationTo100: number;

    @Prop()
    horsepower: number;

    @Prop()
    torqueNm: number;

    @Prop()
    transmission: string;

    @Prop()
    numberOfSeats: number;
}

export const DetailsSchema = SchemaFactory.createForClass(Details);

@Schema({ _id: false })
export class Pricing {
    @Prop()
    day: number;

    @Prop()
    days2_3: number;

    @Prop()
    days4_6: number;

    @Prop()
    days7_13: number;

    @Prop()
    days14_29: number;

    @Prop()
    month: number;
}

const PriceSchema = SchemaFactory.createForClass(Pricing);

@Schema()
export class Car {
    @Prop()
    name: string;

    @Prop()
    image: string;

    @Prop({ type: DetailsSchema })
    details: Details;

    @Prop()
    deposit: number;

    @Prop({ type: PriceSchema })
    pricing: Pricing;

    @Prop()
    brand: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
