import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/userSchema';
import { SignupDto } from '../auth/dto/signup.dto';
import * as argon from '@node-rs/argon2';
import { TelegramLoginQuery } from '../auth/dto/telegramQuery.type';
import { EditOwnDto } from './dto/editOwn.dto';
import { GetUsersDto } from './dto/getUsers.dto';
import { UserRepo } from './user.repository';
import { EditDto } from './dto/editDto';
import { CreateDto } from './dto/createDto';
import { LogCode } from 'src/enums';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly userRepo: UserRepo,
    ) {}
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

    async editOwn(userId: string, body: EditOwnDto) {
        return await this.userRepo.edit(userId, body);
    }

    async edit(userId: string, body: EditDto) {
        const hashedPassword: string = body.password
            ? await argon.hash(body.password)
            : '';

        if (hashedPassword) {
            return await this.userRepo.edit(userId, {
                ...body,
                password: hashedPassword,
            });
        } else {
            return await this.userRepo.edit(userId, body);
        }
    }

    async get(query: GetUsersDto) {
        return await this.userRepo.get(query);
    }

    async delete(id: string) {
        const existingUser = await this.userRepo.findById(id);
        if (!existingUser) throw new NotFoundException('User not found');
        await this.userRepo.delete(id);
    }

    async add(body: CreateDto) {
        const existingUser = await this.findByEmail(body.email);
        if (existingUser) throw new ConflictException(LogCode.CODE_U009);

        const hashedPassword = await argon.hash(body.password);
        return await this.userRepo.create({
            ...body,
            password: hashedPassword,
        });
    }
}
