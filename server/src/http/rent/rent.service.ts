import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Car } from 'src/schemas/carSchema';
import { Rent } from 'src/schemas/rentSchema';
import { UpdateDto } from './dto/update.dto';

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

    async findRentalBySessionId(sessionId: string, userId: string) {
        return await this.rentModel.findOne({
            intentId: sessionId,
            userId: new Types.ObjectId(userId),
        });
    }

    async findRentalById(id: string) {
        return await this.rentModel.findById(id);
    }

    async getRentsByCarId(carId: string) {
        return await this.rentModel.find({
            carId: new Types.ObjectId(carId),
            status: { $ne: 'CANCELLED' },
        });
    }

    async getRentals(userId: string) {
        return await this.rentModel
            .find({ userId: new Types.ObjectId(userId) })
            .populate('carId');
    }

    checkIfValidDates(
        carRentals: Rent[],
        rentalFrom: number,
        rentalTo: number,
    ) {
        return !carRentals.some(
            (rental) =>
                rental.rentFrom >= rentalFrom && rental.rentTo <= rentalTo,
        );
    }

    async cancelRental(rentalId: string) {
        await this.rentModel.findByIdAndUpdate(rentalId, {
            $set: { status: 'CANCELLED', cancelledAt: Date.now() },
        });
    }

    async updateRental(rentalId: string, userId: string, body: UpdateDto) {
        const updatedRental = await this.rentModel
            .findOneAndUpdate(
                { _id: rentalId, userId: new Types.ObjectId(userId) }, // ownership check
                {
                    $set: {
                        pickupTime: body.time,
                        pickupLocation: body.location,
                        updatedAt: Date.now(),
                    },
                },
                {
                    new: true, // return updated document
                    runValidators: true, // enforce schema validation
                },
            )
            .populate('carId');

        if (!updatedRental) {
            throw new NotFoundException('Rental not found');
        }

        return updatedRental;
    }
}
