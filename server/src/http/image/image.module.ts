import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
    controllers: [ImageController],
    imports: [CloudinaryModule],
})
export class ImageModule {}
