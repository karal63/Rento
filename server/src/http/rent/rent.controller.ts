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

import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
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
            rentFrom: new Date(rental.rentFrom).toISOString(),
            rentTo: new Date(rental.rentTo).toISOString(),
        }));

        return termins;
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
