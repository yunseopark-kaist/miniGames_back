// src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  nickname: string;

  @Prop({required: true})
  score:number;

  @Prop()
  profileImageUrl: string;

  @Prop()
  ranking: number;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
