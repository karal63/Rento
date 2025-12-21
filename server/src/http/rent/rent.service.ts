import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/schemas/carSchema';
import { Rent } from 'src/schemas/rentSchema';

@Injectable()
export class RentService {
    constructor(@InjectModel(Rent.name) private rentModel: Model<Rent>) {}

    calculateTotal(car: Car, daysCount: number) {
        const pricing = car.pricing;
        let pricePerDay = 0;

        if (daysCount == 1) pricePerDay = pricing[0]?.price ?? 0;
        else if (daysCount <= 3) pricePerDay = pricing[1]?.price ?? 0;
        else if (daysCount <= 6) pricePerDay = pricing[2]?.price ?? 0;
        else if (daysCount <= 13) pricePerDay = pricing[3]?.price ?? 0;
        else if (daysCount <= 29) pricePerDay = pricing[4]?.price ?? 0;
        else if (daysCount === 30) pricePerDay = pricing[5]?.price ?? 0;

        return pricePerDay * daysCount;
    }

    async createRent(rent: Rent) {
        const newRent = new this.rentModel(rent);
        await newRent.save();
    }
}
