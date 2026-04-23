import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/sendMessage.dto';

@Injectable()
export class MessageService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMessage(message: SendMessageDto) {
        await this.mailerService.sendMail({
            to: process.env.EMAIL_USER,
            subject: 'Contact form: ',
            replyTo: message.email,
            text: message.content,
            html: `
                <h3>New message</h3>
                <p><b>Name:</b> ${message.name}</p>
                <p><b>Email:</b> ${message.email}</p>
                <p>${message.content}</p>
            `,
        });
    }
}
