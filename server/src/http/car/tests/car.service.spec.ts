import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from '../car.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from 'src/schemas/carSchema';
import mongoose from 'mongoose';
import { AddCarDto } from '../dto/addCar.dto';
import { EditCarDto } from '../dto/editCar.dto';

describe('CarsService', () => {
    let service: CarService;
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();

        const uri = mongod.getUri();

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(uri),
                MongooseModule.forFeature([
                    { name: Car.name, schema: CarSchema },
                ]),
            ],
            providers: [CarService],
        }).compile();

        service = module.get<CarService>(CarService);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
    });

    it('CAR_000: health check', () => {
        expect(service).toBeDefined();
    });

    let carId: string;

    it('CAR_001: should add car', async () => {
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

        const result = await service.addCar(mockedCar);
        carId = result._id.toString();

        expect(result).toMatchObject({
            name: mockedCar.name,
            brand: mockedCar.brand,
        });
    });

    it('CAR_002: should edit car', async () => {
        const mockedPayload: EditCarDto = {
            name: 'Mocked name',
        };
        const editedCar = await service.editCar(carId, mockedPayload);
        expect(editedCar).toMatchObject({
            name: mockedPayload.name,
        });
    });

    it('CAR_004: should flatten object', () => {
        const nestedObject = {
            name: 'BMW M4 Competition',
            details: {
                horsepower: 510,
                transmission: 'Automatic (8-speed Steptronic)',
            },
        };

        const flattened = service.flattenObject(nestedObject);

        expect(flattened).toEqual({
            name: 'BMW M4 Competition',
            'details.horsepower': 510,
            'details.transmission': 'Automatic (8-speed Steptronic)',
        });
    });

    it('CAR_005: should remove car', async () => {
        await service.removeCar(carId);
        const deletedCar = await service.find(carId);
        expect(deletedCar).toBeNull();
    });
});
