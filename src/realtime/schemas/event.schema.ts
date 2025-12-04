import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  source: string;

  @Prop({ type: Object })
  payload: Record<string, unknown>;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type EventDocument = Event & Document;

export const EventSchema = SchemaFactory.createForClass(Event);
