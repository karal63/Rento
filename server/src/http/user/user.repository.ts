import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/userSchema';
import { EditOwnDto } from './dto/editOwn.dto';
import { EditDto } from './dto/editDto';
import { CreateDto } from './dto/createDto';

@Injectable()
export class UserRepo {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getTotalUsers() {
        return await this.userModel.countDocuments();
    }

    async getNewThisMonth() {
        const now = new Date();
        const firstDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            1,
        ).getTime();

        return await this.userModel
            .find({ createdAt: { $gt: firstDate } })
            .countDocuments();
    }

    async findById(id: string) {
        return await this.userModel.findById(id);
    }

    async delete(id: string) {
        await this.userModel.findByIdAndDelete(id);
    }

    async edit(id: string, body: EditOwnDto | EditDto) {
        const updatedUser = await this.userModel.findByIdAndUpdate(
            id,
            {
                $set: { ...body, updatedAt: Date.now() },
            },
            {
                new: true, // return updated document
                runValidators: true, // enforce schema validation
            },
        );

        const user = updatedUser?.toObject();
        delete user?.password;
        return user;
    }

    async create(body: CreateDto) {
        const dbUser = new this.userModel(body);
        await dbUser.save();

        const user = dbUser.toObject();
        delete user.password;
        return user;
    }
}
