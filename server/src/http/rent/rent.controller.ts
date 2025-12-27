// import { Controller, Get } from '@nestjs/common';
// import { Public } from 'src/common/decorators/public.decorator';

// @Controller('rent')
// export class RentController {
//     @Public()
//     @Get()
//     getAllRents() {
//         return { message: 'Rents working' };
//     }
// }

import {
    BadRequestException,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import type { UserPayload } from 'src/common/types/user.type';
import { RentService } from './rent.service';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Rentals')
@Controller('rent')
export class RentController {
    constructor(private readonly rentalService: RentService) {}

    @Public()
    @ApiOperation({ summary: 'Get car availability' })
    @ApiResponse({
        status: 200,
        description: 'returns array of rentals time ranges',
    })
    @Get('get-availability/:carId')
    async getAvailability(@Param('carId') carId: string) {
        const rentals = await this.rentalService.getRentsByCarId(carId);
        const termins = rentals.map((rental) => ({
            rentalFrom: new Date(rental.rentFrom).toISOString(),
            rentalTo: new Date(rental.rentTo).toISOString(),
        }));

        return termins;
    }

    @ApiOperation({ summary: 'Get all user rentals' })
    @ApiResponse({ status: 200, description: 'Returns rentals list' })
    @Get('list')
    async getRentals(@GetUser() user: UserPayload) {
        const rentals = await this.rentalService.getRentals(user.id);
        return rentals;
    }

    @ApiOperation({ summary: 'Cancel rental' })
    @ApiResponse({
        status: 200,
        description: "Changes rental status to 'CANCELLED'",
    })
    @Delete('cancel/:id')
    async cancelRental(
        @Param('id') rentalId: string,
        @GetUser() user: UserPayload,
    ) {
        const rental = await this.rentalService.findRentalById(rentalId);
        if (!rental) throw new NotFoundException('Rental not found');

        if (rental.userId !== user.id)
            throw new ForbiddenException("You can't cancel this rental");

        const now = new Date();
        const newStartDate = new Date(rental.rentFrom);
        newStartDate.setDate(newStartDate.getDate() - 1);
        if (now > newStartDate)
            throw new BadRequestException(
                "You can't cancel a rental that is in past or that will be active in 24h",
            );

        await this.rentalService.cancelRental(rentalId);
        return;
    }

    @ApiOperation({ summary: 'Find a rental' })
    @ApiResponse({ status: 200, description: 'Returns found rental' })
    @Get(':sessionId')
    async getRental(
        @Param('sessionId') sessionId: string,
        @GetUser() user: UserPayload,
    ) {
        const rental = await this.rentalService.findRentalBySessionId(
            sessionId,
            user.id,
        );
        if (!user || !rental) throw new BadRequestException('Rental not found');

        return rental;
    }
}
