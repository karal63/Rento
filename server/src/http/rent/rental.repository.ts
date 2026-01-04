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

    async getActiveRentals() {
        const now = new Date().getTime();

        return await this.rentalModel
            .find({
                $and: [{ rentFrom: { $lt: now } }, { rentTo: { $gt: now } }],
            })
            .populate('carId');
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

    async getLastPayments() {
        return await this.rentalModel
            .find()
            .sort({ createdAt: 'desc' })
            .limit(8);
    }

    async getLast6MonthsRentals() {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const res = await this.rentalModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: sixMonthsAgo.getTime() }, // assuming timestamp
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m',
                            date: { $toDate: '$createdAt' },
                        },
                    },
                    confirmedCount: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'CONFIRMED'] }, 1, 0],
                        },
                    },
                    cancelledCount: {
                        $sum: {
                            $cond: [{ $eq: ['$status', 'CANCELLED'] }, 1, 0],
                        },
                    },
                },
            },
            {
                $addFields: {
                    isoDate: {
                        $dateFromString: {
                            dateString: {
                                $concat: ['$_id', '-01T00:00:00.000Z'],
                            },
                        },
                    },
                },
            },
            { $sort: { _id: 1 } },
            { $limit: 9 },
        ]);

        return res;
    }
}
