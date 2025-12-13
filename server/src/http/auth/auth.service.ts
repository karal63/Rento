import {
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
        const { accessToken, refreshToken } = await this.generateTokens(
            user._id.toString(),
            user.email,
        );
        return {
            user,
            tokens: { accessToken, refreshToken },
        };
    }

    async login(candidate: LoginDto) {
        let user = await this.userService.find(candidate.email);
        if (!user)
            throw new NotFoundException('User with given email not found');
        user = user.toObject() as User;

        const isValidPassword = await argon.verify(
            user.password!,
            candidate.password,
        );

        if (!isValidPassword)
            throw new UnauthorizedException('Email or password is incorrect');

        const { accessToken, refreshToken } = await this.generateTokens(
            user._id.toString(),
            candidate.email,
        );

        delete user.password;

        return { user, tokens: { accessToken, refreshToken } };
    }

    async generateTokens(userId: string, email: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    userId,
                    email,
                },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '24h',
                },
            ),
            this.jwtService.signAsync(
                {
                    userId,
                    email,
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
        let user = await this.userService.find(userDto.email);
        if (!user) throw new NotFoundException('User not found');

        const { accessToken, refreshToken } = await this.generateTokens(
            user._id.toString(),
            userDto.email,
        );

        user = user.toObject() as User;
        delete user.password;

        return {
            user,
            tokens: { accessToken, refreshToken },
        };
    }
}
