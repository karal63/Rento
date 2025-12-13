import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { CarService } from './car.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

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

    @Public()
    @ApiOperation({ summary: 'Get car' })
    @ApiResponse({ status: 200, description: 'Returns a car.' })
    @Get(':id')
    async getCar(@Param('id') id: string) {
        return await this.carService.find(id);
    }
}
