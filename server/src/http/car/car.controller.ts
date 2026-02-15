import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Req,
} from '@nestjs/common';
import { CarService } from './car.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { GetFoundCarsDto } from './dto/getFoundCars.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AddCarDto } from './dto/addCar.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @Public()
    @ApiOperation({ summary: 'Get all cars' })
    @ApiResponse({ status: 200, description: 'Returns a list of cars.' })
    @Get()
    async getAllCars(@Req() req: Request) {
        const { cars, pages, brands } = await this.carService.findAll(
            req.query as any,
        );
        return { cars, pagesAmount: pages, allBrands: brands };
    }

    @ApiOperation({ summary: 'Get cars matching search' })
    @ApiResponse({ status: 200, description: 'Return found cars' })
    @Roles(Role.Admin)
    @Get('found')
    async getFoundCars(@Query() query: GetFoundCarsDto) {
        return await this.carService.findAllCars(query);
    }

    @ApiOperation({ summary: 'Add new car' })
    @ApiResponse({ status: 201, description: 'Car added' })
    @Roles(Role.Admin)
    @Post('add')
    async addCar(@Body() body: AddCarDto) {
        await this.carService.addCar(body);
    }

    @ApiOperation({ summary: 'Remove car' })
    @ApiResponse({ status: 200, description: 'Car deleted' })
    @ApiResponse({ status: 404, description: 'Car not found' })
    @Roles(Role.Admin)
    @Delete('remove/:id')
    async removeCar(@Param('id') carId: string) {
        return this.carService.removeCar(carId);
    }

    @Public()
    @ApiOperation({ summary: 'Get car' })
    @ApiResponse({ status: 200, description: 'Returns a car.' })
    @Get(':id')
    async getCar(@Param('id') id: string) {
        return await this.carService.find(id);
    }
}
