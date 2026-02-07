import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Car } from 'src/schemas/carSchema';
import { Rent } from 'src/schemas/rentSchema';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { RentalRepo } from './rental.repository';
import { GetAllDto } from './dto/getAll.dto';
import { Role } from 'src/enums/role.enum';
import { UserPayload } from 'src/common/types/user.type';
import { Status } from 'src/enums/status.enum';
import { AdminUpdateDto } from './dto/adminUpdate.dto';
import { LogCode } from 'src/enums';

@Injectable()
export class RentService {
    constructor(
        @InjectModel(Rent.name) private rentModel: Model<Rent>,
        private readonly rentalRepo: RentalRepo,
    ) {}

    calculateTotal(car: Car, daysCount: number) {
        const pricing = car.pricing;
        let pricePerDay = 0;

        if (daysCount == 1) pricePerDay = pricing[0]?.price ?? 0;
        else if (daysCount <= 3) pricePerDay = pricing[1]?.price ?? 0;
        else if (daysCount <= 6) pricePerDay = pricing[2]?.price ?? 0;
        else if (daysCount <= 13) pricePerDay = pricing[3]?.price ?? 0;
        else if (daysCount <= 29) pricePerDay = pricing[4]?.price ?? 0;
        else if (daysCount === 30) pricePerDay = pricing[5]?.price ?? 0;

        return pricePerDay * daysCount;
    }

    async createRent(rent: Rent) {
        const newRent = new this.rentModel(rent);
        await newRent.save();
    }

    async findRentalBySessionId(sessionId: string, userId: string) {
        return await this.rentModel.findOne({
            intentId: sessionId,
            userId: new Types.ObjectId(userId),
        });
    }

    async getRentsByCarId(carId: string) {
        return await this.rentModel.find({
            carId: new Types.ObjectId(carId),
            status: {
                $nin: [Status.Cancelled, Status.Completed],
            },
        });
    }

    async getRentalsByUserId(userId: string) {
        return await this.rentModel
            .find({ userId: new Types.ObjectId(userId) })
            .populate('carId');
    }

    checkIfValidDates(
        carRentals: Rent[],
        rentalFrom: number,
        rentalTo: number,
    ) {
        return !carRentals.some(
            (rental) =>
                rental.rentFrom >= rentalFrom && rental.rentTo <= rentalTo,
        );
    }

    async updateRental(rentalId: string, userId: string, body: UserUpdateDto) {
        const updatedRental = await this.rentModel
            .findOneAndUpdate(
                { _id: rentalId, userId: new Types.ObjectId(userId) }, // ownership check
                {
                    $set: {
                        pickupTime: body.time,
                        pickupLocation: body.location,
                        updatedAt: Date.now(),
                    },
                },
                {
                    new: true, // return updated document
                    runValidators: true, // enforce schema validation
                },
            )
            .populate('carId');

        if (!updatedRental) {
            throw new NotFoundException('Rental not found');
        }

        return updatedRental;
    }

    async getRentals(query: GetAllDto, user: UserPayload) {
        return this.rentalRepo.getAllRentals(query, user);
    }

    async cancelRental(id: string, user: UserPayload) {
        const rental = await this.rentalRepo.findRentalById(id);
        if (!rental) throw new NotFoundException('Rental not found');

        const isPrivileged =
            user.roles.includes(Role.Admin) ||
            user.roles.includes(Role.Employee);

        if (!isPrivileged) {
            if (rental.userId.toString() !== user.id) {
                throw new ForbiddenException("You can't cancel this rental");
            }

            const cancelDeadline = new Date(rental.rentFrom);
            cancelDeadline.setDate(cancelDeadline.getDate() - 1);

            if (new Date() > cancelDeadline) {
                throw new BadRequestException(
                    "You can't cancel a rental that is in past or that will be active in 24h",
                );
            }
        }

        await this.rentalRepo.cancel(id);
    }

    async getRentalById(id: string) {
        return await this.rentalRepo.findRentalDetailsById(id);
    }

    async updateRentalDetails(rentalId: string, body: AdminUpdateDto) {
        const rental = await this.rentModel.findById(rentalId);
        if (!rental) throw new NotFoundException(LogCode.CODE_R004);

        const readyBody = {
            ...body,
            employee: body.employee ? body.employee : null,
        };

        await this.rentModel.findByIdAndUpdate(rentalId, {
            $set: { ...readyBody, updatedAt: Date.now() },
        });
    }

    async assign(rentalId: string, employeId: string) {
        await this.rentModel.findByIdAndUpdate(rentalId, {
            employee: new Types.ObjectId(employeId),
        });
    }

    async unassign(rentalId: string, user: UserPayload) {
        const rental = await this.rentModel.findById(rentalId);
        if (!rental) throw new NotFoundException(LogCode.CODE_R004);

        if (
            rental?.employee &&
            !rental.employee.equals(user.id) &&
            !user.roles.includes(Role.Admin)
        ) {
            throw new ForbiddenException(LogCode.CODE_R009);
        }

        await this.rentModel.findByIdAndUpdate(rentalId, {
            employee: null,
        });
    }

    async changeStatus(rentalId: string, status: Status) {
        await this.rentalRepo.changeStatus(rentalId, status);
    }
}
