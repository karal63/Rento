import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rent } from 'src/schemas/rentSchema';
import { GetAllDto } from './dto/getAll.dto';
import { Status } from 'src/enums/status.enum';
import { Car } from 'src/schemas/carSchema';
import { UserPayload } from 'src/common/types/user.type';

@Injectable()
export class RentalRepo {
    constructor(
        @InjectModel(Rent.name) private rentalModel: Model<Rent>,
        @InjectModel(Car.name) private carModel: Model<Car>,
    ) {}

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
        return await this.rentalModel
            .find({ status: Status.Active })
            .populate('carId');
    }

    async getTotalActiveRentals() {
        return await this.rentalModel
            .find({ status: Status.Active })
            .countDocuments();
    }

    async getTotalConfirmedRentals() {
        return await this.rentalModel
            .find({
                $or: [
                    { status: Status.Active },
                    { status: Status.Pending },
                    { status: Status.Completed },
                ],
            })
            .countDocuments();
    }

    async getTotalCancelledRentals() {
        return await this.rentalModel
            .find({ status: Status.Cancelled })
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
            .find({ status: Status.Completed })
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

        const res: {
            _id: string;
            confirmedCount: number;
            cancelledCount: number;
            isoDate: string;
        }[] = await this.rentalModel.aggregate([
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
                            $cond: [
                                {
                                    $or: [
                                        { $eq: ['$status', Status.Pending] },
                                        { $eq: ['$status', Status.Completed] },
                                        { $eq: ['$status', Status.Active] },
                                    ],
                                },
                                1,
                                0,
                            ],
                        },
                    },
                    cancelledCount: {
                        $sum: {
                            $cond: [
                                { $eq: ['$status', Status.Cancelled] },
                                1,
                                0,
                            ],
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

    async getAllRentals(query: GetAllDto, user: UserPayload) {
        const page = parseInt(query.page);
        const limit = 20;

        let res = this.rentalModel.find();

        if (query.status && Array.isArray(query.status)) {
            res = res.find({ status: { $in: query.status } });
        } else if (query.status) {
            res = res.find({ status: query.status });
        }

        if (query.search) {
            const cars = await this.carModel
                .find({
                    name: { $regex: query.search, $options: 'i' },
                })
                .select('_id');

            res = res.or([
                { carId: { $in: cars.map((c) => c._id) } },
                { status: { $regex: query.search, $options: 'i' } },
            ]);
        }

        if (query.sort) {
            const sortMethod = query.sort.split(':');
            const field = sortMethod[0];
            const order = sortMethod[1] as 'asc' | 'desc';

            res = res.sort({ [field]: order === 'desc' ? -1 : 1 });
        } else {
            res = res.sort({ createdAt: -1 });
        }

        if (query.unassigned) {
            res = res.find({ employee: null });
        }

        if (query.my) {
            res = res.find({ employee: new Types.ObjectId(user.id) });
        }

        const total = await res.clone().countDocuments();
        res = res.skip((page - 1) * limit).limit(limit);
        const readyRentals = await res
            .populate(['carId', 'userId', 'employee'])
            .exec();
        const pages = Math.ceil(total / limit);

        return {
            rentals: readyRentals,
            pages: pages,
        };
    }

    async find(id: string) {
        return await this.rentalModel.findById(id);
    }

    async delete(id: string) {
        await this.rentalModel.findByIdAndDelete(id);
    }

    async cancel(id: string) {
        await this.rentalModel.findByIdAndUpdate(id, {
            $set: { status: Status.Cancelled, cancelledAt: Date.now() },
        });
    }

    async findRentalById(id: string) {
        return await this.rentalModel.findById(id);
    }

    async findRentalDetailsById(id: string) {
        return await this.rentalModel
            .findById(id)
            .populate(['carId', 'userId', 'employee']);
    }

    async changeStatus(rentalId: string, status: Status) {
        await this.rentalModel.findByIdAndUpdate(rentalId, { status });
    }
}
