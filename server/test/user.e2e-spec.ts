import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';
import { CreateDto } from 'src/http/user/dto/createDto';
import { Role } from 'src/enums/role.enum';
import cookieParser from 'cookie-parser';
import { User } from 'src/schemas/userSchema';
import { EditDto } from 'src/http/user/dto/editDto';
import { resetDatabase } from './utils/database';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { createUser } from './utils/user/createUser';
import { getAccessToken } from './utils/getAccessToken';

describe('UserController (e2e)', () => {
    let app: INestApplication<App>;
    let connection: Connection;
    let user: User;
    let token: string;

    beforeEach(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        connection = app.get<Connection>(getConnectionToken());

        app.use(cookieParser());
        await app.init();

        await resetDatabase(connection);
    });

    afterAll(async () => {
        if (app) {
            await app.close();
        }
    });

    it('/ (POST) / create user', async () => {
        user = await createUser(connection);
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: user.email,
                password: 'test',
            });

        token = getAccessToken(res.headers['set-cookie']);

        const dto: CreateDto = {
            name: 'add',
            secondName: 'add',
            email: 'add@gmail.com',
            phoneNumber: '+48123123123',
            password: 'test1234',
            roles: [Role.User],
        };

        await request(app.getHttpServer())
            .post('/user/create')
            .set('Cookie', `accessToken=${token}`)
            .send(dto)
            .expect(201);
    });

    it('/ (PATCH) / edit user', async () => {
        user = await createUser(connection);
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: user.email,
                password: 'test',
            });

        token = getAccessToken(res.headers['set-cookie']);

        const dto: CreateDto = {
            name: 'add',
            secondName: 'add',
            email: 'add@gmail.com',
            phoneNumber: '+48123123123',
            password: 'test1234',
            roles: [Role.User],
        };

        const { body } = await request(app.getHttpServer())
            .post('/user/create')
            .set('Cookie', `accessToken=${token}`)
            .send(dto)
            .expect(201);

        const editDto: EditDto = {
            secondName: 'changed',
            password: 'test',
        };

        await request(app.getHttpServer())
            .patch(`/user/edit/${(body as User)._id.toString()}`)
            .set('Cookie', `accessToken=${token}`)
            .send(editDto)
            .expect(200);
    });

    it('/ (DELETE) / delete user', async () => {
        user = await createUser(connection);
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: user.email,
                password: 'test',
            });

        token = getAccessToken(res.headers['set-cookie']);

        const dto: CreateDto = {
            name: 'remove',
            secondName: 'remove',
            email: 'remove@gmail.com',
            phoneNumber: '+48123123123',
            password: 'test1234',
            roles: [Role.User],
        };

        const { body } = await request(app.getHttpServer())
            .post('/user/create')
            .set('Cookie', `accessToken=${token}`)
            .send(dto)
            .expect(201);

        await request(app.getHttpServer())
            .delete(`/user/delete/${body._id.toString()}`)
            .set('Cookie', `accessToken=${token}`)
            .expect(200);
    });
});
