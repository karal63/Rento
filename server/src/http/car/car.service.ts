import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/schemas/carSchema';

@Injectable()
export class CarService {
    constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

    async findAll(query: any) {
        const limit = 4;
        const page = parseInt(query.page, 10) || 1;
        const offset = (page - 1) * limit;

        // Count total documents (for pagination)
        const total = await this.carModel.countDocuments();

        // Paginated + sorted query
        const cars = await this.carModel
            .find()
            .sort({ name: -1 }) // -1 for descending
            .skip(offset)
            .limit(limit)
            .exec();

        const pages = Math.ceil(total / limit);
        console.log(pages);

        return { cars, pages };
    }

    async find(id: string) {
        return await this.carModel.findById(id).exec();
    }
}
