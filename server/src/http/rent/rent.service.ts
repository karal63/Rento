import { Injectable } from '@nestjs/common';
import { Car } from 'src/schemas/carSchema';

@Injectable()
export class RentService {
    calculateTotal(car: Car, daysCount: number) {
        const pricing = car.pricing;
        let pricePerDay;

        if (daysCount == 1) pricePerDay = pricing[0]?.price ?? 0;
        else if (daysCount <= 3) pricePerDay = pricing[1]?.price ?? 0;
        else if (daysCount <= 6) pricePerDay = pricing[2]?.price ?? 0;
        else if (daysCount <= 13) pricePerDay = pricing[3]?.price ?? 0;
        else if (daysCount <= 29) pricePerDay = pricing[4]?.price ?? 0;
        else if (daysCount === 30) pricePerDay = pricing[5]?.price ?? 0;

        console.log(pricePerDay, daysCount);

        return pricePerDay * daysCount;
    }
}
