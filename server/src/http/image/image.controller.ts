import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@ApiTags('Image')
@Controller('image')
export class ImageController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @ApiOperation({ summary: 'Upload image/images to cloudinary' })
    @ApiResponse({ status: 200, description: 'Returns an array of image URLs' })
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: memoryStorage(),
        }),
    )
    async upload(@UploadedFile() file: Express.Multer.File) {
        console.log('file:', file); // <--- should log the file
        return this.cloudinaryService.upload(file);
    }
}
