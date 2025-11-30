import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from 'src/schemas/carSchema';

@Injectable()
export class CarService {
    constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

    async findAll() {
        return await this.carModel.find().exec();
    }
}
