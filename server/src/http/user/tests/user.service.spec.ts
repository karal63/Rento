import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { UserService } from '../user.service';
import { UserRepo } from '../user.repository';
import { User, UserSchema } from 'src/schemas/userSchema';
import { SignupDto } from 'src/http/auth/dto/signup.dto';
import { Role } from 'src/enums/role.enum';
import { TelegramLoginQuery } from 'src/http/auth/dto/telegramQuery.type';
import { EditOwnDto } from '../dto/editOwn.dto';
import { EditDto } from '../dto/editDto';
import { CreateDto } from '../dto/createDto';

describe('CarsService', () => {
    let service: UserService;
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create({
            binary: { version: '6.0.14' },
        });

        const uri = mongod.getUri();

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(uri),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                ]),
            ],
            providers: [UserService, UserRepo],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
    });

    let testUser: User & { _id: Types.ObjectId };

    it('USER_001: Should create user', async () => {
        const candidate: SignupDto = {
            name: 'test',
            secondName: 'test',
            email: 'test@gmail.com',
            phoneNumber: '+48123123123',
            password: 'test1234',
        };

        testUser = await service.create(candidate);

        expect(testUser).toMatchObject({
            email: 'test@gmail.com',
            name: 'test',
            roles: [Role.User],
        });
        expect(testUser.password).toBe(undefined);
    });

    it('USER_002: Should create telegram user', async () => {
        const query: TelegramLoginQuery = {
            id: 'test',
            first_name: 'test',
            username: 'test',
            photo_url: 'test',
            auth_date: 'test',
            hash: 'test',
            url: 'test',
        };

        const newUser = await service.createTelegramUser(query);

        expect(newUser).toMatchObject({
            auth_provider: 'telegram',
            name: query.first_name,
            telegram_id: query.id,
        });
    });

    it('USER_003: Should edit own user profile', async () => {
        const body: EditOwnDto = {
            email: 'USER_003_email',
            phoneNumber: 'USER_003_phoneNumber',
            secondName: 'USER_003_secondName',
        };
        const newUser = await service.editOwn(testUser?._id.toString(), body);

        expect(newUser).toMatchObject({
            email: 'USER_003_email',
            secondName: 'USER_003_secondName',
            phoneNumber: 'USER_003_phoneNumber',
        });
    });

    it('USER_004: Should edit user profile', async () => {
        const body: EditDto = {
            name: 'USER_004_name',
            secondName: 'USER_004_secondName',
            password: 'USER_004',
            roles: [Role.Admin],
        };
        const newUser = await service.edit(testUser?._id.toString(), body);

        expect(newUser).toMatchObject({
            name: body.name,
            secondName: body.secondName,
            roles: body.roles,
        });

        expect(newUser?.password).toBe(undefined);
    });

    it('USER_005: Should delete user', async () => {
        await service.delete(testUser?._id.toString());
        const existingUser = await service.findById(testUser._id.toString());

        expect(existingUser).toBe(null);
    });

    it('USER_006: Should add user', async () => {
        const body: CreateDto = {
            name: 'USER_006_name',
            secondName: 'USER_006_secondName',
            phoneNumber: '+48123123123',
            email: 'test@gmail.com',
            password: 'USER_006',
            roles: [Role.Admin],
        };

        const newUser = await service.add(body);

        expect(newUser).toMatchObject({
            name: body.name,
            secondName: body.secondName,
            roles: body.roles,
        });
        expect(newUser?.password).toBe(undefined);
    });
});
