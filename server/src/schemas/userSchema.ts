import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
    @Prop()
    name: string;

    @Prop()
    secondName?: string;

    @Prop({ unique: true })
    email?: string;

    @Prop({ min: 4 })
    password?: string;

    @Prop()
    phoneNumber?: string;

    @Prop()
    telegram_id?: string;

    @Prop({
        default: 'local',
        enum: ['local', 'telegram'],
    })
    auth_provider: 'local' | 'telegram';

    @Prop()
    username?: string;

    @Prop({ required: true, default: Date.now() })
    createdAt: number;

    @Prop({ required: true })
    updatedAt?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
