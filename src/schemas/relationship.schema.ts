// src/schemas/relationship.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Relationship extends Document {
  @Prop({ required: true })
  requesterId: number;

  @Prop({ required: true })
  recipientId: number;

  @Prop({ default: false })
  isAccepted: boolean;
}

export const RelationshipSchema = SchemaFactory.createForClass(Relationship);
RelationshipSchema.index({ requesterId: 1, recipientId: 1 }, { unique: true });