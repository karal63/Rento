import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { RentService } from '../rent.service';
import { Rent, RentSchema } from 'src/schemas/rentSchema';
import { Car, CarSchema } from 'src/schemas/carSchema';
import { RentalRepo } from '../rental.repository';
import { HttpException } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { Status } from 'src/enums/status.enum';
import { LogCode } from 'src/enums';

describe('CarsService', () => {
    let service: RentService;
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();

        const uri = mongod.getUri();

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(uri),
                MongooseModule.forFeature([
                    { name: Rent.name, schema: RentSchema },
                ]),
                MongooseModule.forFeature([
                    { name: Car.name, schema: CarSchema },
                ]),
            ],
            providers: [RentService, RentalRepo],
        }).compile();

        service = module.get<RentService>(RentService);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
    });

    let testRental: Rent & { _id: Types.ObjectId };

    it('RENTAL_001: should be defined', () => {
        expect(RentService).toBeDefined();
    });

    it('RENTAL_002: should calculate days', () => {
        expect(service.calculateDays(1774994400000, 1775253600000)).toBe(3);
        expect(service.calculateDays(1775253600000, 1777500000000)).toBe(26);
    });

    it('RENTAL_003: should calculate total', () => {
        const rentalFrom = 1774994400000;
        const rentalTo = 1775253600000;
        const mockedCar: Car = {
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

        const total = service.calculateTotal(mockedCar, rentalFrom, rentalTo);

        expect(total).toBe(4950);
    });

    it('RENTAL_004: should create rental', async () => {
        const mockedRental: Rent = {
            carId: new Types.ObjectId('69ce6890764b541fae48634e'),
            userId: new Types.ObjectId('69ce688368650c3b2f10e882'),
            rentFrom: 1774994400000,
            rentTo: 1775253600000,
            totalPrice: 0,
            pickupLocation: 'test',
            pickupTime: '07:00',
            intentId: 'mock',
        };

        testRental = await service.createRent(mockedRental);

        expect(testRental).toMatchObject({
            carId: mockedRental.carId,
            userId: mockedRental.userId,
            rentFrom: mockedRental.rentFrom,
            intentId: 'mock',
        });
    });

    it('RENTAL_005: check if valid dates', () => {
        const mockedRentals: Rent[] = [
            {
                carId: new Types.ObjectId('69ce6890764b541fae48634e'),
                userId: new Types.ObjectId('69ce688368650c3b2f10e882'),
                rentFrom: 1774994400000,
                rentTo: 1775253600000,
                totalPrice: 0,
                pickupLocation: 'test',
                pickupTime: '07:00',
                intentId: 'mock',
            },
        ];

        expect(
            service.checkIfValidDates(
                mockedRentals,
                1774994400000,
                1775253600000,
            ),
        ).toBe(false);

        expect(
            service.checkIfValidDates(
                mockedRentals,
                1775340000000,
                1775599200000,
            ),
        ).toBe(true);
    });

    it('RENTAL_006: should edit basic rental details', async () => {
        const newRental = await service.updateRental(
            testRental._id.toString(),
            testRental.userId.toString(),
            {
                location: 'RENTAL_006_location',
                time: '07:00',
            },
        );

        expect(newRental).toMatchObject({
            pickupLocation: 'RENTAL_006_location',
        });
    });

    it("RENTAL_007: should not edit rental if user doesn't own it", async () => {
        try {
            await service.updateRental(
                testRental._id.toString(),
                new Types.ObjectId().toString(),
                {
                    location: 'RENTAL_007_location',
                    time: '07:00',
                },
            );
        } catch (e: unknown) {
            if (e instanceof HttpException) {
                expect(e.getStatus()).toBe(404);
            }
        }
    });

    it('RENTAL_008: should cancel rental', async () => {
        await service.cancelRental(testRental._id.toString(), {
            id: new Types.ObjectId().toString(),
            roles: [Role.Admin],
        });
        expect(
            (await service.findRentalById(testRental._id.toString()))?.status,
        ).toBe(Status.Cancelled);
    });

    it('RENTAL_009: unauthorized user cannot cancel rental ', async () => {
        try {
            await service.cancelRental(testRental._id.toString(), {
                id: new Types.ObjectId().toString(),
                roles: [Role.User],
            });
        } catch (error: unknown) {
            if (error instanceof HttpException) {
                expect(error.getStatus()).toBe(403);
            }
        }
    });

    it('RENTAL_010: should update all rental details ', async () => {
        const mockEmployeeId = new Types.ObjectId();

        await service.updateRentalDetails(testRental._id.toString(), {
            employee: mockEmployeeId.toString(),
            pickupLocation: 'RENTAL_010_location',
            status: Status.Completed,
        });

        const updatedRental = await service.findRentalById(
            testRental._id.toString(),
        );

        expect(updatedRental).toMatchObject({
            employee: mockEmployeeId.toString(),
            pickupLocation: 'RENTAL_010_location',
            status: Status.Completed,
        });
    });

    it('RENTAL_011: should assign employee ', async () => {
        const mockEmployeeId = new Types.ObjectId();

        const newRental = await service.assign(
            testRental._id.toString(),
            mockEmployeeId.toString(),
        );

        expect(newRental?.employee?.toString()).toBe(mockEmployeeId.toString());
    });

    it('RENTAL_012: should unassign employee ', async () => {
        const newRental = await service.unassign(testRental._id.toString(), {
            id: testRental._id.toString(),
            roles: [Role.Admin],
        });

        expect(newRental?.employee).toBe(null);
    });

    it('RENTAL_013: should not unassign employee ', async () => {
        try {
            await service.unassign(testRental._id.toString(), {
                id: new Types.ObjectId().toString(),
                roles: [Role.User],
            });
        } catch (error) {
            if (error instanceof HttpException) {
                expect(error.message).toBe(LogCode.CODE_R009);
            }
        }
    });

    it('RENTAL_014: should change status', async () => {
        await service.changeStatus(testRental._id.toString(), Status.Cancelled);

        const updatedRental = await service.findRentalById(
            testRental._id.toString(),
        );

        expect(updatedRental?.status).toBe(Status.Cancelled);
    });
});
