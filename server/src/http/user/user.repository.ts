import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/userSchema';
import { EditOwnDto } from './dto/editOwn.dto';
import { EditDto } from './dto/editDto';
import { CreateDto } from './dto/createDto';
import { GetUsersDto } from './dto/getUsers.dto';

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

    async get(query: GetUsersDto) {
        const limit = 20;
        const page = parseInt(query.page);

        let res = this.userModel.find();

        if (query.search) {
            res = res.find({
                $or: [
                    { name: { $regex: query.search, $options: 'i' } },
                    { secondName: { $regex: query.search, $options: 'i' } },
                    { email: { $regex: query.search, $options: 'i' } },
                    { phoneNumber: { $regex: query.search, $options: 'i' } },
                ],
            });
        }

        if (query.sort) {
            const sortMethod = query.sort.split(':');
            const field = sortMethod[0];
            const order = sortMethod[1] as 'asc' | 'desc';

            res = res.sort({ [field]: order === 'desc' ? -1 : 1 });
        } else {
            res = res.sort({ createdAt: -1 });
        }

        const total = await res.clone().countDocuments();

        res = res.skip((page - 1) * limit).limit(limit);

        const readyUsers = (await res.exec()).map((u) => {
            const newUser = u.toObject();
            delete newUser.password;
            return newUser;
        });

        const pages = Math.ceil(total / limit);

        return { users: readyUsers, pages };
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
