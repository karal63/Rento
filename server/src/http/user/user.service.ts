import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/userSchema';
import { SignupDto } from '../auth/dto/signup.dto';
import * as argon from '@node-rs/argon2';
import { TelegramLoginQuery } from '../auth/dto/telegramQuery.type';

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

    // LEARN HOW IT WORKS
    // async findByAnyId(id: string): Promise<User | null> {
    //     const query: any[] = [{ telegram_id: id }];

    //     if (Types.ObjectId.isValid(id)) {
    //         query.push({ _id: id });
    //     }

    //     return this.userModel.findOne({ $or: query });
    // }
}
