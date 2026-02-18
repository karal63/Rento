import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor(
        @Inject('CLOUDINARY') private readonly cloudinary: typeof Cloudinary,
    ) {}

    upload(file: Express.Multer.File) {
        return new Promise((resolve, reject) => {
            const upload = this.cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                },
            );

            upload.end(file.buffer);
        });
    }
}
