import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/userSchema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async create() {
        const mongoUser = new this.userModel({
            name: 'test',
            secondName: 'test',
            email: 'test@gmail.com',
            phoneNumber: '1234',
            password: 123,
        });
        await mongoUser.save();
        const user = mongoUser.toObject();

        return user;
    }
}
