/**
 * Module Dashboard.
 *
 * Rôle :
 *  - Déclarer la partie "dashboard" de l'API backend.
 *  - Brancher le schéma MongoDB "dashboard_data" via Mongoose.
 *  - Exposer le DashboardController (routes HTTP) et le DashboardService (logique métier).
 *
 * Ce module est ensuite importé dans AppModule pour rendre les routes accessibles.
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardData, DashboardDataSchema } from './schemas/dashboard.schema';

@Module({
  imports: [
    // Déclare la collection "dashboard_data" pour ce module
    MongooseModule.forFeature([
      { name: DashboardData.name, schema: DashboardDataSchema },
    ]),
  ],
  controllers: [DashboardController], // Routes HTTP du dashboard admin
  providers: [DashboardService],      // Logique pour lire les stats
})
export class DashboardModule {}
