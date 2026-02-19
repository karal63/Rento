import {
    Body,
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

type UploadedImage = {
    url: string;
};

@ApiTags('Image')
@Controller('image')
export class ImageController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @ApiOperation({ summary: 'Upload image/images to cloudinary' })
    @ApiResponse({ status: 200, description: 'Returns an array of image URLs' })
    @Post('upload')
    @UseInterceptors(
        FilesInterceptor('file', 10, {
            storage: memoryStorage(),
        }),
    )
    async upload(@UploadedFiles() files: Express.Multer.File[]) {
        const images = await this.cloudinaryService.uploadMultiple(files);

        return images.map((img: UploadedImage) => {
            return img.url;
        });
    }
}
