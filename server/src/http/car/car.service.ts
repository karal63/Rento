import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/schemas/carSchema';

type Query = {
    page: string;
    brand?: string[];
    search?: string;
};

@Injectable()
export class CarService {
    constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

    async findAll(query: Query) {
        const limit = 4;
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
}
