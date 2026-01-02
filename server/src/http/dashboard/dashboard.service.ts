import { Injectable } from '@nestjs/common';
import { UserRepo } from '../user/user.repository';
import { RentalRepo } from '../rent/rental.repository';
import { DashboardDto } from './dto/dashboard.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rent } from 'src/schemas/rentSchema';
import { Model } from 'mongoose';
import { User } from 'src/schemas/userSchema';
import { Car } from 'src/schemas/carSchema';

@Injectable()
export class DashboardService {
    constructor(
        private readonly userRepo: UserRepo,
        private readonly rentalRepo: RentalRepo,
        @InjectModel(Rent.name) private rentalModel: Model<Rent>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async getSummary(query: DashboardDto) {
        // users
        const [
            totalUsers,
            newUsersThisMonth,
            activeUsersTotal,
            inactiveUsersTotal,
            clientsPercentage,
        ] = await Promise.all([
            this.userRepo.getTotalUsers(),
            this.userRepo.getNewThisMonth(),
            this.getActiveUsersTotal(),
            this.getInactiveUsersTotal(),
            this.getClientsPercentage(),
        ]);

        // rentals
        const [
            totalRentals,
            totalRentalsThisMonth,
            totalActiveRentals,
            totalConfirmedRentals,
            totalCancelledRentals,
            clientsTotal,
            avgRentalsSummary,
            repeatClients,
            totalCompletedRentals,
        ] = await Promise.all([
            this.rentalRepo.getTotalRentals(),
            this.rentalRepo.getTotalThisMonth(),
            this.rentalRepo.getTotalActiveRentals(),
            this.rentalRepo.getTotalConfirmedRentals(),
            this.rentalRepo.getTotalCancelledRentals(),
            this.getClientsTotal(),
            this.avgSummaryPerCar(),
            this.rentalRepo.getRepeatClients(),
            this.rentalRepo.getTotalCompletedRentals(),
        ]);

        return {
            users: {
                totalUsers,
                newUsersThisMonth,
                clientsTotal,
                activeUsersTotal,
                inactiveUsersTotal,
                clientsPercentage,
                repeatClients,
            },
            rentals: {
                totalRentals,
                totalRentalsThisMonth,
                totalActiveRentals,
                totalConfirmedRentals,
                totalCancelledRentals,
                totalCompletedRentals,
                avgRentalsSummary,
            },
        };
    }

    async getInactiveUsersTotal() {
        const date = new Date();
        date.setDate(date.getDate() - 30);

        const activeUserIds = await this.rentalModel.distinct('userId', {
            createdAt: { $gte: date.getTime() },
        });

        const inactiveUsers = await this.userModel.countDocuments({
            _id: { $nin: activeUserIds },
        });

        return inactiveUsers;
    }

    async getActiveUsersTotal() {
        const date = new Date();
        date.setDate(date.getDate() - 30);

        const activeUserIds = await this.rentalModel.distinct('userId', {
            createdAt: { $gte: date.getTime() },
        });

        const activeUsers = await this.userModel.countDocuments({
            _id: { $in: activeUserIds },
        });

        return activeUsers;
    }

    async avgSummaryPerCar(): Promise<
        {
            _id: string;
            avgPrice: number;
            avgDuration: number;
            car: Car;
        }[]
    > {
        return await this.rentalModel.aggregate([
            {
                $group: {
                    _id: '$carId',
                    avgPrice: { $avg: '$totalPrice' },
                    avgDuration: {
                        $avg: {
                            $dateDiff: {
                                startDate: { $toDate: '$rentFrom' },
                                endDate: { $toDate: '$rentTo' },
                                unit: 'day',
                            },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'car',
                },
            },
            { $unwind: '$car' },
        ]);
    }

    async getClientsPercentage() {
        const rentals = await this.rentalModel.distinct('userId');
        const totalUser = await this.userRepo.getTotalUsers();

        return ((rentals.length / totalUser) * 100).toFixed(1);
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
