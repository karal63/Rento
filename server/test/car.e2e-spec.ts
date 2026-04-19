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
import { AddCarDto } from 'src/http/car/dto/addCar.dto';
import { EditCarDto } from 'src/http/car/dto/editCar.dto';

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

    it('/ (POST) / create car', async () => {
        user = await createUser(connection);
        const loginDto: LoginDto = {
            email: 'test@gmail.com',
            password: 'test',
        };
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send(loginDto);
        token = getAccessToken(res.headers['set-cookie']);

        const mockedCar: AddCarDto = {
            name: 'BMW M4 Competition',
            images: [
                'https://imgs.search.brave.com/eaCR_w_VfYVOy_w8TGEcEv10Hf6GIhQ-Do1tSH1Slls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzI3LzE3LzI3/LzM2MF9GXzQyNzE3/Mjc5Ml9BWlFSQ3BV/b3FtazgwQTdhOU1J/bFFiaVB5ZjJNd2V3/dy5qcGc',
            ],
            details: {
                accelerationTo100: 3.9,
                horsepower: 510,
                torqueNm: 650,
                transmission: 'Automatic (8-speed Steptronic)',
                numberOfSeats: 4,
            },
            deposit: 20000,
            pricing: {
                day: 1800,
                days2_3: 1650,
                days4_6: 1500,
                days7_13: 1350,
                days14_29: 1200,
                month: 28000,
            },
            brand: 'BMW',
        };

        await request(app.getHttpServer())
            .post('/cars/add')
            .set('Cookie', `accessToken=${token}`)
            .send(mockedCar)
            .expect(201);
    });

    it('/ (POST) / remove car', async () => {
        user = await createUser(connection);
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: user.email,
                password: 'test',
            });
        token = getAccessToken(res.headers['set-cookie']);

        const mockedCar: AddCarDto = {
            name: 'BMW M4 Competition',
            images: [
                'https://imgs.search.brave.com/eaCR_w_VfYVOy_w8TGEcEv10Hf6GIhQ-Do1tSH1Slls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzI3LzE3LzI3/LzM2MF9GXzQyNzE3/Mjc5Ml9BWlFSQ3BV/b3FtazgwQTdhOU1J/bFFiaVB5ZjJNd2V3/dy5qcGc',
            ],
            details: {
                accelerationTo100: 3.9,
                horsepower: 510,
                torqueNm: 650,
                transmission: 'Automatic (8-speed Steptronic)',
                numberOfSeats: 4,
            },
            deposit: 20000,
            pricing: {
                day: 1800,
                days2_3: 1650,
                days4_6: 1500,
                days7_13: 1350,
                days14_29: 1200,
                month: 28000,
            },
            brand: 'BMW',
        };

        const { body } = await request(app.getHttpServer())
            .post('/cars/add')
            .set('Cookie', `accessToken=${token}`)
            .send(mockedCar)
            .expect(201);

        await request(app.getHttpServer())
            .delete(`/cars/remove/${body._id}`)
            .set('Cookie', `accessToken=${token}`)
            .expect(200);
    });

    it('/ (POST) / edit car', async () => {
        user = await createUser(connection);
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: user.email,
                password: 'test',
            });
        token = getAccessToken(res.headers['set-cookie']);

        const mockedCar: AddCarDto = {
            name: 'BMW M4 Competition',
            images: [
                'https://imgs.search.brave.com/eaCR_w_VfYVOy_w8TGEcEv10Hf6GIhQ-Do1tSH1Slls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzI3LzE3LzI3/LzM2MF9GXzQyNzE3/Mjc5Ml9BWlFSQ3BV/b3FtazgwQTdhOU1J/bFFiaVB5ZjJNd2V3/dy5qcGc',
            ],
            details: {
                accelerationTo100: 3.9,
                horsepower: 510,
                torqueNm: 650,
                transmission: 'Automatic (8-speed Steptronic)',
                numberOfSeats: 4,
            },
            deposit: 20000,
            pricing: {
                day: 1800,
                days2_3: 1650,
                days4_6: 1500,
                days7_13: 1350,
                days14_29: 1200,
                month: 28000,
            },
            brand: 'BMW',
        };

        const { body } = await request(app.getHttpServer())
            .post('/cars/add')
            .set('Cookie', `accessToken=${token}`)
            .send(mockedCar)
            .expect(201);

        // editing rental
        const editDto: EditCarDto = {
            name: 'test',
            brand: 'test',
            details: {
                accelerationTo100: 2.1,
            },
        };

        await request(app.getHttpServer())
            .patch(`/cars/edit/${body._id.toString()}`)
            .set('Cookie', `accessToken=${token}`)
            .send(editDto)
            .expect(200);
    });
});
