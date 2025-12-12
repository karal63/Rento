import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
    @Prop()
    name: string;

    @Prop()
    secondName: string;

    @Prop({ unique: true })
    email: string;

    @Prop({ min: 4 })
    password?: string;

    @Prop()
    phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
