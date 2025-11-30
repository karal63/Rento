import { Body, Controller, Get, Param } from '@nestjs/common';
import { CarService } from './car.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @ApiOperation({ summary: 'Get all cars' })
    @ApiResponse({ status: 200, description: 'Returns a list of cars.' })
    @Get()
    async getAllCars() {
        return await this.carService.findAll();
    }

    @ApiOperation({ summary: 'Get car' })
    @ApiResponse({ status: 200, description: 'Returns a car.' })
    @Get(':id')
    async getCar(@Param('id') id: string) {
        return await this.carService.find(id);
    }
}
