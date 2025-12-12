import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/userSchema';
import { SignupDto } from '../auth/dto/signup.dto';
import * as argon from '@node-rs/argon2';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async create(candidate: SignupDto) {
        const hashedPassword: string = await argon.hash(candidate.password);
        candidate.password = hashedPassword;

        const mongoUser = new this.userModel(candidate);
        await mongoUser.save();
        const user = mongoUser.toObject();
        delete user.password;

        return user;
    }
}
