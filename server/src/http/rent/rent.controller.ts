import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import type { UserPayload } from 'src/common/types/user.type';
import { RentService } from './rent.service';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateDto } from './dto/update.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { GetAllDto } from './dto/getAll.dto';
import { CreateRentalDto } from './dto/createRental.dto';
import { Types } from 'mongoose';
import { Rent } from 'src/schemas/rentSchema';

@ApiTags('Rentals')
@Controller('rent')
export class RentController {
    constructor(private readonly rentalService: RentService) {}
    // cant put routes under routes with query param

    @ApiOperation({ summary: 'Get all rentals' })
    @ApiResponse({ status: 200, description: 'Get all service rentals' })
    @Roles(Role.Admin, Role.Employee)
    @Get('all')
    async getAll(@Query() query: GetAllDto) {
        const rentals = await this.rentalService.getRentals(query);
        return rentals;
    }

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
    async getUserRentals(@GetUser() user: UserPayload) {
        const rentals = await this.rentalService.getRentalsByUserId(user.id);
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
        await this.rentalService.cancelRental(rentalId, user);
        return { success: true };
    }

    @ApiOperation({ summary: 'Edit rental' })
    @ApiResponse({
        status: 200,
        description: 'Updates pickup time and location',
    })
    @Patch('edit/:id')
    async update(
        @Param('id') rentalId: string,
        @Body() body: UpdateDto,
        @GetUser() user: UserPayload,
    ) {
        const updatedRental = await this.rentalService.updateRental(
            rentalId,
            user.id,
            body,
        );
        return updatedRental;
    }

    @ApiOperation({ summary: 'Creates a new rental' })
    @ApiResponse({ status: 200, description: 'Rental created' })
    @Roles(Role.Admin)
    @Post('create')
    async create(@Body() body: CreateRentalDto) {
        const readyBody: Rent = {
            ...body,
            carId: new Types.ObjectId(body.carId),
            userId: new Types.ObjectId(body.userId),
            totalPrice: 0,
        };
        await this.rentalService.createRent(readyBody);
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
