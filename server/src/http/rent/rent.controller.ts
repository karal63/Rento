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
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { GetAllDto } from './dto/getAll.dto';
import { CreateRentalDto } from './dto/createRental.dto';
import { Types } from 'mongoose';
import { Rent } from 'src/schemas/rentSchema';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { AdminUpdateDto } from './dto/adminUpdate.dto';
import { ChangeStatusDto } from './dto/changeStatus.dto';
import { StripeService } from '../stripe/stripe.service';

@ApiTags('Rentals')
@Controller('rent')
export class RentController {
    constructor(
        private readonly rentalService: RentService,
        private readonly stripeService: StripeService,
    ) {}
    // cant put routes under routes with query param

    @ApiOperation({ summary: 'Get all rentals' })
    @ApiResponse({ status: 200, description: 'Get all service rentals' })
    @Roles(Role.Admin, Role.Employee)
    @Get('all')
    async getAll(@Query() query: GetAllDto, @GetUser() user: UserPayload) {
        const rentals = await this.rentalService.getRentals(query, user);
        return rentals;
    }

    @Public()
    @ApiOperation({ summary: 'Get car availability' })
    @ApiResponse({
        status: 200,
        description: 'returns array of rentals time ranges',
    })
    @Get('get-availability/:carId')
    async getAvailability(
        @Param('carId') carId: string,
        @Query('excluded-id') excludedId: string,
    ) {
        const rentals = await this.rentalService.getRentsByCarId(carId);

        const termins = rentals.reduce(
            (acc: { dateFrom: string; dateTo: string }[], rental) => {
                if (rental._id.toString() !== excludedId) {
                    acc.push({
                        dateFrom: new Date(rental.rentFrom).toISOString(),
                        dateTo: new Date(rental.rentTo).toISOString(),
                    });
                }
                return acc;
            },
            [],
        );

        return termins;
    }

    @ApiOperation({ summary: 'Get all user rentals' })
    @ApiResponse({ status: 200, description: 'Returns rentals list' })
    @Roles(Role.Admin)
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
    @Roles(Role.Admin)
    @Delete('cancel/:id')
    async cancelRental(
        @Param('id') rentalId: string,
        @GetUser() user: UserPayload,
    ) {
        const rental = await this.rentalService.cancelRental(rentalId, user);
        if (rental.intentId) {
            await this.stripeService.createRefund(rental.intentId);
        }

        return { success: true };
    }

    @ApiOperation({ summary: 'Edit pickup details in rental' })
    @ApiResponse({
        status: 200,
        description: 'Updates pickup time and location',
    })
    @Roles(Role.Admin)
    @Patch('edit/:id')
    async userUpdate(
        @Param('id') rentalId: string,
        @Body() body: UserUpdateDto,
        @GetUser() user: UserPayload,
    ) {
        const updatedRental = await this.rentalService.updateRental(
            rentalId,
            user.id,
            body,
        );
        return updatedRental;
    }

    @ApiOperation({ summary: 'Edit whole rental' })
    @ApiResponse({
        status: 200,
        description: 'Updates whole rental',
    })
    @Roles(Role.Admin)
    @Patch('edit/:id/details')
    async adminUpdate(
        @Param('id') rentalId: string,
        @Body() body: AdminUpdateDto,
    ) {
        return await this.rentalService.updateRentalDetails(rentalId, body);
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
            employee: body.employee ? new Types.ObjectId(body.employee) : null,
            totalPrice: 0,
        };
        await this.rentalService.createRent(readyBody);
        return;
    }

    @ApiOperation({ summary: 'Find a rental by ID' })
    @ApiResponse({ status: 200, description: 'Returns found rental' })
    @Roles(Role.Employee, Role.Admin)
    @Get('get-by-id/:id')
    async getRentalById(
        @Param('id') rentalId: string,
        @GetUser() user: UserPayload,
    ) {
        return await this.rentalService.getRentalById(rentalId, user);
    }

    @ApiOperation({
        summary: 'Assign rental',
        description: 'employee assigns to rental',
    })
    @ApiResponse({ status: 200, description: 'Employee assigned' })
    @Roles(Role.Employee)
    @Post(':id/assign')
    async assignEmployee(
        @GetUser() user: UserPayload,
        @Param('id') rentalId: string,
    ) {
        return this.rentalService.assign(rentalId, user.id);
    }

    @ApiOperation({
        summary: 'Unassign rental',
        description: 'employee unassigns rental assigned to him',
    })
    @ApiResponse({ status: 200, description: 'Employee assigned' })
    @Roles(Role.Admin, Role.Employee)
    @Post(':id/unassign')
    async unassign(
        @Param('id') rentalId: string,
        @GetUser() user: UserPayload,
    ) {
        return this.rentalService.unassign(rentalId, user);
    }

    @ApiOperation({
        summary: 'Change rental status',
        description: 'Employee can quickly switch rental status',
    })
    @ApiResponse({ status: 201, description: 'Status switched' })
    @Roles(Role.Employee)
    @Post(':id/change-status')
    async changeStatus(
        @Param('id') rentalId: string,
        @Body() body: ChangeStatusDto,
    ) {
        return this.rentalService.changeStatus(rentalId, body.status);
    }

    @ApiOperation({ summary: 'Find a rental by session ID' })
    @ApiResponse({ status: 200, description: 'Returns found rental' })
    @Get(':sessionId')
    async getRentalBySessionId(
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
