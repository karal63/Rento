import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rent } from 'src/schemas/rentSchema';

@Injectable()
export class RentalRepo {
    constructor(@InjectModel(Rent.name) private rentalModel: Model<Rent>) {}

    async getTotal() {
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

    async getRentals() {
        return await this.rentalModel
            .find({ status: 'CANCELLED' })
            .countDocuments();
    }

    async getAverageRentalPricePerCar() {
        const result = await this.rentalModel.aggregate([
            // Convert carId to ObjectId in case it's stored as string
            {
                $addFields: {
                    carIdObj: {
                        $cond: {
                            if: { $eq: [{ $type: '$carId' }, 'string'] },
                            then: { $toObjectId: '$carId' },
                            else: '$carId',
                        },
                    },
                },
            },
            // Group by carId
            {
                $group: {
                    _id: '$carIdObj',
                    avgPrice: { $avg: '$totalPrice' },
                },
            },
            // Lookup car details
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'car',
                },
            },
            { $unwind: '$car' },
            // Project the final shape
            {
                $project: {
                    _id: 0,
                    carId: '$_id',
                    avgPrice: 1,
                    car: 1,
                },
            },
        ]);

        return result;
    }

    // async getAvgRentalDurations(): Promise<any> {
    //     return await this.rentalModel.aggregate([
    //         {
    //             $group: {
    //                 _id: '$carId',
    //                 averageDuration: {
    //                     $avg: {
    //                         $dateDiff: {
    //                             startDate: { $toDate: '$rentFrom' },
    //                             endDate: { $toDate: '$rentTo' },
    //                             unit: 'day',
    //                         },
    //                     },
    //                 },
    //             },
    //         },

    //         {
    //             $lookup: {
    //                 from: 'cars', // name of the car collection
    //                 localField: '_id', // carId from rental
    //                 foreignField: '_id', // car _id
    //                 as: 'car',
    //             },
    //         },

    //         // {
    //         //     $unwind: '$car', // if you want a single object instead of array
    //         // },
    //     ]);
    // }

    // maybe i should focus on easier metrics, like avarage price, revenue
}
