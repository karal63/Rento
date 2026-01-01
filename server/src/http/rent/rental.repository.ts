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

    async getClientsTotal() {
        const res: { count: number }[] = await this.rentalModel.aggregate([
            {
                $lookup: {
                    from: 'users', // MongoDB collection name (pluralized)
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: '$user', // Ensures only rents with a matching user
            },
            {
                $group: { _id: '$user._id' },
            },
            {
                $count: 'count',
            },
        ]);

        return res[0].count;
    }
}
