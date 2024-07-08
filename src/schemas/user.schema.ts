// src/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true,unique: true }) //안정성을 위해 id unique하게 관리
  id: number;

  @Prop({ required: true })
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
