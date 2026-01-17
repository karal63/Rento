import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/userSchema';

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
}
