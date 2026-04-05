import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';
import cookieParser from 'cookie-parser';
import { User } from 'src/schemas/userSchema';
import { resetDatabase } from './utils/database';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { createUser } from './utils/user/createUser';
import { getAccessToken } from './utils/getAccessToken';
import { LoginDto } from 'src/http/auth/dto/login.dto';
import { CreateRentalDto } from 'src/http/rent/dto/createRental.dto';
import { UserUpdateDto } from 'src/http/rent/dto/userUpdate.dto';
import { AdminUpdateDto } from 'src/http/rent/dto/adminUpdate.dto';

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

    it('/ (POST) / create rental', async () => {
        user = await createUser(connection);
        const loginDto: LoginDto = {
            email: 'test@gmail.com',
            password: 'test',
        };
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto);
        token = getAccessToken(res.headers['set-cookie']);

        const rentalDto: CreateRentalDto = {
            carId: '69ce6890764b541fae48634e',
            userId: '69ce688368650c3b2f10e882',
            rentFrom: 1774994400000,
            rentTo: 1775253600000,
            pickupLocation: 'test',
            pickupTime: '07:00',
            employee: '',
        };

        await request(app.getHttpServer())
            .post('/rent/create')
            .set('Cookie', `accessToken=${token}`)
            .send(rentalDto)
            .expect(201);
    });

    it('/ (POST) / cancel rental', async () => {
        user = await createUser(connection);
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: user.email,
                password: 'test',
            });
        token = getAccessToken(res.headers['set-cookie']);

        const rentalDto: CreateRentalDto = {
            carId: '69ce6890764b541fae48634e',
            userId: '69ce688368650c3b2f10e882',
            rentFrom: 1774994400000,
            rentTo: 1775253600000,
            pickupLocation: 'test',
            pickupTime: '07:00',
            employee: '',
        };

        const { body } = await request(app.getHttpServer())
            .post('/rent/create')
            .set('Cookie', `accessToken=${token}`)
            .send(rentalDto)
            .expect(201);

        await request(app.getHttpServer())
            .delete(`/rent/cancel/${body._id}`)
            .set('Cookie', `accessToken=${token}`)
            .expect(200);
    });

    it('/ (POST) / edit own rental', async () => {
        user = await createUser(connection);
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: user.email,
                password: 'test',
            });
        token = getAccessToken(res.headers['set-cookie']);

        // creating rental
        const rentalDto: CreateRentalDto = {
            carId: '69ce6890764b541fae48634e',
            userId: user._id.toString(),
            rentFrom: 1774994400000,
            rentTo: 1775253600000,
            pickupLocation: 'test',
            pickupTime: '07:00',
            employee: '',
        };

        const { body } = await request(app.getHttpServer())
            .post('/rent/create')
            .set('Cookie', `accessToken=${token}`)
            .send(rentalDto)
            .expect(201);

        // editing rental
        const editDto: UserUpdateDto = {
            location: 'random location',
            time: '08:00',
        };

        await request(app.getHttpServer())
            .patch(`/rent/edit/${body._id.toString()}`)
            .set('Cookie', `accessToken=${token}`)
            .send(editDto)
            .expect(200);
    });

    it('/ (POST) / edit rental', async () => {
        user = await createUser(connection);
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: user.email,
                password: 'test',
            });
        token = getAccessToken(res.headers['set-cookie']);

        // creating rental
        const rentalDto: CreateRentalDto = {
            carId: '69ce6890764b541fae48634e',
            userId: '69ce6890764b541fae48634e',
            rentFrom: 1774994400000,
            rentTo: 1775253600000,
            pickupLocation: 'test',
            pickupTime: '07:00',
            employee: '',
        };

        const { body } = await request(app.getHttpServer())
            .post('/rent/create')
            .set('Cookie', `accessToken=${token}`)
            .send(rentalDto)
            .expect(201);

        // editing rental
        const editDto: AdminUpdateDto = {
            pickupTime: '08:00',
            employee: user._id.toString(),
        };

        await request(app.getHttpServer())
            .patch(`/rent/edit/${body._id.toString() as string}/details`)
            .set('Cookie', `accessToken=${token}`)
            .send(editDto)
            .expect(200);
    });
});
