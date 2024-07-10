import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Game } from './game.schema';

export type SharedGameDocument = SharedGame & Document;

@Schema()
export class SharedGame extends Game{
    @Prop({ required: true })
    shareduserId: string;
}

export const SharedGameSchema = SchemaFactory.createForClass(SharedGame);