import { Inject, Injectable } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    constructor(
        @Inject('CLOUDINARY') private readonly cloudinary: typeof Cloudinary,
    ) {}

    async uploadMultiple(files: Express.Multer.File[]) {
        const uploads = files.map((file) => this.uploadSingle(file));
        return Promise.all(uploads);
    }

    private uploadSingle(file: Express.Multer.File) {
        return new Promise((resolve, reject) => {
            const stream = this.cloudinary.uploader.upload_stream(
                { folder: 'rento' },
                (error, result) => {
                    if (error) return reject(error as Error);
                    resolve(result);
                },
            );
            stream.end(file.buffer);
        });
    }
}
