import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/userSchema';
import { SignupDto } from '../auth/dto/signup.dto';
import * as argon from '@node-rs/argon2';
import { TelegramLoginQuery } from '../auth/dto/telegramQuery.type';
import { EditDto } from './dto/edit.dto';
import { GetUsersDto } from './dto/getUsers.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async create(candidate: SignupDto) {
        const existingUser = await this.findByEmail(candidate.email);

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword: string = await argon.hash(candidate.password);

        const mongoUser = new this.userModel({
            name: candidate.name,
            secondName: candidate.secondName,
            email: candidate.email,
            phoneNumber: candidate.phoneNumber,
            password: hashedPassword,
        });
        await mongoUser.save();
        const user = mongoUser.toObject();
        delete user.password;

        return user;
    }

    async createTelegramUser(query: TelegramLoginQuery) {
        const mongoUser = new this.userModel({
            name: query.first_name,
            username: query.username,
            auth_provider: 'telegram',
            telegram_id: query.id,
        });
        await mongoUser.save();
        const user = mongoUser.toObject();

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email });
    }

    async findByTelegramId(id: string): Promise<User | null> {
        return await this.userModel.findOne({ telegram_id: id });
    }

    async findById(id: string): Promise<User | null> {
        return await this.userModel.findById(id);
    }

    async update(userId: string, body: EditDto) {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                $set: { ...body, updatedAt: Date.now() },
            },
            {
                new: true, // return updated document
                runValidators: true, // enforce schema validation
            },
        );
    }

    async get(query: GetUsersDto) {
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

        const readyUsers = (await res.exec()).map((u) => {
            const newUser = u.toObject();
            delete newUser.password;
            return newUser;
        });

        return readyUsers;
    }
}
