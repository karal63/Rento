import { Injectable } from '@nestjs/common';
import { UserRepo } from '../user/user.repository';
import { RentalRepo } from '../rent/rental.repository';
import { DashboardDto } from './dto/dashboard.dto';

@Injectable()
export class DashboardService {
    constructor(
        private readonly userRepo: UserRepo,
        private readonly rentalRepo: RentalRepo,
    ) {}

    async getSummary(query: DashboardDto) {
        // users
        const [totalUsers, newUsersThisMonth] = await Promise.all([
            this.userRepo.getTotal(),
            this.userRepo.getNewThisMonth(),
        ]);

        // rentals
        const [
            totalRentals,
            totalRentalsThisMonth,
            totalActiveRentals,
            totalConfirmedRentals,
            totalCancelledRentals,
            avgRentalPricePerCar,
        ] = await Promise.all([
            this.rentalRepo.getTotal(),
            this.rentalRepo.getTotalThisMonth(),
            this.rentalRepo.getTotalActiveRentals(),
            this.rentalRepo.getTotalConfirmedRentals(),
            this.rentalRepo.getTotalCancelledRentals(),
            this.rentalRepo.getAverageRentalPricePerCar(),
        ]);

        return {
            users: {
                totalUsers,
                newUsersThisMonth,
            },
            rentals: {
                totalRentals,
                totalRentalsThisMonth,
                totalActiveRentals,
                totalConfirmedRentals,
                totalCancelledRentals,
                avgRentalPricePerCar,
            },
        };
    }
}
