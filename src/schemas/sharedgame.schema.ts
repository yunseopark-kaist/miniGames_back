import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SharedGameDocument = SharedGame & Document;

@Schema()
export class SharedGame{
  @Prop({ required: true })
  shareduserId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  gameState: string; // 게임 상태를 JSON 문자열로 저장
}

export const SharedGameSchema = SchemaFactory.createForClass(SharedGame);