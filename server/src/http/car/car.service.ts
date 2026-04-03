import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/schemas/carSchema';
import { GetFoundCarsDto } from './dto/getFoundCars.dto';
import { AddCarDto } from './dto/addCar.dto';
import { LogCode } from 'src/enums';
import { EditCarDto } from './dto/editCar.dto';
import { GetAllCarsDto } from './dto/getAllCars.dto';

@Injectable()
export class CarService {
    constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

    async findAll(query: GetAllCarsDto) {
        const limit = 16;
        const page = parseInt(query.page, 10) || 1;
        const offset = (page - 1) * limit;

        let cars = this.carModel.find();

        if (Array.isArray(query.brand)) {
            cars = cars.where('brand').in(query.brand);
        } else if (typeof query.brand === 'string') {
            cars = cars.where('brand').equals(query.brand);
        }

        if (query.search) {
            const searchRegex = new RegExp(query.search, 'i');
            cars = cars.or([{ name: searchRegex }, { brand: searchRegex }]);
        }

        // Count total documents (for pagination)
        const total = await cars.clone().countDocuments();

        const result = await cars
            .sort({ name: -1 }) // -1 for descending
            .skip(offset)
            .limit(limit)
            .exec();

        const pages = Math.ceil(total / limit);
        const brands = await this.carModel.distinct('brand');

        return { cars: result, pages, brands };
    }

    async find(id: string) {
        return await this.carModel.findById(id).exec();
    }

    async findAllCars(query: GetFoundCarsDto) {
        return await this.carModel.find({
            name: { $regex: query.search, $options: 'i' },
        });
    }

    async addCar(car: AddCarDto) {
        return this.carModel.create(car);
    }

    async removeCar(id: string) {
        const car = await this.carModel.findById(id);
        if (!car) throw new NotFoundException(LogCode.CODE_C004);

        await car.deleteOne();
    }

    async editCar(id: string, body: EditCarDto): Promise<Car> {
        const updateData = this.flattenObject(body);

        const updated = await this.carModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true },
        );

        if (!updated) throw new NotFoundException(LogCode.CODE_C004);

        return updated;
    }

    flattenObject<T extends object>(
        obj: T,
        parentKey = '',
        result: Record<string, unknown> = {},
    ): Record<string, unknown> {
        for (const key in obj) {
            const value = obj[key];

            const newKey = parentKey ? `${parentKey}.${key}` : key;

            if (value && typeof value === 'object' && !Array.isArray(value)) {
                this.flattenObject(value, newKey, result);
            } else {
                result[newKey] = value;
            }
        }

        return result;
    }
}
