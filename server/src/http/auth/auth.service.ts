import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/schemas/userSchema';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as argon from '@node-rs/argon2';
import { UserPayload } from 'src/common/types/user.type';
import { TelegramLoginQuery } from './dto/telegramQuery.type';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {}
    async signup(candidate: SignupDto): Promise<{
        user: User;
        tokens: { accessToken: string; refreshToken: string };
    }> {
        const user = await this.userService.create(candidate);
        const { accessToken, refreshToken } = await this.generateTokens({
            id: user._id.toString(),
            email: user.email,
        });
        return {
            user,
            tokens: { accessToken, refreshToken },
        };
    }

    async login(candidate: LoginDto) {
        let user = await this.userService.findByEmail(candidate.email);
        if (!user) {
            throw new BadRequestException('User with given email not found');
        }
        user = user.toObject() as User;

        const isValidPassword = await argon.verify(
            user.password!,
            candidate.password,
        );

        if (!isValidPassword)
            throw new BadRequestException('Email or password is incorrect');

        const { accessToken, refreshToken } = await this.generateTokens({
            id: user._id.toString(),
            email: candidate.email,
        });

        delete user.password;

        return { user, tokens: { accessToken, refreshToken } };
    }

    async loginTelegram(query: TelegramLoginQuery) {
        if (!this.verifyTelegramData(query))
            throw new UnauthorizedException('Invalid telegram data');

        let existingUser = await this.userService.findByTelegramId(query.id);
        if (!existingUser) {
            existingUser = await this.userService.createTelegramUser(query);
        }

        const { accessToken, refreshToken } = await this.generateTokens({
            id: existingUser._id.toString(),
            username: query.username,
        });

        return { tokens: { accessToken, refreshToken } };
    }

    async generateTokens({
        id,
        email,
        username,
    }: {
        id: string;
        email?: string;
        username?: string;
    }) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    id,
                    email,
                    username,
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '15min',
                },
            ),
            this.jwtService.signAsync(
                {
                    id,
                    email,
                    username,
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: '30d',
                },
            ),
        ]);

        return { accessToken, refreshToken };
    }

    async refresh(userDto: UserPayload) {
        let user = await this.userService.findById(userDto.id);
        if (!user) throw new NotFoundException('User not found');

        const { accessToken, refreshToken } = await this.generateTokens({
            id: user._id.toString(),
            email: userDto.email,
            username: userDto.username,
        });

        user = user.toObject() as User;
        delete user.password;

        return {
            user,
            tokens: { accessToken, refreshToken },
        };
    }

    verifyTelegramData(data: TelegramLoginQuery) {
        // remove maybe car id from data (do not pass car id)
        const { hash, car_id, ...fields } = data;
        const dataCheckString = Object.keys(fields)
            .sort()
            .map((key) => `${key}=${fields[key]}`)
            .join('\n');

        const secretKey = crypto
            .createHash('sha256')
            .update(process.env.TELEGRAM_BOT_TOKEN as string)
            .digest();
        const hmac = crypto
            .createHmac('sha256', secretKey)
            .update(dataCheckString)
            .digest('hex');
        console.log(hmac, hash);

        return hmac === hash;
    }
}
