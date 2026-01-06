import type { Car } from '@/entities/car';
import type { Rental, RentalWithCar } from '@/entities/rental';
import type { MonthSummary } from '@/shared/ui/chart';

export type DashboardSummary = {
    users: {
        totalUsers: number; // in use
        newUsersThisMonth: number;
        clientsTotal: number;

        activeUsersTotal: number; // in use
        inactiveUsersTotal: number; // in use
        repeatClientsTotal: number; // in use
        clientPercentage: number;
    };

    rentals: {
        totalRentals: number; // in use
        totalRentalsThisMonth: number; // in use

        totalActiveRentals: number; // in use
        totalConfirmedRentals: number;
        totalCompletedRentals: number;
        totalCancelledRentals: number;
        totalOverdueRentals: number; // not implemented & very important

        last6MonthsRentals: MonthSummary[];

        activeRentals: RentalWithCar[]; // in use
        lastPayments: Rental[]; // in use
        avgRentalDuration: {
            _id: string;
            avgPrice: number;
            avgDuration: number;
            car: Car;
        };
    };

    revenue: {
        totalRevenue: number;
        revenueThisMonth: number;
        revenueToday: number;

        avgRevenuePerRental: number;
        outstandingPayments: number;
        refundsIssued: number;
    };
};
