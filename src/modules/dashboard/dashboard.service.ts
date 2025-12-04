/**
 * Service pour lire les stats du dashboard dans MongoDB.
 * Permet au controller du dashboard de :
 *   - lister tous les snapshots
 *   - obtenir la stat la plus récente
 *
 * Toutes les données sortent de la collection "dashboard_data".
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DashboardData, DashboardDataDocument } from './schemas/dashboard.schema';

@Injectable()
export class DashboardService {
  // Le model injecté permet d’accéder à la collection dashboard_data
  constructor(
    @InjectModel(DashboardData.name)
    private readonly dataModel: Model<DashboardDataDocument>,
  ) {}

  /**
   * Récupère toutes les stats (toutes les lignes du dashboard)
   * Retourne un array trié par date ascendante.
   */
  async getAllStats(): Promise<DashboardData[]> {
    return this.dataModel.find().sort({ date: 1 }).exec();
  }

  /**
   * Récupère la stat la plus récente (la dernière ligne du dashboard).
   */
  async getLatestStat(): Promise<DashboardData | null> {
    return this.dataModel.findOne().sort({ date: -1 }).exec();
  }
}
