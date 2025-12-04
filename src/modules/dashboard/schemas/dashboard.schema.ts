// src/modules/dashboard/schemas/dashboard-data.schema.ts
/**
 * Schéma Mongo pour la collection "dashboard_data".
 * Chaque document = une ligne de stats pour le dashboard.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DashboardDataDocument = DashboardData & Document;

// On force le nom de collection à "dashboard_data"
@Schema({ collection: 'dashboard_data' })
export class DashboardData {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  totalUsers: number;

  @Prop({ required: true })
  totalResponses: number;

  @Prop({ required: true })
  totalSurveys: number;

}
// Fabrique le schéma Mongoose à partir de la classe ci-dessus

export const DashboardDataSchema = SchemaFactory.createForClass(DashboardData);
