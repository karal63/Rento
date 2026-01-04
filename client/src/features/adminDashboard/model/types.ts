import type { Car } from '@/entities/car';
import type { Rental, RentalWithCar } from '@/entities/rental';
import type { MonthSummary } from '@/shared/ui/chart';

export type DashboardSummary = {
    users: {
        totalUsers: number; // done
        newUsersThisMonth: number; // done
        clientsTotal: number; // done

        activeUsersTotal: number; // done
        inactiveUsersTotal: number; // churn signal
        repeatClientsTotal: number; // users with >1 rental
        clientPercentage: number; // clientsTotal / totalUsers
    };

    rentals: {
        totalRentals: number; // done
        totalRentalsThisMonth: number; // done

        totalActiveRentals: number; // done
        totalConfirmedRentals: number; // done
        totalCompletedRentals: number; // done
        totalCancelledRentals: number; // done
        totalOverdueRentals: number; // not implemented & very important

        last6MonthsRentals: MonthSummary[];

        activeRentals: RentalWithCar[];
        lastPayments: Rental[];
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
