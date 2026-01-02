import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rent } from 'src/schemas/rentSchema';

@Injectable()
export class RentalRepo {
    constructor(@InjectModel(Rent.name) private rentalModel: Model<Rent>) {}

    async getTotalRentals() {
        return await this.rentalModel.countDocuments();
    }

    async getTotalThisMonth() {
        const now = new Date();
        const firstDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            1,
        ).getTime();

        return await this.rentalModel
            .find({ createdAt: { $gt: firstDate } })
            .countDocuments();
    }

    async getTotalActiveRentals() {
        const now = new Date().getTime();

        return await this.rentalModel
            .find({
                $and: [{ rentFrom: { $lt: now } }, { rentTo: { $gt: now } }],
            })
            .countDocuments();
    }

    async getTotalConfirmedRentals() {
        return await this.rentalModel
            .find({ status: 'CONFIRMED' })
            .countDocuments();
    }

    async getTotalCancelledRentals() {
        return await this.rentalModel
            .find({ status: 'CANCELLED' })
            .countDocuments();
    }

    async getRepeatClients() {
        const repeatClients = await this.rentalModel.aggregate([
            {
                $group: {
                    _id: '$userId',
                    rentalsCount: { $sum: 1 },
                },
            },
            {
                $match: {
                    rentalsCount: { $gt: 1 },
                },
            },
        ]);

        return repeatClients.length;
    }

    async getTotalCompletedRentals() {
        return await this.rentalModel
            .find({
                $and: [
                    { rentTo: { $lt: Date.now() } },
                    { status: 'CONFIRMED' },
                ],
            })
            .countDocuments();
    }

    async getTotalOverdueRentals() {
        // return await this.rentalModel.find({status: ''})
        return 'not implemented';
    }
}
