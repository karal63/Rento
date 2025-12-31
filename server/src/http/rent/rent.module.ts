import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rent, RentSchema } from 'src/schemas/rentSchema';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { RentalRepo } from './rental.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Rent.name, schema: RentSchema }]),
    ],
    controllers: [RentController],
    providers: [RentService, RentalRepo],
    exports: [RentService, MongooseModule, RentalRepo],
})
export class RentModule {}
