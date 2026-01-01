import type { Car } from '@/entities/car';

export type DashboardSummary = {
    users: {
        totalUsers: number; // done
        newUsersThisMonth: number; // done
        clientsTotal: number; // done

        activeUsers: number; // done
        inactiveUsers: number; // churn signal
        repeatClients: number; // users with >1 rental
        clientPercentage: number; // clientsTotal / totalUsers

        verifiedUsers: number; // KYC / email / phone verified
        suspendedUsers: number; // operational risk
    };

    rentals: {
        totalRentals: number;
        totalRentalsThisMonth: number;

        totalActiveRentals: number;
        totalConfirmedRentals: number;
        totalCompletedRentals: number;
        totalCancelledRentals: number;
        totalOverdueRentals: number; // very important

        avgRentalDuration: {
            _id: string;
            avgPrice: number;
            avgDuration: number;
            car: Car;
        }; // days
        // avgBookingLeadTime: number; // booking → pickup

        cancellationRate: number; // cancelled / total
        completionRate: number; // completed / total
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
